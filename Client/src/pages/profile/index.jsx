import React from 'react'
import { useAppStore } from '@/store';
export default function Profile() {
  const {userInfo}=useAppStore();
  return (
    <div>
      Profile
      <div>{userInfo}</div>
    </div>
  )
}
