import React, { useState } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import axios from 'axios';
import Lottie from 'lottie-react';
import robot from '../../../../../../assets/robot.json';
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_API_URL,
    withCredentials: true,
});

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useAppStore } from '@/store';

export default function NewDm() {
    const{setSelectedChatType,setSelectedChatData}=useAppStore();
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm) => {
        if (!searchTerm) {
            setSearchedContacts([]); 
            return;
        }
    
        try {
            const response = await axiosInstance.post('/contacts/search', { searchTerm }, {
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.status === 200) {
                setSearchedContacts(response.data.contacts); 
            } else {
                console.error('Error searching contacts:', response.statusText);
            }
        } catch (error) {
            console.error('Error searching contacts:', error);
        }
    }
    const selectNewContact=(contact)=>
    {
        setOpenNewContactModal(false);
        setSearchedContacts([]);
        setSelectedChatType("contact")
        setSelectedChatData(contact)
   
    }
    return (
        <div>
            <svg 
                onClick={() => setOpenNewContactModal(true)} 
                data-tooltip-id="my-tooltip" 
                className="w-5 h-5 ml-48  cursor-pointer  text-white dark:text-white" 
                aria-hidden="true" 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                fill="none" 
                viewBox="0 0 24 24"
            >
                <path 
                    stroke="currentColor" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M5 12h14m-7 7V5" 
                />
            </svg>
            <Tooltip id="my-tooltip" place="top" content="ADD NEW CONTACT" />
            <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
                <DialogContent className='bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col'>
                    <DialogHeader>
                        <DialogTitle> Please select a contact</DialogTitle>
                        <DialogDescription>
                            {/* Add any additional description here */}
                        </DialogDescription>
                    </DialogHeader>
                    <div>
                        <input
                            onChange={(e) => searchContacts(e.target.value)}
                            placeholder='Search Contacts'
                            className='rounded-lg w-full h-10 p-6 border-none bg-[#2c2e3b]'
                        />
                    </div>
                    {searchedContacts.length <= 0 && (
                        <div>
                            <Lottie
                                animationData={robot}
                                loop
                                autoplay
                                style={{ width: 200, height: 200, marginLeft: 80 }} // Adjust size as needed
                            />
                            <div>
                                <p className='text-xl lg:text-2xl ml-16'>
                                    Hi, Search new Contact<span id="lol"></span>
                                </p>
                            </div>
                        </div>
                    )}
<ScrollArea className='h-[250px]'>
                    {searchedContacts.map(contact => (
    <div key={contact._id} onClick={()=>selectNewContact(contact)}  className="flex items-center  p-4 border-b border-gray-700 hover:bg-gray-800 cursor-pointer">
        <div className=" flex  ml-4">
        <div>
          <img className='w-[8.2vh] h-[8.2vh] rounded-full'  src={contact.profileImage}/>
          </div>
          <div className='ml-3 mt-1'>
            <p className="text-lg font-semibold">{contact.firstName && contact.lastName ? `${contact.firstName} ${contact.lastName}`:contact.phoneNumber}</p>
            <p className="text-xs font-semibold text-gray-500">+{contact.phoneNumber} </p>
            </div>
            
        
        </div>
    </div>
))}
</ScrollArea>

                </DialogContent>
            </Dialog>
        </div>
    );
}
