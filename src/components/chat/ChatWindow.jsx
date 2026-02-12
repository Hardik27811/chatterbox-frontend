import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import { fetchMessages } from "../../redux/chatSlice";

const ChatWindow = () => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null); // rference for auto-scrolling
  
  const { activeChat, messages, loading } = useSelector(state => state.chat);
  const { user } = useSelector(state => state.auth);

  // fetch message history whenever activeChat changes
  useEffect(() => {
    if (activeChat?._id) {
      dispatch(fetchMessages(activeChat._id));
    }
  }, [activeChat?._id, dispatch]);

  // auto-scroll to bottom whenever messages update
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat?._id]);

  if (!activeChat) {
    return (
      <div className="w-2/3 flex items-center justify-center bg-gray-50 text-gray-400 italic">
        Select a conversation to start chatting
      </div>
    );
  }

  const chatMessages = messages[activeChat._id] || [];

  return (
    <div className="w-2/3 flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3 bg-white sticky top-0 z-10">
        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
          {activeChat.name?.charAt(0)}
        </div>
        <span className="font-bold text-lg text-gray-800">{activeChat.name}</span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#f0f2f5]">
        {loading && chatMessages.length === 0 ? (
          <p className="text-center text-gray-500">Loading messages...</p>
        ) : (
          chatMessages.map((msg, index) => {
            const isMe = msg.senderId === user._id;
            return (
              <div
                key={index}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl shadow-sm ${
                    isMe
                      ? "bg-emerald-500 text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className={`text-[10px] block mt-1 ${isMe ? "text-emerald-100" : "text-gray-400"}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            );
          })
        )}
        {/* invisible div that we scroll into view */}
        <div ref={scrollRef} />
      </div>

      {/* Input Area */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;