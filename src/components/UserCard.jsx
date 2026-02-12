import { useDispatch } from "react-redux";
import { setActiveChat } from "../redux/chatSlice";
import { useNavigate } from "react-router-dom";

const UserCard = ({ targetUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStartChat = () => {
    // 1. Set this user as the active chat in Redux
    dispatch(setActiveChat(targetUser));
    
    // 2. Redirect the user to the Chat page
    navigate("/chat");
  };

  return (
    <div className="p-4 border rounded shadow">
      <h3>{targetUser.username}</h3>
      <button 
        onClick={handleStartChat}
        className="bg-emerald-500 text-white px-4 py-2 rounded"
      >
        Message
      </button>
    </div>
  );
};