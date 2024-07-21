import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import 'react-phone-number-input/style.css';
import 'react-phone-input-2/lib/style.css';
import './style.css';
import hands from '../assets/hands.png';
import PhoneInput from 'react-phone-input-2';
import axios from 'axios';
const mypass=import.meta.env.VITE_REACT_APP_API_URL

const LeftArrow = ({ onClick }) => (
    <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        className="w-6 h-6 absolute fill-current text-gray-400 cursor-pointer hover:text-gray-200 transition-colors duration-200"
        style={{ marginLeft: '-230px', marginTop: '-100px' }}
    > 
        <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left" />
    </svg>
);


export default function Login({ onBack }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [message, setMessage] = useState('');

    const sendOtp = async () => {
        console.log("Send Otp is Running",mypass);
        try {
            const response = await axios.post(`${mypass}/send-otp`, {
              phoneNumber,
            });
    
            if (response.data.success) {
                setMessage('OTP sent successfully!');
            } else {
                setMessage('Failed to send OTP.');
            }
        } catch (error) {
            console.log(error);
            setMessage('Error: ' + error.message);
        }
    };

    return (
        <div className="login-page text-white transition-transform duration-700">
            <LeftArrow onClick={onBack} />

            <div className='flex gap-x-48'>
                <div className='image'>
                    <img src={hands} alt="Hands" />
                </div>
                <div className='login-container mt-28'>
                    <div className="flex flex-col items-center">
                        <h1 className="text-center text-xl font-normal">Your Phone Number</h1>
                        <h5 style={{ marginLeft: '32px' }} className='text-gray-400 mt-2 text-center text-sm font-medium'>
                            Please confirm your country code
                        </h5>
                        <h5 style={{ marginLeft: '12px' }} className='text-gray-400 text-center text-sm font-medium'>
                            and enter your phone number.
                        </h5>
                    </div>
                    <div className='flex'>
                        <div style={{ marginLeft: '32px' }} className='pt-14 flex justify-center'>
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
                    <hr className='border-gray-500 ml-10 mt-2' />
                    <form className="flex flex-col items-center mt-10" onSubmit={(e) => { e.preventDefault(); sendOtp(); }}>
                        <Button  type="submit" className='bg-[#24A1DE] text-lg px-32 ml-9 hover:bg-[#24A1DE] hover:bg-opacity-85'>
                            Next
                        </Button>
                        <div style={{ marginTop: '33px', marginLeft: '40px' }} id="recaptcha"></div>
                        {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}
