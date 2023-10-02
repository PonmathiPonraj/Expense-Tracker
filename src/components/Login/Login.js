import React, { useState, useRef, useContext } from 'react';
import AuthContext from '../store/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const navigate = useNavigate();
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
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8'; // Replace with your API key
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
          return res.json();
        } else {
          if (!res.ok) {
            return res.json().then((data) => {
              let errorMessage = "Authentication unsuccessful";
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
        navigate('/updateprofile'); // Redirect to UpdateProfile
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div>
      <section className={styles.auth}>
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className="control">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className="control">
            <label htmlFor="password">Your Password</label>
            <input type="password" id="password" required ref={passwordInputRef} />
          </div>
          {!isLogin && (
            <div className="control">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" required ref={confirmPasswordInputRef} />
            </div>
          )}
          <div className="actions">
            {!isLoading && <button type="submit">{isLogin ? 'Login' : 'Sign up'}</button>}
            <button
              type="button"
              className="toggle"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
export default Login;