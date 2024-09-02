import React from 'react';
import Lottie from 'lottie-react'; // Updated import for the latest version
import robot from '../../../assets/robot.json'; // Ensure the path is correct

const LottieAnimation = () => {
  return (
    <Lottie 
      animationData={robot}
      loop
      autoplay
      style={{ width: 500, height: 500 }} // Adjust size as needed
    />
    
  );
};

export default LottieAnimation;
