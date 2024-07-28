const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const twilio = require('twilio');
const mongoose = require('mongoose');
const redis = require('redis');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const { ACCOUNT_SID, AUTH_TOKEN, MY_TWILIO_PHONE_NUMBER, PORT, DATABASE_URL, REDIS_URL } = process.env;

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

const otpSchema = new mongoose.Schema({
  phoneNumber: String,
  otp: String,
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
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
      redisClient.setEx(phoneNumber.toString(), 60, JSON.stringify(data)); // Set OTP in Redis with an expiration of 5 minutes
      res.send({ success: true, phone: phoneNumber });

    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ success: false, "state":"verified",error: "Failed to send OTP!", phoneNumber });
    });
});

app.post('/verify-otp', async (req, res) => {
  const { phoneNumber, userOTP } = req.body;
  const key = phoneNumber.toString();
  let storedOTP=await redisClient.get(key);
  if(storedOTP==null){
    return res.status(500).send({ success: false, "state":"EXPIRED", error: "Error verifying OTP" });
  }
  else{
    storedOTP=JSON.parse(storedOTP)

    if (storedOTP.otp === userOTP) {
      redisClient.del(key); 
      return res.send({ success: true });
    } else {
      return res.status(200).send({ success: false,"state":"INVALID" ,error: "Invalid OTP" });
    }
  }
  
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
