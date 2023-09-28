import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [isProfileIncomplete, setIsProfileIncomplete] = useState(true); // Set to true if the profile is incomplete

    return (
        <div>
            <h1>Welcome to Expense Tracker</h1>
            {isProfileIncomplete ? (
                <p>Your profile is incomplete. Please <Link to="/profile">complete your profile</Link>.</p>
            ) : (
                <p>Welcome to Expense Tracker! Your profile is complete.</p>
            )}
        </div>
    );
};

export default Home;