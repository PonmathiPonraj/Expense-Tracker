import React, { useContext } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import AuthContext from '../store/AuthContext';

const VerifyEmailButton = () => {
    const authCtx = useContext(AuthContext);

    const sendVerificationEmail = async () => {
        try {
            const user = firebase.auth().currentUser;

            if (user) {
                await user.sendEmailVerification();

                // Provide feedback to the user
                alert('A verification email has been sent. Please check your inbox.');
            } else {
                // Handle the case when the user is not authenticated
                alert('User not authenticated. Please log in.');
            }
        } catch (error) {
            console.error('Error sending verification email:', error);

            // Handle different error cases
            if (error.code === 'auth/user-not-found') {
                alert('User not found. Please log in.');
            } else if (error.code === 'auth/too-many-requests') {
                alert('Too many requests. Please try again later.');
            } else {
                alert('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div>
            <button onClick={sendVerificationEmail}>Send Verification Email</button>
        </div>
    );
};

export default VerifyEmailButton;