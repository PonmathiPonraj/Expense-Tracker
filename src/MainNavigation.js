import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './store/AuthContext';
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
        // Clear the idToken from local storage
        localStorage.removeItem('idToken');

        // Clear any other user-related data

        // Call the logout method from your AuthContext to update the authentication state
        authCtx.logout();
        //authCtx.setIsLoggedIn(false); // Set isLoggedIn to false

        // Redirect to the login page
        navigate('/Login');
    };

    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/products">Products</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                </ul>
            </nav>
            {authCtx.isLoggedIn && (
                <button onClick={logoutHandler}>Logout</button>
            )}
        </header>
    );
};

export default MainNavigation;