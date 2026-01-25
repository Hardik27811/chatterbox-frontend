import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center px-4 font-sans">
      <div className="max-w-3xl w-full bg-white p-12 md:p-20 rounded-[3rem] shadow-2xl shadow-gray-200/50 text-center relative overflow-hidden">
        
        {/* Decorative Background Blob */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>

        {/* Brand Icon */}
        <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-500 rounded-[2.5rem] mb-8 shadow-xl shadow-emerald-200 rotate-12 transition-transform hover:rotate-0 duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white -rotate-12 hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>

        {/* Text Content */}
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-6">
          Chatter<span className="text-emerald-500">Box</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-medium mb-12 max-w-md mx-auto leading-relaxed">
          The most seamless way to connect, share, and chat with your favorite people in real-time.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/register" 
            className="w-full sm:w-48 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-emerald-200 transition-all active:scale-95 text-lg"
          >
            Get Started
          </Link>
          
          <Link 
            to="/login" 
            className="w-full sm:w-48 bg-gray-50 hover:bg-gray-100 text-emerald-600 font-bold py-4 px-8 rounded-2xl transition-all active:scale-95 text-lg border border-gray-100"
          >
            Login
          </Link>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 pt-8 border-t border-gray-50">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">
            Trusted by 10,000+ chatters
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;