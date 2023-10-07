import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { premiumActions } from '../store/PremiumSlice';
import { darkModeActions } from '../store/DarkModeSlice';

const Premium = () => {
    const dispatch = useDispatch();
    const isPremium = useSelector((state) => state.premium.isPremium)

    const activatePremiumHandler = () => {
        dispatch(premiumActions.setPremium());
        console.log('premium is activated')
        alert('Enjoy your premium free trial for 30 days for free');
        console.log(isPremium)
    };

    const premiumButtonStyle = {
        backgroundColor: '#3498db', // Background color for the button
        color: '#fff', // Text color
        padding: '10px 20px', // Padding
        border: 'none', // Remove border
        borderRadius: '4px', // Add a slight border-radius
        cursor: 'pointer', // Change cursor to pointer on hover
    };

    const darkModeHandler=()=>{
        dispatch(darkModeActions.toggleDarkMode());
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <button style={premiumButtonStyle} onClick={activatePremiumHandler}>
                Upgrade to Premium
            </button>
            {isPremium && <button onClick={darkModeHandler}>Dark Mode </button>}
        </div>
    );
};

export default Premium;