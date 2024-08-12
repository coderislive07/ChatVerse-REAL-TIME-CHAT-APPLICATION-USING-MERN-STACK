import React from 'react'
import { useAppStore } from '@/store'
export default function Chat() {
  const {userInfo}=useAppStore();
  return (
    <div >
    <h1>Welcome Sir . </h1>
    {userInfo && <p>Phone Number: {userInfo.phoneNumber}</p>}
    </div>
  )
}
