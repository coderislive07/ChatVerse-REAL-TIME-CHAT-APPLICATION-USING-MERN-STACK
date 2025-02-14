import React, { useState } from 'react';
import login from "../../assets/login.jpg";
import { Button } from '@/components/ui/button';
import Login from '@/components/Login';
import chatlogo from '../../assets/chatlogo.png'
import pageturner from '../../assets/pageturner.png'
import './auth.css'
export default function Auth() {
  const [showLogin, setShowLogin] = useState(false);
  const handleLogin = () => {
    setShowLogin(true);
  };
  const handleBack = () => {
    setShowLogin(false);
  };
  return (
    <>
      <div  className={`auth-page ${showLogin ? 'translate-y-[-100vh]' : 'translate-y-0'} transition-transform duration-700 `}> 
      <div
  style={{ backgroundImage: `url(${pageturner})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}
  className='flex transition-transform duration-700 sm:h-[100vh] md:h-[67vh] lg:h-[33vh] xl:h-[100vh] 2xl:h-[100vh] '
>
        <div className='flex pl-7 pt-4'>
        <img className='w-11 h-11' src={chatlogo}></img>
          <h1 className='text-white pl-3 pt-2 cursor-pointer text-xl font-medium '>ChatVerse</h1>
          </div>
          <div style={{marginLeft:'-150px'}} className='pt-28 '>
          <div>
            <h1 className='text-white sm:w-[55vh] sm:text-lg text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-medium pt-20 md:pt-28 pl-4 md:pl-8 lg:pl-14'>Connect instantly with <br/> your loved ones</h1>
            <p className=' pt-6 text-gray-300  sm:pl-[7vh] '>Experience seamless , user-firendly messaging that <br/>brings people together effortlessly.</p>
          </div>

         
          <div className=' sm:pl-[6vh]  py-10 '>
          <button onClick={handleLogin}  type="button" className="btn  ">
  <h1 className='text-white text-end font-semibold'>Start Chatting Now →</h1>
  <div id="container-stars">
    <div id="stars"></div>
  </div>

  <div id="glow">
    <div className="circle"></div>
    <div className="circle"></div>
  </div>
</button>


          </div>
          
          </div>
    
<div  className=" card sm:h-[80vh] sm:ml-[60rem]  sm:w-[18vh] 2xl:ml-[130vh]">
  <ul>
    <li className="iso-pro">
      <span></span>
      <span></span>
      <span></span>
      <a href="">
        <svg
          viewBox="0 0 320 512"
          xmlns="http://www.w3.org/2000/svg"
          className="svg"
        >
          <path
            d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"
          ></path></svg
      ></a>
      <div className="text">Facebook</div>
    </li>
    <li className="iso-pro">
      <span></span>
      <span></span>
      <span></span>
      <a href="">
        <svg
          className="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
          ></path>
        </svg>
      </a>
      <div className="text">Twitter</div>
    </li>
    <li className="iso-pro">
      <span></span>
      <span></span>
      <span></span>
      <a href="">
        <svg
          className="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
          ></path>
        </svg>
      </a>
      <div className="text">Instagram</div>
    </li>
  </ul>
</div>

          
        </div>
        
      </div>
      <div style={{ backgroundImage: `url(${pageturner})` }}className={`fixed inset-0  flex justify-center items-center transition-opacity duration-700 ${showLogin ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Login onBack={handleBack} />
      </div>
    </>
  );
}
