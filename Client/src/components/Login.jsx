import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import 'react-phone-number-input/style.css';
import 'react-phone-input-2/lib/style.css';
import './style.css';
import hands from '../assets/hands.png';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';

const mypass = import.meta.env.VITE_REACT_APP_API_URL;

const LeftArrow = ({ onClick }) => (
    <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        className="w-6 h-6 absolute fill-current text-gray-400 cursor-pointer hover:text-gray-200 transition-colors duration-200"
        style={{zIndex: 10 }} 
    >
        <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left" />
    </svg>
);

export default function Login({ onBack }) {
    const {setUserInfo}=useAppStore();
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isTrue, setisTrue] = useState(false);

    const [showOtpInput, setShowOtpInput] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill('')); // State to store OTP values

    const sendOtp = async () => {
        
        console.log("Send Otp is Running", mypass);
        try {
            const response = await axios.post(`${mypass}/send-otp`, {
                phoneNumber,
            });
            console.log(response)
            if (response.data.success) {
                setUserInfo(response.data.phone)
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
            let userOtp=parseInt(otp.join(""))
            const response = await axios.post("http://localhost:7452/verify-otp", {
                "phoneNumber":Number(phoneNumber),
                "userOTP":userOtp
            });
     
            if (response.data.success) {
                console.log('Navigating to /profile'); 
                navigate('/profile');
            } else {
               await setisTrue(true);
               if (response.data.state==="EXPIRED") {
                   setMessage('OTP EXPIRED');
                }
                else{
                   setMessage('Invalid OTP. Please try again.   ');

               }
            }
        } 
        catch (error) {
            await setisTrue(true)
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
                <div className='flex gap-x-24 w-full'>
                    <div className='pt-40 pl-52 flex-shrink-0'>
                        <img src={hands} alt="Hands" />
                    </div>
                    <div className='mt-28 flex-1'>
                        <div className="flex pt-28 flex-col items-center">
                            <h1 className="text-center text-xl font-normal">Your Phone Number</h1>
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
                                    containerStyle={{ width: '100%', maxWidth: '400px' }}
                                    inputStyle={{ width: '100%', color: 'white', backgroundColor: '#1A2130', borderColor: '#1A2130' }}
                                    buttonStyle={{ backgroundColor: '#1A2130', borderColor: '#1A2130' }}
                                    dropdownStyle={{ backgroundColor: '#1A2130', borderColor: '#1A2130', color: 'white' }}
                                    searchStyle={{ backgroundColor: '#1A2130', borderColor: '#1A2130', color: 'white' }}
                                />
                            </div>
                        </div>
                        <hr className='border-gray-500 ml-64 w-64 mt-2' />
                        <form className="flex flex-col items-center mt-10" onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
                            <Button type="submit" className='bg-[#24A1DE] ml-10 text-lg px-28 hover:bg-[#24A1DE] hover:bg-opacity-85'>
                                Next
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            {/* OTP Input */}
            <div style={{marginTop:'-100px'}} className={`absolute top-0 left-0 w-full h-full flex justify-center items-center transition-transform duration-700 ${showOtpInput ? 'translate-x-0' : 'translate-x-full'}`}>
            <div style={{marginRight:'480px', marginTop:'-500px'}}>
            <LeftArrow onClick={() => { setShowOtpInput(false); }} />
            </div>
                <div className='flex flex-col items-center mt-28 mr-[500px]'>
                  
                    <h1 className="text-center text-lg font-normal">+{phoneNumber}</h1>
                    <h5 className='text-gray-400 mt-2 ml-40 text-center text-sm font-medium'>
                        A code was sent via ChatVerse to your device <br></br>
                        <span className='ml-8'>Enter the code below to verify your phone number</span>
                    </h5>
                    <div className='flex ml-40 gap-2 mt-4'>
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                className="w-12 h-12 text-center text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400  "
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
