import {io} from "socket.io-client";

const socket = io("https://chatterbox-backend-smpj.onrender.com",{
    withCredentials : true,
     transports: ["websocket"], 
});


export default socket;