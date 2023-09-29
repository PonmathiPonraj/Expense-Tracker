import React, { useState } from "react";
import AuthContext from "./AuthContext.js";

const AuthContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;

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
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
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