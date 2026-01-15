import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return alert("Passwords must match");
        }
        try {
            await api.post('/auth/register', { name, email, password });
            navigate('/dashboard');
        } catch (err) {
            console.error(err.response?.data?.message);
            alert(err.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4 font-sans">
            {/* Main Chat-style Card */}
            <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl shadow-gray-200/50">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4 shadow-lg shadow-emerald-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black text-gray-800 tracking-tight">Create Chat ID</h2>
                    <p className="text-gray-400 text-sm mt-1 font-medium">Connect with the world in seconds</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <input 
                            type="text"
                            placeholder="Display Name"
                            className="w-full bg-gray-50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email Address"
                            className="w-full bg-gray-50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password Fields */}
                    <div className="grid grid-cols-1 gap-4">
                        <input 
                            type="password"
                            placeholder="Password"
                            className="w-full bg-gray-50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                        />
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full bg-gray-50 px-5 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* Register Button */}
                    <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 mt-2">
                        Start Chatting
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    Already have a Chat ID?{' '}
                    <button 
                        onClick={() => navigate('/')}
                        className="text-emerald-600 font-bold text-sm hover:underline underline-offset-4"
                    >
                      Sign In
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;