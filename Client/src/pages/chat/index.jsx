import React from 'react';
import { useAppStore } from '@/store';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

export default function Chat() {
  const { userInfo } = useAppStore();
  return (
    <div data-aos="slide-left" className="h-screen flex overflow-hidden">
      <div className="w-1/4 bg-[#2c2f38] p-4 flex flex-col">
        <h2 className="text-white text-lg mb-4">Chats</h2>
        <div className="flex-1 overflow-y-auto">
          {/* Placeholder chat items */}
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="p-3 mb-2 bg-[#3a3f4b] rounded-lg cursor-pointer hover:bg-[#4a4f5b] transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
                <div>
                  <p className="text-white">Person {index + 1}</p>
                  <p className="text-gray-400 text-sm">Last message...</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-[#1b1c24] p-6 flex flex-col">
    
        <div data-aos="slide-left"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="flex-1 flex flex-col justify-between" >

       
          {/* Chat header */}
          <div className="flex items-center border-b border-gray-700 pb-4 mb-4">
            <div className="w-10 h-10 bg-gray-600 rounded-full mr-3"></div>
            <div>
              <h2 className="text-white">Chat with Person {userInfo ? userInfo.name : ''}</h2>
              {userInfo && <p className="text-gray-400 text-sm">Phone Number: {userInfo.phoneNumber}</p>}
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto">
            {Array.from({ length: 15 }).map((_, index) => (
              <div key={index} className={`mb-4 ${index % 2 === 0 ? 'self-end' : ''}`}>
                <div className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
                  This is a message {index + 1}
                </div>
              </div>
            ))}
          </div>

          {/* Message input */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 p-3 bg-[#2c2f38] rounded-l-lg focus:outline-none text-white"
            />
            <button className="bg-blue-600 p-3 rounded-r-lg hover:bg-blue-700 transition-all text-white">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
