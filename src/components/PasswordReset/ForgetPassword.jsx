import { useDispatch,useSelector } from 'react-redux';
import { forgotPassword , clearState } from '../../redux/authSlice';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {

    const dispatch = useDispatch();
    const {loading,error,successMessage} = useSelector((state)=> state.auth);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    // const [loading, setLoading] = useState(false);
    

    const handleForgetPassword = async (e) => {
        e.preventDefault();
        await dispatch(forgotPassword({email}));
    };
    useEffect(()=>{
        if(successMessage){
            alert(successMessage);
            dispatch(clearState()) //Clear so alert doesn't show again
        }
        if (error) {
            alert(error);
            dispatch(clearState());
        }
    },[error,successMessage,dispatch])

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4 font-sans">
            {/* Forgot Password Card */}
            <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
                
                {/* Brand Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-500 rounded-3xl mb-4 shadow-lg shadow-emerald-200 -rotate-3">
                        {/* Lock Icon matching the Login Style */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white rotate-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-black text-gray-800 tracking-tight">Recover</h2>
                    <p className="text-gray-400 text-sm mt-2 font-medium">Lost your way? Let's get you back.</p>
                </div>

                <form onSubmit={handleForgetPassword} className="space-y-4">
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

                    {/* Action Button */}
                    <button 
                        disabled={loading}
                        className={`w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 mt-4 text-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Sending...' : 'Request Link'}
                    </button>
                </form>

                {/* Navigation Link */}
                <div className="mt-2 text-center border-t border-gray-50 pt-6">
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-emerald-600 text-sm font-medium hover:text-emerald-700 transition-colors hover:underline underline-offset-4 "
                    >
                        Return to Login
                    </button>
                   
                    <p className="text-gray-500 text-sm font-medium mt-8">
                        Need more help?{' '}
                        <button 
                            className="text-emerald-600 font-bold hover:underline"
                        >
                            Support
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;