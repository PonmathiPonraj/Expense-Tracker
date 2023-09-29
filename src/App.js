import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login'; 
import Home from './components/Home/Home';
import MainNavigation from './MainNavigation';
import Profile from './components/Profile/Profile';
import AuthContextProvider from './store/AuthContextProvider';

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <MainNavigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  );
};
    
export default App;