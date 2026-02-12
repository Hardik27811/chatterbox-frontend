import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../redux/chatSlice";

const ChatSidebar = () => {
  const dispatch = useDispatch();
  const { conversations, activeChat, loading } = useSelector((state) => state.chat);

  if (loading) return <div className="p-4">Loading chats...</div>;

  return (
    <div className="w-1/3 border-r h-full bg-white flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Messages</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {conversations.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No conversations yet.</p>
        ) : (
          conversations.map((chat) => {
            // Adjust this logic based on your Backend response structure
            // If the backend returns a list of User objects directly:
            const chatPartner = chat; 
            
            return (
              <div
                key={chatPartner._id}
                onClick={() => dispatch(setActiveChat(chatPartner))}
                className={`flex items-center gap-3 p-3 cursor-pointer rounded-xl transition-all mb-1
                ${activeChat?._id === chatPartner._id 
                  ? "bg-emerald-50 border-l-4 border-emerald-500 shadow-sm" 
                  : "hover:bg-gray-50"}`}
              >
                {/* Avatar Circle */}
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold uppercase">
                  {chatPartner.name?.charAt(0) || "U"}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {chatPartner.username || chatPartner.name}
                    </h3>
                  </div>
                  {/* Optional: Add a 'Last Message' preview here if your slice has it */}
                  <p className="text-sm text-gray-500 truncate">Click to chat</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;