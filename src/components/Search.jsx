import React, { useState , useEffect} from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { Search as SearchIcon, MessageCircle } from 'lucide-react';
import { searchUsers } from '../redux/usersSlice';
import { setActiveChat } from '../redux/chatSlice';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState('');
    // const [data, setdata] = useState([]);
    const {data} = useSelector((state)=>state.users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(()=>{
        const timer = setTimeout(()=>{
            if(query.trim()){
               dispatch(searchUsers(query))
                // console.log("Searching for:", query);
            }
        },800)
        return ()=>clearTimeout(timer);
    },[dispatch,query])
    // console.log(data);

    // starts the chat and redirects
    const handleStartChat = (user) => {
        dispatch(setActiveChat(user)); // Set the selected user in Redux
        navigate('/chat'); // Redirect to the Chat page
    };
    
  return (
    <div className="w-full max-w-2xl mx-auto p-4 ">
        <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <SearchIcon size={20} />
            </div>
            <input type="text"
                placeholder="Search users by name or email..."
                value={query}
                onChange={(e)=>setQuery(e.target.value)}
                className="w-full bg-gray-100 border-none rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all outline-none text-lg shadow-sm"
            />
        </div>
       

       <div className="space-y-4">
            {query && (
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider px-2">
                        Results
                    </h3>
            )}
            {data.length > 0 ? (
                    data.map((u) => (
                        <div key={u._id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-gray-100">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                                    {u.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{u.name}</p>
                                    <p className="text-sm text-gray-400">{u.email}</p>
                                </div>
                            </div>
                            {/* <button className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all active:scale-95"
                            // onClick={}
                            >
                                View Profile
                            </button> */}
                            {/* Integrated "Message" Button */}
                        <button 
                            onClick={() => handleStartChat(u)}
                            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-all active:scale-95"
                        >
                            <MessageCircle size={16} />
                            Message
                        </button>
                        </div>
                    ))
                ) : query.trim() !== '' ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400">No users found matching "{query}"</p>
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-300">
                        <SearchIcon size={48} className="mx-auto mb-4 opacity-20" />
                        <p>Search for your friends on Chatterbox</p>
                    </div>
                )}
        </div>
    </div>
  )
}

export default Search