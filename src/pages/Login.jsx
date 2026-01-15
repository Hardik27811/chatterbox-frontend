import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            // Ensure you store the token so the chat sessions stay active
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response?.data?.message);
            alert(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4 font-sans">
            {/* Login Card */}
            <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
                
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-3xl mb-4 shadow-lg shadow-emerald-200 rotate-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white -rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Sign In</h2>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Continue your conversations</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email Input */}
                    <div className="relative">
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <input 
                            type="password"
                            placeholder="Password"
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 mt-4 text-lg">
                        Open Chats
                    </button>
                </form>

                {/* Navigation Link */}
                <div className="mt-10 text-center border-t border-gray-50 pt-6">
                    <p className="text-gray-500 text-sm font-medium">
                        New to the community?{' '}
                        <button 
                            onClick={() => navigate('/register')}
                            className="text-emerald-600 font-black hover:text-emerald-700 transition-colors  hover:underline underline-offset-4 "
                        >
                            Register
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;