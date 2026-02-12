import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "../services/chatService";

export const fetchConversations = createAsyncThunk("chat/fetchConversations",async (_, { rejectWithValue })=>{
    try {
      return await chatService.getConversations();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
})

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const messages = await chatService.getMessages(userId);
      return { userId, messages };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  conversations: [],
  activeChat: null,
  messages: {}, // { userId: [messages] }
  loading: false,
  error: null,
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload;
      },
      receiveNewMessage: (state, action) => {
      const message = action.payload;
      // We determine which conversation bucket to put the message in
      // If I am sending, it goes to receiver. If I am receiving, it goes to sender.
      const chatId = state.activeChat?._id === message.senderId 
        ? message.senderId 
        : message.receiverId;

      if (!state.messages[chatId]) {
        state.messages[chatId] = [];
      }
      state.messages[chatId].push(message);
    },
    clearError: (state) => {
      state.error = null;
    }
    },
    extraReducers: (builder) => {
    builder
      // Fetch Conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Messages
      .addCase(fetchMessages.fulfilled, (state, action) => {
        const { userId, messages } = action.payload;
        state.messages[userId] = messages;
      });
  },
})

export const { setActiveChat, receiveNewMessage, clearError } = chatSlice.actions;
export default chatSlice.reducer;