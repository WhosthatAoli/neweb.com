"use client";
import { useState } from 'react';
import Banner from '@/components/banner';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.status === 200) {
            console.log('data', data);
            setMessage(`Logged in as ${data.email}`);
        } else {
            console.log('error', data);
            
        }
    };
    return (
        <div>
            <Banner />
            <h1>signup</h1>
            <input
                type="email"
                placeholder="Email"
                className="p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                className="p-2 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>signup</button>
            <p>{message}</p>
        </div>
    );
}
