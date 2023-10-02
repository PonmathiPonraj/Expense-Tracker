import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './store/AuthContext';
import classes from './MainNavigation.module.css';
import AuthContext from './store/AuthContext';
import classes from './MainNavigation.module.css'

const MainNavigation = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const logoutHandler = () => {
        authCtx.logout();
        navigate('/');
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
            <button onClick={logoutHandler}>Logout</button>
        </header>
    );
};

export default MainNavigation;