import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Chat from './pages/chat';
import AOS from "aos";
import "aos/dist/aos.css";
import Login from './components/Login';
import { useAppStore } from './store';
import axios from 'axios';
import ProfileInfo from './pages/chat/components/contacts-container/components/profileinfo';


const checkTokenAndRestoreSession = async (setUserInfo, setHasProfile, setLoading) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/check-auth`, { withCredentials: true });
    if (response.data.success) {
      setUserInfo(response.data.userInfo);
      setHasProfile(response.data.hasProfile);
    }
  } catch (error) {
    console.log("Error restoring session:", error);
  } finally {
    setLoading(false);
  }
};

// AuthRoute Component
const AuthRoute = ({ children }) => {
  const { userInfo, hasProfile } = useAppStore();
  const isAuthenticated = !!userInfo;
  const isProfileComplete = !!hasProfile;

  if (isAuthenticated && isProfileComplete) {
    return <Navigate to="/chat" />;
  } else if (isAuthenticated && !isProfileComplete) {
    return <Navigate to="/profile" />;
  } else {
    return children;
  }
};

// PrivateRoute Component
const PrivateRoute = ({ children, requiredRoute }) => {
  const { userInfo, hasProfile } = useAppStore();
  const isAuthenticated = !!userInfo;
  const isProfileComplete = !!hasProfile;

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  if (isAuthenticated && requiredRoute === "/profile" && isProfileComplete) {
    return <Navigate to="/chat" replace />;
  }
  
  if (isAuthenticated && requiredRoute === "/chat" && !isProfileComplete) {
    return <Navigate to="/profile" replace />;
  }

  return children;
};

function App() {
  const {  isLogoutAllowed } = useAppStore();
  const { setUserInfo, setHasProfile } = useAppStore();
  const [loading, setLoading] = useState(true);
  const [allowProfileAccess, setAllowProfileAccess] = useState(false);

  
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  
  useEffect(() => {
    checkTokenAndRestoreSession(setUserInfo, setHasProfile, setLoading);
  }, [setUserInfo, setHasProfile]);

  
  return (
    <Router>
          <Routes>
          <Route path="/auth" element={isLogoutAllowed?<Auth /> :<AuthRoute >< Auth /></AuthRoute >} />
  <Route path="/chat" element={<PrivateRoute requiredRoute="/chat"><Chat /></PrivateRoute>} />
  <Route path="/profile" element={allowProfileAccess?<PrivateRoute ><Profile /></PrivateRoute> : <PrivateRoute ><Profile /></PrivateRoute>} />
  <Route path="*" element={<Navigate to="/auth" />} />
</Routes>
    </Router>
  );
}

export default App;
