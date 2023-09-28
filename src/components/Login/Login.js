import React, { useState, useRef, useContext } from 'react';
import classes from './Login.module.css';
import AuthContext from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';

// Import or define the eye icon URL
const eyeIconUrl = 'https://tse3.mm.bing.net/th?id=OIP.32AFxKPGbh-H_qiUQDPMfwHaHa&pid=Api&P=0&h=220';

const Login = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        localStorage.setItem('email', enteredEmail);
        setIsLoading(true);
        let url;

        if (isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8';
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8';
        }
        
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            setIsLoading(false);
            if (res.ok) {
                navigate('/');
                return res.json();
            } else {
                if (!res.ok) {
                    return res.json().then((data) => {
                        let errorMessage = 'Authentication unsuccessful';
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }
                        throw new Error(errorMessage);
                    });
                }
            }
        })
        .then((data) => {
            authCtx.login(data.idToken);
        })
        .catch((err) => {
            alert(err.message);
        });
    };

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div>
            <section className={classes.auth}>
                <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" required ref={emailInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="password">Your Password</label>
                        <div className={classes.passwordInput}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                required
                                ref={passwordInputRef}
                            />
                            <button
                                type="button"
                                className={classes.togglePassword}
                                onClick={togglePasswordVisibility}
                            >
                                <img
                                    src={eyeIconUrl}
                                    alt={showPassword ? 'Hide Password' : 'Show Password'}
                                    className={classes.eyeIcon}
                                />
                            </button>
                        </div>
                    </div>
                    <div className={classes.actions}>
                        {!isLoading && (
                            <button type="submit">{isLogin ? 'Login' : 'Sign up'}</button>
                        )}
                        <div>Forgot Password</div>
                        <button
                            type="button"
                            className={classes.toggle}
                            onClick={switchAuthModeHandler}
                        >
                            {isLogin ? 'Create new account' : 'Login with an existing account'}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;