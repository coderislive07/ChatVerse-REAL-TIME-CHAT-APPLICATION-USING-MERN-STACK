import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Preloader1 from '@/components/preloader/preloader1';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL,
  withCredentials: true,
});
const ProfileInfo = ({ }) => {
  
  const navigate = useNavigate(); 
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await axiosInstance.get('/profile-info');
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError('Failed to fetch profile information');
        console.error('Error fetching profile information:', err);
      }
    };

    fetchProfileInfo();
  }, [axiosInstance]);

  const handleNavigateToProfile = () => {

    navigate('/profile');
  };
  const logOut = async () => {
    setIsLoading(true);
    try {
   
      await axiosInstance.post('/logout');
  
      const timer = setTimeout(() => {
        setIsLoading(false);
        navigate('/auth');
      }, 2000); 
      return () => clearTimeout(timer);
    } catch (error) {
      console.error('Error during logout:', error);
      setError('Failed to log out');
    }
  };
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <Preloader1 />
      </div>
    );
  }

  return (
    
    <div className='absolute bottom-0 h-20 flex items-center justify-between px-10 w-full bg-[#2a2b33]'>
      
      <div className='flex gap-3 items-center justify-center'>
        {user ? (
          <>
            <img
              src={user.profileImage || 'default-profile.png'}
              alt={`${user.firstName} ${user.lastName}`}
              className='w-[8.2vh] h-[8.2vh] rounded-full'
            />
            <div className='text-white'>
              <p>{user.firstName} {user.lastName}</p>
            </div>
          </>
        ) : (
          <p className='text-white'>{error || 'Loading profile information...'}</p>
        )}
      </div>
      <svg onClick={handleNavigateToProfile} style={{ marginLeft: '160px' }} className="w-8 h-8 text-purple-800 pen cursor-pointer " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z" />
      </svg>
      <svg onClick={logOut} className='w-8 h-8 stroke-red-800 power cursor-pointer'  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

        <g id="SVGRepo_bgCarrier" stroke-width="0" />

        <g id="SVGRepo_tracerCarrier"  />

        <g id="SVGRepo_iconCarrier"> <path d="M12 3V12M18.3611 5.64001C19.6195 6.8988 20.4764 8.50246 20.8234 10.2482C21.1704 11.994 20.992 13.8034 20.3107 15.4478C19.6295 17.0921 18.4759 18.4976 16.9959 19.4864C15.5159 20.4752 13.776 21.0029 11.9961 21.0029C10.2162 21.0029 8.47625 20.4752 6.99627 19.4864C5.51629 18.4976 4.36274 17.0921 3.68146 15.4478C3.00019 13.8034 2.82179 11.994 3.16882 10.2482C3.51584 8.50246 4.37272 6.8988 5.6311 5.64001"  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g>

      </svg>
 

    </div>
  );
};

export default ProfileInfo;
