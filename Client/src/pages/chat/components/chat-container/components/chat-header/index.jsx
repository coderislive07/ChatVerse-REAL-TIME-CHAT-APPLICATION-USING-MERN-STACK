import React from 'react'
import './index.css'

export default function ChatHeader() {
  return (
    <div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-20'>
    <div className='flex gap-5 items-center'>
    <div className='flex gap-3 items-center justify-center'></div>
    <div className='flex items-center justify-center gap-5'>

<button class="Btn ">
  <span class="svgContainer">
    <svg
      viewBox="0 0 512 512"
      height="1.7em"
      xmlns="http://www.w3.org/2000/svg"
      class="svgIcon"
      fill="white"
    >
      <path
        d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
      ></path>
    </svg>
  </span>
  <span class="BG"></span>
</button>


    </div>

    </div>
  
    </div>
  )
}
