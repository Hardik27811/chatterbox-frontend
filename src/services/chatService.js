import api from './api';
import socket from '../utils/socket';

const getConversations = async () => {
  const res = await api.get("/chat/conversations");
  return res.data;
};

const getMessages = async (userId) => {
  const res = await api.get(`/chat/messages/${userId}`);
  return res.data;
};


const joinRoom = (userId) => {
    console.log("Emitting join for:", userId);
  socket.emit("join", userId);
};

const sendMessage = (data) => {
  socket.emit("send_message", data);
};

const listenForMessages = (callback) => {
  socket.off("receive_message"); 
  socket.on("receive_message", (data) => {
    console.log("Message received via socket:", data);
    callback(data);
  });
};

const removeMessageListener = () => {
  socket.off("receive_message");
};

export default {
  getConversations,
  getMessages,
  joinRoom,
  sendMessage,
  listenForMessages,
  removeMessageListener,
};