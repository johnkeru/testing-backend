import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const host = import.meta.env.VITE_PRODUCTION_HOST || 'http://localhost:8000'

    useEffect(() => {
        axios.get(host + '/api/hi').then(console.log)
    }, [])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [user, setUser] = useState(null);


    const handleLogin = async () => {
        try {
            const response = await axios.post(host + '/login', {
                email,
                password,
            },);
            const data = response.data;
            if (data.success) {
                setToken(data.data.token);
                fetchUser(data.data.token);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchUser = async (token) => {
        try {
            const response = await axios.get(host + '/api/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const userData = response.data;
            if (response.status === 200) {
                setUser(userData);
            } else {
                console.error(userData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div>
            <h1>Login: updated</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>

            {user && (
                <div>
                    <h2>User Details</h2>
                    <p>Email: {user.data.email}</p>
                    {/* Render other user details as needed */}
                </div>
            )}
        </div>
    );
};

export default App;


