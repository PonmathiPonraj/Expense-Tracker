import React, { useState } from 'react';
import classes from './ForgotPassword.module.css'; // Create a CSS module for styling

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const sendPasswordResetEmail = async () => {
        setIsLoading(true);

        try {
            // Send a password reset email to the entered email address using Firebase API
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        requestType: 'PASSWORD_RESET',
                        email: email,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.ok) {
                setMessage('Password reset email sent. Please check your inbox.');
            } else {
                setMessage('Password reset failed. Please check your email address.');
            }
        } 
        catch (error) {
            console.error('Error sending password reset email:', error);
            setMessage('An error occurred. Please try again later.');
        } 
        finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={classes.container}>
            <h2>Forgot Password</h2>
            <p>Enter your email address to reset your password.</p>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button onClick={sendPasswordResetEmail} disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Email'}
            </button>

            {message && <p className={classes.message}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;