import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChatService from "../../services/chatService"; // Import the service
import { receiveNewMessage } from "../../redux/chatSlice"; // Using the updated action name

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { activeChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSendMessage = () => {
    if (!message.trim() || !activeChat) return;

    const msgData = {
      senderId: user._id,
      receiverId: activeChat._id,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    // send via Socket Service
    ChatService.sendMessage(msgData);

    // update local Redux state immediately (Optimistic UI)
    dispatch(receiveNewMessage(msgData));

    // clear input
    setMessage("");
  };

  // allow sending by pressing the "Enter" key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-4 border-t bg-white flex items-center gap-3">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-1 border border-gray-300 p-3 rounded-full focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
      />
      
      <button
        onClick={handleSendMessage}
        disabled={!message.trim()}
        className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 text-white p-3 rounded-full transition-colors flex items-center justify-center"
      >
        {/* Simple Send Icon (SVG) */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;