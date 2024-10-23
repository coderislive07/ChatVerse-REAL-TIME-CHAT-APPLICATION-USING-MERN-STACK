import React from 'react'
import './index.css'
import { useAppStore } from '@/store'

export default function ChatHeader() {
  const { closeChat, selectedChatData } = useAppStore();

  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
      <div className='flex items-center flex-grow'>
        <div className='flex items-center'>
          <div style={{marginLeft:'-55px'}} className='flex items-center gap-3'>
            <img
              src={selectedChatData.profileImage || 'default-profile.png'}
              alt={`${selectedChatData.firstName || 'User'} ${selectedChatData.lastName || ''}`}
              className='w-[6.7vh] h-[6.7vh] rounded-full'
            />
            <div className='text-white  flex-grow max-w-[250px] overflow-hidden text-overflow-ellipsis'>
              <p>{selectedChatData.firstName} {selectedChatData.lastName}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center'>
        <button className="Btn">
          <span className="svgContainer">
            <svg onClick={closeChat}
              viewBox="0 0 512 512"
              height="1.7em"
              xmlns="http://www.w3.org/2000/svg"
              className="svgIcon"
              fill="white"
            >
              <path
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              ></path>
            </svg>
          </span>
          <span className="BG"></span>
        </button>
      </div>
    </div>
  );
}
