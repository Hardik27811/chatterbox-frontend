import { createSlice , createAsyncThunk } from "@reduxjs/toolkit"; 
//createAsyncThunk - auto handles "pending", "fulfilled", and "rejected" states. redux is sync
//createSlice - fn defines initial state and  "reducers" func that change state,

import authService from '../services/authService';
// import { data } from "react-router-dom"


export const loginUser = createAsyncThunk('/auth/login' , async(credentials,thunkauthAPI)=>{
    try {
        const data = await authService.login(credentials);
        // console.log("Thunk received from authService:", data);
        localStorage.setItem('token',data.token);
        return data; // This becomes the "payload"
    } catch (error) {
        return thunkauthAPI.rejectWithValue(error.response?.data?.message || 'Login failed');
    }
});


export const registerUser = createAsyncThunk('/auth/register',async(credentials,thunkauthAPI)=>{
    try {
        const data = await authService.register(credentials);
        localStorage.setItem('token',data.token);
        return data;
    } catch (error) {
        return thunkauthAPI.rejectWithValue(error?.response?.data?.message || 'Registration failed')
    }
})

export const forgotPassword = createAsyncThunk('/auth/forgotpassword',async(emailData,thunkauthAPI)=>{
    try {
        const data = await authService.forgetPassword(emailData);
        return data.message;
    } catch (error) {
        return thunkauthAPI.rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
})

export const resetPassword = createAsyncThunk('/auth/resetpassword',async(resetData,thunkAPI)=>{
    try {
        const res = await api.resetPassword(resetData);
        return data.message;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Reset failed');
    }
})

const authSlice = createSlice({
    name :'auth',
    initialState :{
        user : null,
        token : localStorage.getItem('token') || null ,
        loading : false,
        error : null,
        successMessage: null,
    },
    reducers:{
        clearState: (state)=>{
            state.error = null;
            state.successMessage = null;
        },
        logout: (state)=>{
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        }
    },
    extraReducers : (builder)=>{
        builder 
                //login
                .addCase(loginUser.pending , (state)=>{
                    state.loading = true;
                    state.error = null;
                })
                .addCase(loginUser.fulfilled , (state,action)=>{
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                })
                .addCase(loginUser.rejected , (state,action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
                //register
                .addCase(registerUser.pending ,(state)=>{
                    state.loading = true;
                    state.error = null;
                })
                .addCase(registerUser.fulfilled ,(state,action)=>{
                    state.loading = false;
                    state.user = action.payload.user;
                    state.token = action.payload.token;
                })
                .addCase(registerUser.rejected ,(state,action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
                //forgot
                .addCase(forgotPassword.pending,(state)=>{
                    state.loading = true;
                    state.error = null;
                })
                .addCase(forgotPassword.fulfilled,(state,action)=>{
                    state.loading = false;
                    state.successMessage = action.payload;
                })
                .addCase(forgotPassword.rejected,(state,action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
                //reset
                .addCase(resetPassword.pending,(action)=>{
                    action.loading = true;
                    action.error = null;
                })
                .addCase(resetPassword.fulfilled,(state,action)=>{
                    state.loading = false;
                    state.successMessage = action.payload;
                })
                .addCase(resetPassword.rejected,(state,action)=>{
                    state.loading = false;
                    state.error = action.payload;
                })
    }
})


export const {logout ,clearState } = authSlice.actions;
export default authSlice.reducer;