import React, { useState } from 'react'
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import Lottie from 'lottie-react';
import robot from '../../../../../../assets/robot.json'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
export default function NewDm() {
    const [openNewContactModal,setOpenNewContactModal]=useState(false)
    const[searchedContacts , setSearchedContacts]=useState([])
    const searchContacts=async(searchTerm)=>
    {
        
    }
  return (
    <div>
    <svg onClick={()=>setOpenNewContactModal(true)} data-tooltip-id="my-tooltip" className="w-5 h-5 ml-72 cursor-pointer text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7 7V5"/>
</svg>
<Tooltip id="my-tooltip"place="top" content="ADD NEW CONTACT" />
<Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
  <DialogContent className='bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col'>
    <DialogHeader>
      <DialogTitle> Please select a contact</DialogTitle>
      <DialogDescription>
       
      </DialogDescription>
    </DialogHeader>
    <div>
    <input onChange={(e)=>searchContacts(e.target.value)}  placeholder='Search Contacts ' className='rounded-lg w-full h-10 p-6 border-none bg-[#2c2e3b]'></input>

    </div>
    {searchedContacts.length<=0 &&<div>
        <div >
        <Lottie 
      animationData={robot}
      loop
      autoplay
      style={{ width: 200, height: 200 , marginLeft:80 }} // Adjust size as needed
    />

    

 
<div class="div">
  <p  className='text-xl lg:text-2xl ml-16'>Hi , Search new Contact<span id="lol"></span></p>
</div>

    

    </div>

    </div>}
  </DialogContent>
</Dialog>

</div>
  )
}
