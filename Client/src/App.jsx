import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Chat from './pages/chat';
import Login from './components/Login';
import { useAppStore } from './store';
import axios from 'axios';

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

const PrivateRoute = ({ children }) => {
  const { userInfo, hasProfile } = useAppStore();
  const isAuthenticated = !!userInfo;

  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  } else if (isAuthenticated && !hasProfile && window.location.pathname !== '/profile') {
    return <Navigate to="/profile" />;
  } else if (isAuthenticated && hasProfile && window.location.pathname !== '/chat') {
    return <Navigate to="/chat" />;
  } else {
    return children;
  }
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};

function App() {
  const { setUserInfo, setHasProfile } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkTokenAndRestoreSession(setUserInfo, setHasProfile, setLoading);
  }, [setUserInfo, setHasProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
