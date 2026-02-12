import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import ChatService from "../services/chatService"; // Import the service
import { receiveNewMessage, fetchConversations } from "../redux/chatSlice";

const Chat = () => {
  
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (!user?._id) return;

    // join the socket room using the service
    ChatService.joinRoom(user._id);

    // fetch all conversations when the page loads
    dispatch(fetchConversations());

    // listen for incoming messages via service
    ChatService.listenForMessages((data) => {
      // use the new action name from our updated slice
      dispatch(receiveNewMessage(data));
    });

    // cleanup on unmount
    return () => {
      ChatService.removeMessageListener();
    };
  }, [dispatch, user?._id]);

  return (
    <div className="flex h-screen bg-gray-50">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
}

export default Chat


