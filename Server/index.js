const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/User'); // Correct path to the User model
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const contactsRoutes = require('./routes/ContactRoutes');

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors({
  origin: process.env.ORIGIN,
  credentials: true
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
  const token = req.cookies.jwtToken;

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
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
      user = new User({ phoneNumber, profile: false }); // Set profile to false for new users
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

    res.cookie('jwtToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.send({ success: true, hasProfile });
  } else {
    return res.status(200).send({ success: false, state: "INVALID", error: "Invalid OTP" });
  }
});

app.get('/check-auth', async (req, res) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const user = await User.findOne({ phoneNumber: decoded.phoneNumber });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    const userInfo = { phoneNumber: user.phoneNumber };
    // Ensure hasProfile is a boolean
    const hasProfile = !!user.profile; // Explicitly cast to boolean

    res.status(200).json({ success: true, userInfo, hasProfile });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

app.post('/update-profile', authenticateToken, async (req, res) => {
  const { phoneNumber } = req.user; // phoneNumber extracted from the JWT token
  const { firstName, lastName, profileImage } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { phoneNumber },
      { firstName, lastName, profileImage, profile: true },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).send({ success: false, message: 'User not found' });
    }

    res.send({ success: true, message: 'Profile updated successfully', user });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).send({ success: false, message: 'Server error' });
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
  res.clearCookie('jwtToken'); // Clear the JWT cookie
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});