import React from 'react'
import ChatHeader from './components/chat-header'
import MessageContainer from './components/message-container'
import MessageBar from './components/message-bar'
export default function ChatContainer() {
  return (
    <div className=' top-0 h-[100vh] w-[70vw] bg-[#1c1d25] flex flex-col md:static md:flex1'>
    <ChatHeader/>
    <MessageContainer/>
    <MessageBar/>
    </div>
  )
}
