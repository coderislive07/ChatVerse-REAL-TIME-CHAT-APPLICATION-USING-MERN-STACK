const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 
const twilio = require('twilio');
const mongoose =require('mongoose')

const app = express();
app.use(bodyParser.json());
app.use(cors());

const { ACCOUNT_SID, AUTH_TOKEN, MY_TWILIO_PHONE_NUMBER, PORT ,DATABASE_URL } = process.env;


const client = new twilio(ACCOUNT_SID, AUTH_TOKEN);
mongoose.connect(DATABASE_URL ,{useNewUrlParser:true,useUnifiedTopology:true})
const db=mongoose.connection

const otpSchema = new mongoose.Schema({
  phoneNumber:String,
  otp:String
})
const OtpModel=mongoose.model("Otp",otpSchema)
const generateOTP = ()=>
  {
    return Math.floor(100000 + Math.random() * 900000); 
  }

app.post('/send-otp', async (req, res) => {
  const { phoneNumber } = req.body;
  console.log("My Phone Number is:::",phoneNumber);
  const otp =generateOTP();
  const otpDocument=new OtpModel({phoneNumber,otp})
  otpDocument.save(); 
  
  client.messages.create({
    body:`your otp is ${otp}`,
    from:`${MY_TWILIO_PHONE_NUMBER}`,
    to:`+91${phoneNumber}`
  })
  .then(()=>
  {
    res.send({success:true , otp:otp,phone:phoneNumber});

  })
  .catch(err=>
  {
    console.log(err);
    res.status(500).send({sucess:false,error:"Failed to send otp!",phoneNumber});
  })
});
  app.post("/verify-otp",async (req,res)=>
{
  const {phoneNumber , userOTP}=req.body;
  try
  {
    const otpDocument=await OtpModel.findOne({
      phoneNumber , 
      otp:userOTP
    })
    if(otpDocument)
    {
      res.send({success:true});
    }
    else
    {
      res.status(401).send({sucess:false,error:"invalid OTP"});
    }
  }
  catch(error)
  {
    console.log(error);
    res.status(500).send({sucess:false,error:"error verifying otp"})
  }

});
app.listen(PORT,()=>
{
  console.log(`server is running on http://localhost:5500`);
})

