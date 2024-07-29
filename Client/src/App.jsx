import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './pages/auth';
import Profile from './pages/profile';
import Chat from './pages/chat';
import Login from './components/Login';
import { useAppStore } from './store';

const PrivateRoute = ({ children }) => {
  const { userInfo, hasProfile } = useAppStore();
  const isAuthenticated = !!userInfo;
  console.log(userInfo);
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  } else if (isAuthenticated && !hasProfile) {
    return <Navigate to="/profile" />;
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
