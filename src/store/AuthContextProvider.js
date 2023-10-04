import React, { useState, useEffect } from "react";
import AuthContext from "./AuthContext.js";
import firebase from "firebase/app";
import "firebase/auth";

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const userIsLoggedIn = !!token;

    useEffect(() => {
        // Check if the user's email is verified when the component mounts
        const user = firebase.auth().currentUser;
        if (user) {
            setIsEmailVerified(user.emailVerified);
        }
    }, [token]);

    const loginHandler = (token) => {
        if (typeof token === 'string' && token.trim() !== '') {
            setToken(token);
            console.log("Token set successfully:", token);
        } else {
            console.error("Token is empty or not a valid string");
        }
    }


    const logoutHandler = () => {
        setToken(null);
        setIsEmailVerified(false); // Reset email verification status on logout
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        isEmailVerified: isEmailVerified,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;