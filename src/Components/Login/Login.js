import React from 'react';
import './Login.css';

function Login() {
    return (
        <div className="container">
            <div className="form">
                <div className="username">
                    <label className="label">Username</label>
                    <input type="text" />
                </div>
                <div className="password">
                    <label className="label">Password</label>
                    <input type="password" />
                </div>
                <button className="button" type="submit">Login</button>
            </div>
        </div>
    );
}

export default Login;
