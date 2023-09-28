import React, { useContext, useRef } from 'react';
import AuthContext from '../../store/AuthContext';
import './Profile.module.css';

const Profile = () => {
    const authCtx = useContext(AuthContext);
    const nameInputRef = useRef();
    const imageInputRef = useRef();

    const submitHandler = async (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const photoUrl = URL.createObjectURL(imageInputRef.current.files[0]);
        if (!photoUrl) {
            alert('Please upload an image.');
            return;
        }
        const token = authCtx.token;
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCgl1Kkkaw7_gJny8ISnqxhFean3l_05B8', {
                method: 'POST',
                body: JSON.stringify({
                    idToken: token,
                    displayName: enteredName,
                    photoUrl: photoUrl,
                    deleteAttribute: ['DISPLAY_NAME'],
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },

            });
            if (response.ok) {
                alert('Profile updated successfully');
            } else {
                const errorResponse = await response.json();
                console.error(errorResponse); // Log the error response for debugging
                alert('Profile update failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input type="text" className="form-control" id="name" placeholder="Name" ref={nameInputRef} />
            </div>
            <div className="mb-3">
                <label htmlFor="photo" className="form-label">
                    Update your photo
                </label>
                <input type="file" className="form-control" id="photo" ref={imageInputRef} />
            </div>
            <button type="submit" className="btn btn-primary">
                Update details
            </button>
        </form>
    );
};

export default Profile;