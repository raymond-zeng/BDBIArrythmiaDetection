// Register.js

import React, { useState } from 'react';
import './Login.css';
import { register } from '../../authService';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await register(email, password);
            alert("Registration successful!");
        } catch (error) {
            console.error("Error during registration:", error.message);
        }
    };

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={handleRegister}>
                    <div className="username">
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="label">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button className="button" type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Registration;