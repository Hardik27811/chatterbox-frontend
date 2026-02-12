import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
const Sidebar = () => {
  const {user} = useSelector((stata)=> stata.auth);
  const id = user?.name
  const nav = useNavigate();
  // console.log(user);
  
  return (
    <>
   <div className='lg:hidden md:hidden fixed top-0 left-0 w-full p-4 font-black text-xl text-emerald-600 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50'>
        Chatterbox
      </div>
    <div className='w-full lg:flex justify-end-safe items-start gap-3 p-3 pr-60 hidden cursor-pointer lg:block md:block md:flex md:pr-30 '
    onClick={()=> nav(`/${id}/`) }
    >
      <div className='w-13 h-13 bg-emerald-100 text-center border-2 flex items-center justify-center rounded-full text-emerald-600 font-bold p-2'
      
      >
        {user?.name?.charAt(0) ||"U"}
        
      </div>
      <span className='text-sm mt-4'>{user?.name}</span>
     
    </div>
    </>
  )
}

export default Sidebar