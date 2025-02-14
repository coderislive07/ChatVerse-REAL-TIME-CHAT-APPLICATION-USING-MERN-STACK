import React from 'react';
import chatlogo from '../../../../assets/chatlogo.png'
import './index.css'
import ProfileInfo from './components/profileinfo';
import NewDm from './components/new-dm';
export default function ContactsContainer() {
  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[40vw] max-w-[600px] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
       <div className='flex pl-3 pt-3'>
        <img className='w-11 h-11' src={chatlogo}></img>
          <h1 className='text-white pl-3 pt-2 cursor-pointer text-2xl font-medium '>ChatVerse</h1>
          </div>
          <div className='pt-6  pl-10'>
          <div className='flex' >
             <h1  className='text-gray-500 contacts  cursor-pointer '>DIRECT MESSAGES</h1>
             <NewDm/>
             </div>
      <h1 className='text-gray-500 contacts hover:text-white pt-4 cursor-pointer'>CHANNELS</h1>
          </div>
          <ProfileInfo/>
    </div>
  );
}
