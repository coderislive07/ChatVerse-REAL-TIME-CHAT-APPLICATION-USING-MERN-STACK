import React, { useEffect  , useState} from 'react';
import ContactsContainer from './components/contacts-container';
import ChatContainer from './components/chat-container';
import EmptyChatContainer from './components/empty-chat-container';
import 'aos/dist/aos.css';
import Preloader from '@/components/preloader/preloader';
export default function ChatPage() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <Preloader/>
  }
  return (
    <div  data-aos="slide-left" data-aos-offset="200"  data-aos-easing="ease-in-sine" data-aos-duration="400"   className='flex h-full w-full  text-white overflow-hidden'>
      <ContactsContainer />
      {/* <EmptyChatContainer /> */}  
      <ChatContainer />
    </div>
  );
}
