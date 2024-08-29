import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import boy from "../../assets/boy.png"
import axios from 'axios';

import { useAppStore } from '@/store';

const LeftArrow = ({onClick}) => (
  <svg
      onClick={onClick}  
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 25 25"
    className="w-6 h-6 ml-2 mt-3 absolute fill-current text-gray-400 cursor-pointer hover:text-gray-200 transition-colors duration-200"
    style={{ zIndex: 10 }}
  >
    <path d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left" />
  </svg>
);
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_URL, 
  withCredentials: true,
});
export default function Profile() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate =useNavigate();
  const { setHasProfile } = useAppStore();
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async () => {
    try {
      const token = document.cookie.split('=')[1]; // Get JWT from cookie
      const response = await axiosInstance.post('/update-profile', {
        firstName,
        lastName,
        profileImage,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, // Attach JWT token
        }
      });

      if (response.data.success) {
        console.log('Profile updated successfully');
        setHasProfile(true);
        navigate('/chat'); 
      } else {
        console.error('Profile update failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  

  return (
    <>
          <div><LeftArrow onClick={() => navigate('/chat')} /></div>

    <div data-aos="slide-left"  data-aos-offset="200" data-aos-easing="ease-in-sine" data-aos-duration="600" className="bg-[#1b1c24] h-[100vh] flex items-center justify-center">
      <div className="bg-[#2c2f38] p-8 rounded-lg shadow-lg w-[90%] max-w-[500px]">
        <h2 className="text-white text-2xl mb-6 text-center">Create Your Profile</h2>
        <div className="flex items-center justify-center w-full mb-7">
              <label className="cursor-pointer flex flex-col items-center p-4 bg-[#3a3f4b] rounded-full hover:opacity-70">
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={boy}
                    alt="Profile"
                    className="w-24 h-24 object-cover rounded-full"
                  />
                )}
              </label>
              
     
            </div>
            <svg className='bg-blue-600 cursor-pointer  rounded-xl p-1' style={{marginLeft:'170px' , marginTop:'-45px' , position:'absolute'}} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 25 25"><path d="M5 5h-3v-1h3v1zm8 5c-1.654 0-3 1.346-3 3s1.346 3 3 3 3-1.346 3-3-1.346-3-3-3zm11-4v15h-24v-15h5.93c.669 0 1.293-.334 1.664-.891l1.406-2.109h8l1.406 2.109c.371.557.995.891 1.664.891h3.93zm-19 4c0-.552-.447-1-1-1-.553 0-1 .448-1 1s.447 1 1 1c.553 0 1-.448 1-1zm13 3c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5 5-2.239 5-5z"/></svg>
            
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="p-3 bg-[#3a3f4b] rounded-md text-white focus:outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="p-3 bg-[#3a3f4b] rounded-md text-white focus:outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="flex flex-col items-center gap-4">

          {/* here label is using as a automatically trigger a button onsubmit type in form input type is hidden so when u click on click to upload it automatically triggers the input type=file  */}

        
          </div>
          <button style={{marginTop:'-10px'}}
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white p-3 rounded-md mt-6 hover:bg-blue-700 transition-all"
          >
            Save Profile
          </button>
        </div>
      </div>
    </div>
    </>
  );
  
}
