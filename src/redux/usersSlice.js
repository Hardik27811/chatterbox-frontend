import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../services/userService";
import { data } from "react-router-dom";

export const searchUsers = createAsyncThunk('/users/serach',async(query,thunkAPI)=>{
    try {
        const data = await userService.search(query);
        return data.users
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
})

const userSlice = createSlice({
    name : 'users',
    initialState :{
        data :[],
        loading :false,
        error : null
    },
    reducers:{
        clearUserError: (state) => {
            state.error = null;
        }
    },
    extraReducers:(builder)=>{
        builder 
                .addCase(searchUsers.pending,(state)=>{
                    state.loading = true;
                    state.error = null;
                })
                .addCase(searchUsers.fulfilled,(state,action)=>{
                    state.loading = false;
                    // console.log(action.payload);
                    
                    state.data = action.payload;
                })
                .addCase(searchUsers.rejected,(state,action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
    }
})

export default userSlice.reducer;