import React, { useState } from 'react';
import './Login.css';
import { login } from '../../authService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            alert("Login successful!");
        } catch (error) {
            console.error("Error during login:", error.message);
        }
    };

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={handleLogin}>
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
                        <button className="button" type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
