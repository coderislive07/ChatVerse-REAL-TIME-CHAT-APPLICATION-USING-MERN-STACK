const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const redis = require('redis');
const app = express();
const jwt =require('jsonwebtoken');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(
  {
    origin:process.env.ORIGIN ,
    credentials:true
  }
));
const { ACCOUNT_SID, AUTH_TOKEN, MY_TWILIO_PHONE_NUMBER, PORT, DATABASE_URL, REDIS_URL ,JWT_KEY} = process.env;
const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);
const redisClient = redis.createClient({
  url: REDIS_URL,
});
redisClient.on('error', (err) => console.log('Recd dis Client Error', err));
redisClient.connect().then(() => {
  console.log('Connected to Redis');
});
mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));
  const userSchema = new mongoose.Schema({
    phoneNumber: {type:String,required:true},
    profile: {type:Boolean,default:false}, 
  });
  const User = mongoose.model('User', userSchema);
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
const authenticateToken = (req, res, next) => {
  const token = req.cookies.jwtToken; 

  if (token == null) return res.sendStatus(401); // If no token, unauthorized

  jwt.verify(token, JWT_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // If invalid token, forbidden

    req.user = user; // Attach user info to request
    next(); // Proceed to the next middleware/route
  });
};
app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  console.log("My Phone Number is:::", phoneNumber);
  const otp = generateOTP();
  const key = {otp:phoneNumber};
//  await  redisClient.set(['this is key', 'value']);
  const data={
    "otp":otp
}
  client.messages.create({
    body: `Your OTP is ${otp}`,
    from: MY_TWILIO_PHONE_NUMBER,
    to: `+91${phoneNumber}`
  })
    .then(() => {
      redisClient.setEx(phoneNumber.toString(), 300, JSON.stringify(data)); // Set OTP in Redis with an expiration of 5 minutes
      res.send({ success: true, phone: phoneNumber });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ success: false, "state":"verified",error: "Failed to send OTP!", phoneNumber });
    });
});
app.get('/check-auth', (req, res) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    const userInfo = { phoneNumber: decoded.phoneNumber };
    const hasProfile = true; // or fetch from DB if needed
    res.status(200).json({ success: true, userInfo, hasProfile });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
});

app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, userOTP } = req.body;
  const key = phoneNumber.toString();
  let storedOTP = await redisClient.get(key);

  if (storedOTP == null) {
    return res.status(500).send({ success: false, state: "EXPIRED", error: "Error verifying OTP" });
  }

  storedOTP = JSON.parse(storedOTP);

  if (storedOTP.otp === userOTP) {
    redisClient.del(key);

    let user = await User.findOne({ phoneNumber });
    let hasProfile = Boolean(user && user.profile);

    if (!user) {
      user = new User({ phoneNumber, profile: true });
      try {
        await user.save();
        console.log("User saved to MongoDB successfully");
        hasProfile = false;
      } catch (err) {
        console.error("Error saving user to MongoDB:", err);
        return res.status(500).send({ success: false, error: "Failed to save user to database" });
      }
    }

    // Generate JWT token
    const token = jwt.sign({ phoneNumber: user.phoneNumber }, JWT_KEY, {
      expiresIn: '1d', // Set token expiration as needed
    });

    // Set the token as an HTTP-only cookie
    res.cookie('jwtToken', token, {
      httpOnly: true, // Accessible only by the server
      secure: true, // Ensures the cookie is sent over HTTPS only
      sameSite: 'Strict', // Ensures the cookie is sent only in a first-party context
      maxAge: 24 * 60 * 60 * 1000 , // 1 day expiration
    });



    return res.send({ success: true, hasProfile });
  } else {
    return res.status(200).send({ success: false, state: "INVALID", error: "Invalid OTP" });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 