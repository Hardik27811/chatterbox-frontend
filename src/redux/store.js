import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlice';
import postService from "../services/postService";

export const store = configureStore({
    reducer:{
        auth : authReducer,
        posts : postReducer,
    }
})