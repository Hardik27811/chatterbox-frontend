import { useDispatch,useSelector } from 'react-redux';
import { resetPassword , clearState } from '../../redux/authSlice';
import { Eye, EyeOff } from 'lucide-react';

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const ResetPassword = () => {
    const dispatch = useDispatch();
    const {loading , error , successMessage } = useSelector((state)=> state.auth);

    const { resetToken } = useParams(); 
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
       const [showPassword,setShowPassword] = useState(false);
        const [showConfPassword,setShowConfPassword] = useState(false);
    // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            return alert("Passwords do not match!");
        }
        await dispatch(resetPassword({resetToken,password}))
        navigate('/login');
    };
    useEffect(()=>{
        if(successMessage){
            alert(successMessage);
            dispatch(clearState());
            
        }
        if(error){
            alert(error);
            dispatch(clearState());
        }
    },[ error , successMessage ,dispatch])
    // console.log("URL TOKEN:", resetToken);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4 font-sans">
            <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
                
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-3xl mb-4 shadow-lg shadow-emerald-200 rotate-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">New Password</h2>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Create a strong, secure password.</p>
                </div>

                <form onSubmit={handleReset} className="space-y-4">
        
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors focus:outline-none"
                        >
                           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    
                    <div className="relative">
                        <input 
                            type={showConfPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfPassword(!showConfPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-500 transition-colors focus:outline-none"
                        >
                           {showConfPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button 
                        disabled={loading}
                        className={`w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 mt-4 text-lg ${loading ? 'opacity-70' : ''}`}
                    >
                        {loading ? 'Updating...' : 'Update Password'}
                    </button>
                </form>
                 <div className="mt-8 text-center">
                    Return to SignIn {'  '}
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-emerald-600 font-bold text-sm hover:underline underline-offset-4"
                    >
                      {''}Sign In
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ResetPassword;