import React from 'react';
import { useDispatch } from 'react-redux';
import { premiumActions } from '../store/PremiumSlice';

const Premium = () => {
    const dispatch = useDispatch();

    const activatePremiumHandler = () => {
        dispatch(premiumActions.setPremium());
        alert('Enjoy your premium free trial for 30 days for free');
    };

    const premiumButtonStyle = {
        backgroundColor: '#3498db', // Background color for the button
        color: '#fff', // Text color
        padding: '10px 20px', // Padding
        border: 'none', // Remove border
        borderRadius: '4px', // Add a slight border-radius
        cursor: 'pointer', // Change cursor to pointer on hover
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <button style={premiumButtonStyle} onClick={activatePremiumHandler}>
                Upgrade to Premium
            </button>
        </div>
    );
};

export default Premium;