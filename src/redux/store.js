import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice';
import postReducer from '../redux/postSlice';
import userReducer from '../redux/usersSlice';
import chatReducer from '../redux/chatSlice';

export const store = configureStore({
    reducer:{
        auth : authReducer,
        posts : postReducer,
        users : userReducer,
        chat : chatReducer,
    }
})