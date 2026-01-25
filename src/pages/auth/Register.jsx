import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {registerUser} from '../../redux/authSlice'
import { Eye, EyeOff } from 'lucide-react';

const Register = () => {

    const dispatch = useDispatch();
    const {loading,error} = useSelector((state)=> state.auth);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword,setShowPassword] = useState(false);
    const [showConfPassword,setShowConfPassword] = useState(false);


    // const [loading,setLoading] = useState(false);
    

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return alert("Passwords must match");
        }
        const res = await dispatch(registerUser({name, email, password }));
        if(registerUser.fulfilled.match(res)){
            navigate('/dashboard');
        }else{
            alert(resultAction.payload || "Registration failed");
        }

        // setLoading(true);
        // try {
        //     const data = await register( { name, email, password });
        //     localStorage.setItem('token',data.token);
        //     navigate('/dashboard');
        // } catch (err) {
        //     console.error(err?.data?.message);
        //     alert(err.data?.message || "Registration failed");
        // }finally{
        //     setLoading(false);
        // }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] px-4 font-sans">
        
            <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-xl shadow-gray-200/50">
                
          
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
                         <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full bg-gray-50 px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all placeholder:text-gray-400 text-gray-700"
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
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
                    </div>

                    {/* Register Button */}
                    <button disabled={loading} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 mt-2">
                        {loading ? 'Signing up...' : 'Start Chatting'}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    Already have a Chat ID?{' '}
                    <button 
                        onClick={() => navigate('/login')}
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