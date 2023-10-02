import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Use BrowserRouter as Router
import Home from './components/Home/Home';
import AuthContextProvider from './store/AuthContext';
import UpdateProfile from './UpdateDetail/UpdateDetail';
import Profile from './components/Profile/Profile';
import Login from './components/Login/Login';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes> {/* Use Routes to define your routes */}
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/updateprofile" element={<UpdateProfile />} />
          <Route path="/completeprofile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};

export default App;