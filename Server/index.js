const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User');
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const contactsRoutes = require('./routes/ContactRoutes');

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Update CORS configuration
app.use(cors({
  origin: 'https://chatversetech.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/contacts', contactsRoutes);

const { ACCOUNT_SID, AUTH_TOKEN, MY_TWILIO_PHONE_NUMBER, PORT, DATABASE_URL, JWT_KEY } = process.env;
const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);

mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

const otpStore = new Map();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwtToken || req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ success: false, message: 'Token expired' });
      }
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  const otp = generateOTP();
  const key = phoneNumber.toString();
  const data = { otp, expiry: Date.now() + 300000 }; // 5 minutes expiry

  client.messages.create({
    body: `Your OTP is ${otp}`,
    from: MY_TWILIO_PHONE_NUMBER,
    to: `+91${phoneNumber}`
  })
    .then(() => {
      otpStore.set(key, data);
      setTimeout(() => otpStore.delete(key), 300000); // Delete after 5 minutes
      res.send({ success: true, phone: phoneNumber });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ success: false, state: "verified", error: "Failed to send OTP!", phoneNumber });
    });
});

app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, userOTP } = req.body;
  const key = phoneNumber.toString();
  const storedData = otpStore.get(key);

  if (!storedData || Date.now() > storedData.expiry) {
    return res.status(500).send({ success: false, state: "EXPIRED", error: "Error verifying OTP" });
  }

  if (storedData.otp === userOTP) {
    otpStore.delete(key);

    let user = await User.findOne({ phoneNumber });
    let hasProfile = Boolean(user && user.profile);

    if (!user) {
      user = new User({ phoneNumber, profile: false });
      try {
        await user.save();
        console.log("User saved to MongoDB successfully");
        hasProfile = false;
      } catch (err) {
        console.error("Error saving user to MongoDB:", err);
        return res.status(500).send({ success: false, error: "Failed to save user to database" });
      }
    }

    const token = jwt.sign({ phoneNumber: user.phoneNumber }, JWT_KEY, {
      expiresIn: '1d',
    });

    // Update cookie settings
    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true, // Always use secure for production
      sameSite: 'None', // Required for cross-site cookie
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ success: true, hasProfile, token }); // Send token in response body as well
  } else {
    return res.status(200).send({ success: false, state: "INVALID", error: "Invalid OTP" });
  }
});

app.get('/check-auth', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ phoneNumber: req.user.phoneNumber });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const userInfo = { phoneNumber: user.phoneNumber };
    const hasProfile = !!user.profile;

    res.status(200).json({ success: true, userInfo, hasProfile });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

app.post('/update-profile', authenticateToken, async (req, res) => {
  const { phoneNumber } = req.user;
  const { firstName, lastName, profileImage } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
  }

  try {
    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { firstName, lastName, profileImage, profile: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

app.get('/profile-info', authenticateToken, async (req, res) => {
  const { phoneNumber } = req.user;  

  try {
    const user = await User.findOne({ phoneNumber }, 'firstName lastName profileImage');

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    res.send({ success: true, user });
  } catch (err) {
    console.error('Error fetching profile information:', err);
    res.status(500).send({ success: false, message: 'Server error' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('jwtToken', {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

app.options('*', cors());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});