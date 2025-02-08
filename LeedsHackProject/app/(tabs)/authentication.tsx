import { View, Text } from 'react-native'

import React, { useState } from 'react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (email === 'user@example.com' && password === 'password123') {
            alert('Login successful');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-page">
            <h1>Login</h1>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="error">{error}</p>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;
