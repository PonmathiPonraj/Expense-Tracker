import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../store/AuthContext';
import classes from './UpdateDetail.module.css';

const UpdateDetail = () => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        // Clear the idToken from local storage
        localStorage.removeItem('idToken');

        // Call the logout method from your AuthContext to update the authentication state
        authCtx.logout();

        // Redirect to the login page
        navigate('/Login');
    };

    return (
        <div>
            <header className={classes.header}>
                {authCtx.isLoggedIn && (
                    <button className={classes['logout-button']} onClick={logoutHandler}>
                        Logout
                    </button>
                )}
                <h1>Welcome to the Expense Tracker</h1>
                <nav className={classes['nav-links']}>
                    <ul>
                        <li>
                            <Link to="/completeprofile">Complete Your Profile</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default UpdateDetail;