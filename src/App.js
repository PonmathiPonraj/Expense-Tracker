import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainNavigation from './MainNavigation';
import Profile from './components/Profile/Profile';
import AuthContext from './store/AuthContext';
import VerifyEmailButton from './components/VerifyEmailButton'; 

function App() {
  const authCtx = useContext(AuthContext); // Get the authentication context

  return (
    <Router>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <>
              <Profile />
              {authCtx.isLoggedIn && !authCtx.isEmailVerified && (
                <VerifyEmailButton />
              )}
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
