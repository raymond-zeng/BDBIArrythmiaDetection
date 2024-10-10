import React from 'react';
import './Login.css';

function Login() {
    return (
    <div className="container">
        <div className = "form">
            <div className = "username">
                <label>Username</label>
                <input type = "text"/>
                <label>Password</label>
                <input type ="text"/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </div>
    </div>
    )
}

export default Login;