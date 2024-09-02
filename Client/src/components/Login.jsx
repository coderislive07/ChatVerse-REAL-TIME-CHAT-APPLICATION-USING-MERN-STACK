import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import 'react-phone-number-input/style.css';
import 'react-phone-input-2/lib/style.css';
import './style.css';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import chatlogo from '../assets/chatlogo.png'
import arrowbg from '../assets/arrowbg.png'
import mobilescreen from '../assets/mobile.svg'
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

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
      console.log("verifying otp")
      let userOtp = parseInt(otp.join(""));
      const response = await axiosInstance.post('/verify-otp', {
        phoneNumber: Number(phoneNumber),
        userOTP: userOtp
      });

      console.log("Server Response:", response.data);
  
      if (response.data.success) {
        setUserInfo({ phoneNumber });
        setHasProfile(response.data.hasProfile);
        if (response.data.hasProfile) {
          navigate('/chat');
        } else {
          navigate('/chat');
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

  const backToLogin=()=>
  {
    setShowOtpInput(false)

  } 

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
          
     
         
<button class="black-button">
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
        <img className='w-11 h-11 ' src={chatlogo}></img>
          <h1 className='text-white pl-2 pt-2  cursor-pointer text-xl font-medium '>ChatVerse</h1>
          </div>
        </div>

      {/* OTP Input */}
<div style={{ backgroundImage: `url(${arrowbg})`  , backgroundSize:'cover' , backgroundRepeat:'no-repeat'}} className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-transform duration-700 ${showOtpInput ? 'translate-x-0' : 'translate-x-full'}`}>
<div style={{marginTop:'-710px'}}>
          <LeftArrow onClick={backToLogin} />
        </div>
<div>
  <div style={{marginTop:'-360px'}} className="design-container   ">
    <div className="design-wrapper">
      { <div className="call  ">
        <div>
        <p className="phone-number">+{phoneNumber}</p>
        <p className="phone-desc">Your Mobile Number</p>
      </div>
        <div className="button-wrapper ml-10">
        <div className="rgbutton allow">
<svg  xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 348.08 348.08" version="1.1" fill="#000000">    <path d="m340.27 275.08-53.755-53.761c-10.707-10.664-28.438-10.34-39.518 0.744l-27.082 27.076c-1.711-0.943-3.482-1.928-5.344-2.973-17.102-9.476-40.509-22.464-65.14-47.113-24.704-24.701-37.704-48.144-47.209-65.257-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149 8.936-8.947c11.097-11.1 11.403-28.826 0.721-39.521l-53.755-53.767c-10.682-10.68-28.421-10.356-39.518 0.744l-15.15 15.237 0.414 0.411c-5.08 6.482-9.325 13.958-12.484 22.02-2.912 7.674-4.725 14.997-5.554 22.335-7.098 58.844 19.792 112.62 92.768 185.6 100.88 100.87 182.17 93.248 185.67 92.876 7.638-0.913 14.958-2.738 22.397-5.627 7.992-3.122 15.463-7.361 21.941-12.43l0.331 0.294 15.348-15.029c11.074-11.098 11.393-28.83 0.716-39.542z"></path>    </svg>
</div>
        <div className="rgbutton deny">
<svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 348.08 348.08" version="1.1" fill="#000000" height="200px" width="200px">    <path d="m340.27 275.08-53.755-53.761c-10.707-10.664-28.438-10.34-39.518 0.744l-27.082 27.076c-1.711-0.943-3.482-1.928-5.344-2.973-17.102-9.476-40.509-22.464-65.14-47.113-24.704-24.701-37.704-48.144-47.209-65.257-1.003-1.813-1.964-3.561-2.913-5.221l18.176-18.149 8.936-8.947c11.097-11.1 11.403-28.826 0.721-39.521l-53.755-53.767c-10.682-10.68-28.421-10.356-39.518 0.744l-15.15 15.237 0.414 0.411c-5.08 6.482-9.325 13.958-12.484 22.02-2.912 7.674-4.725 14.997-5.554 22.335-7.098 58.844 19.792 112.62 92.768 185.6 100.88 100.87 182.17 93.248 185.67 92.876 7.638-0.913 14.958-2.738 22.397-5.627 7.992-3.122 15.463-7.361 21.941-12.43l0.331 0.294 15.348-15.029c11.074-11.098 11.393-28.83 0.716-39.542z"></path>    </svg>
</div>
      </div>
      </div> }
      <form className="form-card mr-80">
  <p className="form-card-title">We have sent an otp to your number to confirm it</p>
  <p className="form-card-prompt">Enter the 6 digits OTP</p>
  <div className="form-card-input-wrapper">
    {otp.map((value, index) => (
      <input
        key={index}
        id={`otp-input-${index}`}
        type="tel"
        className="w-12 h-12 ml-2 text-center text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
        maxLength="1"
        value={value}
        onChange={(e) => handleOtpChange(e, index)}
      />
    ))}
  </div>
  <p className="call-again"><span className="underlined">Your code </span>will get expired after 5 minutes</p>
  <button onClick={verifyOtp} className="form-card-submit" type="button">Submit</button>
 
  {isTrue && <p className='text-red-500 mt-24'>{message}</p>}
</form>

    </div>
  <img className='pl-[70vh] mt-7' src={mobilescreen}></img>  
    </div>
    <div style={{paddingLeft:'1340px' , marginTop:'-340px'}} className='flex'>
        <img className='w-11 h-11' src={chatlogo}></img>
          <h1 className='text-white pl-3 pt-2 cursor-pointer text-2xl font-medium '>ChatVerse</h1>
          </div>
    </div>
    
    </div>
    </div>
  )
}
