import React, { useState } from 'react';
import login from "../../assets/login.jpg";
import { Button } from '@/components/ui/button';
import Login from '@/components/Login';
export default function Auth() {
  const [showLogin, setShowLogin] = useState(false);
  const handleLogin = () => {
    setShowLogin(true);
  };
  const handleBack = () => {
    setShowLogin(false);
  };
  return (
    <>
      <div className={`auth-page ${showLogin ? 'translate-y-[-100vh]' : 'translate-y-0'} transition-transform duration-700`}>
        <img className='w-full h-[40vh]' src={login} alt="Login" />
        <div className='w-full h-[60vh] bg-[#1A2130] transition-transform duration-700'>
          <h1 className='text-white text-center text-2xl font-medium p-20'>Chat Verse</h1>
          <h5 style={{ marginTop: '-70px' }} className='text-gray-400 text-center text-lg font-medium '>Welcome to the official Chat Verse App. </h5>
          <h5 className='text-gray-400 text-center text-lg font-medium '>It's fast and secure.</h5>
          <div className='flex justify-center mt-4 py-5'>
            <Button onClick={handleLogin} className='bg-[#24A1DE] text-lg px-16 hover:bg-[#24A1DE] hover:bg-opacity-85'>Start Messaging</Button>
          </div>
        </div>
      </div>
      <div className={`fixed inset-0 bg-[#1A2130] flex justify-center items-center transition-opacity duration-700 ${showLogin ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Login onBack={handleBack} />
      </div>
    </>
  );
}
