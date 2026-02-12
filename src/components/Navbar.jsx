import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, PlusSquare, User, LogOut, MessageCircle } from 'lucide-react'; // Using Lucide icons
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import CreateModal from './Posts/CreateModal';


const Navbar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const id = user?.name
  const nav = useNavigate();


  const [isCreateOpen,setIsCreateOpen] = useState(false);
  


  const navLinks = [
    { name: 'Home', path: '/dashboard', icon: <Home size={24} /> },
    { name: 'Search', path: '/search', icon: <Search size={24} /> },
    // { name: 'Create', path: '/create', icon: <PlusSquare size={24} /> },
    { name: 'Profile', path: `/${id}/`, icon: <User size={24} /> },
    { name: 'Chat' , path: '/chat' , icon: <MessageCircle size={24}/>}
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = ()=>{
    dispatch(logout());
    nav('/login')
  }

  return (
    <>
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 
                    md:top-0 md:left-0 md:h-screen md:w-20 lg:w-64 md:border-t-0 md:border-r 
                    transition-all duration-300">
      
      <div className="flex md:flex-col h-full items-center justify-around md:justify-start md:p-4">
        
        {/* Logo - Hidden on Mobile */}
        <div className="hidden md:flex items-center w-full mb-10 px-2"
         onClick={()=> nav('/dashboard')}
        >
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white cursor-pointer font-bold text-xl"
          >
            C
          </div>
          <span className="ml-3 text-xl font-black text-gray-800 hidden lg:block cursor-pointer">ChatterBox</span>
        </div>

        {/* Navigation Links */}
        <div className="flex md:flex-col w-full justify-around md:space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center p-3 rounded-2xl transition-all group
                ${isActive(link.path) 
                  ? 'text-emerald-500 bg-emerald-50 md:bg-emerald-50' 
                  : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className={`${isActive(link.path) ? 'scale-110' : ''} transition-transform`}>
                {link.icon}
              </span>
              <span className={`ml-4 font-bold hidden lg:block ${isActive(link.path) ? 'text-gray-900' : ''}`}>
                {link.name}
              </span>
            </Link>
          ))}

          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center p-3 rounded-2xl transition-all 
                      text-gray-500 hover:bg-gray-50"
          >
            <PlusSquare size={24} />
            <span className="ml-4 font-bold hidden lg:block">
              Create
            </span>
          </button>
        </div>
        

        {/* Logout - Bottom of Sidebar on Desktop */}
        <div className="md:mt-auto md:flex md:w-full">
        <button 
          onClick={handleLogout}
          className="flex items-center p-3 rounded-2xl transition-all 
                    text-gray-500 hover:text-red-500 hover:bg-red-50"
        >
          <LogOut size={24} />
          <span className="ml-4 font-bold hidden lg:block">
            Logout
          </span>
        </button>
      </div>

      </div>
    </nav>
    <CreateModal isOpen={isCreateOpen} onClose={()=>setIsCreateOpen(false)} />
    </>
  );
};

export default Navbar;