import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import 'react-phone-number-input/style.css';
import 'react-phone-input-2/lib/style.css';
import './style.css';
import hands from '../assets/hands.png';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import chatlogo from '../assets/chatlogo.png'
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

// Create an Axios instance to handle token automatically
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});
const LeftArrow = ({ onClick }) => (
  <svg
    onClick={onClick}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    className="w-6 h-6 absolute fill-current text-gray-400 cursor-pointer hover:text-gray-200 transition-colors duration-200"
    style={{ zIndex: 10 }}
  >
    <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left" />
  </svg>
);

export default function Login({ onBack }) {
  const { setUserInfo, setHasProfile } = useAppStore();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isTrue, setIsTrue] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(''));

  const sendOtp = async () => {
    try {
      const response = await axiosInstance.post('/send-otp', { phoneNumber });
      if (response.data.success) {
        setMessage('OTP sent successfully!');
        setShowOtpInput(true);
      } else {
        setMessage('Failed to send OTP.');
      }
    } catch (error) {
      console.log(error);
      setMessage('Error: ' + error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      let userOtp = parseInt(otp.join(""));
      const response = await axiosInstance.post('/verify-otp', {
        phoneNumber: Number(phoneNumber),
        userOTP: userOtp
      });
  
      if (response.data.success) {
        setUserInfo({ phoneNumber });
        if (response.data.hasProfile) {
          setHasProfile(true);
          navigate('/chat');
        } else {
          navigate('/profile');
        }
      } else {
        setIsTrue(true);
        if (response.data.state === "EXPIRED") {
          setMessage('OTP EXPIRED');
        } else {
          setMessage('Invalid OTP. Please try again.');
        }
      }
    } catch (error) {
      setIsTrue(true);
      console.log(error);
      setMessage('Unable To Reach Server');
    }
  };
  

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden text-white">
      <div className={`absolute top-0 left-0 w-full h-full flex transition-transform duration-700 ${showOtpInput ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className='mt-3 ml-3'>
          <LeftArrow onClick={onBack} />
        </div>
        <div style={{height:'599px'}} className='flex card ml-20  '>
        
       
            <div className="flex pt-14 flex-col  items-center">
              <h1 className="text-center text-3xl text-white font-normal">Your Phone Number</h1>
              <h5 className='text-gray-400 mt-2 text-center text-sm font-medium'>
                Please confirm your country code
              </h5>
              <h5 className='text-gray-400 text-center text-sm font-medium'>
                and enter your phone number.
              </h5>
            </div>
            <div className='flex justify-center'>
              <div className='pt-14'>
                <PhoneInput
                  country={'in'}
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  containerStyle={{ width: '350px',marginLeft:'85px'  }}
                  inputStyle={{ width: '100%', color: 'white',backgroundColor:'transparent' , borderWidth:'3px', borderColor:'transparent' }}
                  buttonStyle={{ backgroundColor: 'transparent', borderColor: 'transparent' }}
                  dropdownStyle={{ backgroundColor: '#1A2130', borderColor: '#1A2130', color: 'white' }}
                  searchStyle={{ backgroundColor: '#1A2130', borderColor: '#1A2130', color: 'white' }}
                />
              </div>
            </div>
            <hr style={{marginTop:'-8px'}}  className='border-gray-500 ml-72 w-96  mr-44' />
            <form className="flex flex-col items-center mt-10" onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
          
<button class="button">
  <div class="dots_border"></div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    class="sparkle"
  >
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="black"
      fill="black"
      d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
    ></path>
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="black"
      fill="black"
      d="M6 14.25L5.741 15.285C5.59267 15.8785 5.28579 16.4206 4.85319 16.8532C4.42059 17.2858 3.87853 17.5927 3.285 17.741L2.25 18L3.285 18.259C3.87853 18.4073 4.42059 18.7142 4.85319 19.1468C5.28579 19.5794 5.59267 20.1215 5.741 20.715L6 21.75L6.259 20.715C6.40725 20.1216 6.71398 19.5796 7.14639 19.147C7.5788 18.7144 8.12065 18.4075 8.714 18.259L9.75 18L8.714 17.741C8.12065 17.5925 7.5788 17.2856 7.14639 16.853C6.71398 16.4204 6.40725 15.8784 6.259 15.285L6 14.25Z"
    ></path>
    <path
      class="path"
      stroke-linejoin="round"
      stroke-linecap="round"
      stroke="black"
      fill="black"
      d="M6.5 4L6.303 4.5915C6.24777 4.75718 6.15472 4.90774 6.03123 5.03123C5.90774 5.15472 5.75718 5.24777 5.5915 5.303L5 5.5L5.5915 5.697C5.75718 5.75223 5.90774 5.84528 6.03123 5.96877C6.15472 6.09226 6.24777 6.24282 6.303 6.4085L6.5 7L6.697 6.4085C6.75223 6.24282 6.84528 6.09226 6.96877 5.96877C7.09226 5.84528 7.24282 5.75223 7.4085 5.697L8 5.5L7.4085 5.303C7.24282 5.24777 7.09226 5.15472 6.96877 5.03123C6.84528 4.90774 6.75223 4.75718 6.697 4.5915L6.5 4Z"
    ></path>
  </svg>
  <span class="text_button">Next</span>
</button>

            </form>
          </div>
          <div style={{paddingLeft:'650px'}} className='flex  pt-4'>
        <img className='w-11 h-11' src={chatlogo}></img>
          <h1 className='text-white pl-3 pt-2 cursor-pointer text-2xl font-medium '>ChatVerse</h1>
          </div>
          
        </div>
      {/* OTP Input */}
      <div style={{ marginTop: '-100px' }} className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-transform duration-700 ${showOtpInput ? 'translate-x-0' : 'translate-x-full'}`}>
        <div style={{ marginRight: '480px', marginTop: '-500px' }}>
          <LeftArrow onClick={() => { setShowOtpInput(false); }} />
        </div>
        <div className='flex flex-col items-center mt-28 mr-[500px]'>
          <h1 className="text-center text-lg font-normal">+{phoneNumber}</h1>
          <h5 className='text-gray-400 mt-2 ml-40 text-center text-sm font-medium'>
            A code was sent via ChatVerse to your device <br />
            <span className='ml-8'>Enter the code below to verify your phone number</span>
          </h5>
          <div className='flex ml-40 gap-2 mt-4'>
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                className="w-12 h-12 text-center text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                maxLength="1"
                value={value}
                onChange={(e) => handleOtpChange(e, index)}
              />
            ))}
          </div>
          <Button onClick={verifyOtp} type="button" className='bg-[#24A1DE] text-lg px-36 ml-40 mt-10 hover:bg-[#24A1DE] hover:bg-opacity-85'>
            Next
          </Button>
          {isTrue && <p className='text-red-500 mt-4 ml-28'>{message}</p>}
        </div>
      </div>
    </div>
  );
}
