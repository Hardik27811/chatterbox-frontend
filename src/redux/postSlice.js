import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import postService from "../services/postService";



export const addUserPost = createAsyncThunk('/post/add',async(postData,thunkAPI)=>{
    try {
        const data = await postService.addPost(postData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add post');
    }
})

export const fetchAllPosts = createAsyncThunk('/post/getAll',async(_,thunkAPI)=>{
    try {
        const data = await postService.getAllPost();
        return data.posts;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch posts');
    }
})

export const fetchMyPosts = createAsyncThunk('/post/getMyPosts',async(_,thunkAPI)=>{
    try {
        const data = await postService.getMyPosts();
        console.log(data);
        
        return data.userposts;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch YourPosts');
    }
})

export const fetchPostByTd = createAsyncThunk('/post',async(idData,thunkAPI)=>{
    try {
        const data = await postService.getPostById(idData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add post');
    }
})

export const updateUserPost = createAsyncThunk('/post/updatePost',async(idData,thunkAPI)=>{
    try {
        const data = await postService.updatePost(idData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update post');
    }
})

export const deleteUserPost = createAsyncThunk('/post/deletePost',async(idData,thunkAPI)=>{
    try {
        const data = await postService.deletePost(idData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete post');
    }
})

export const likeUnlikeUserPost = createAsyncThunk('/post/likeUnlikePost',async(idData,thunkAPI)=>{
    try {
        const data = await postService.likeUnlikePost(idData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to like/Unlike post');
    }
})

export const addUserComment = createAsyncThunk('/post/addComment',async(idData,thunkAPI)=>{
    try {
        const data = await postService.addComment(idData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to add comment');
    }
})

export const deleteUserComment = createAsyncThunk('/post/deleteComment',async(idData,thunkAPI)=>{
    try {
        const data = await postService.deleteComment(idData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to delete comment');
    }
})

export const editUserComment = createAsyncThunk('/post/editComment',async(idData,thunkAPI)=>{
    try {
        const data = await postService.editComment(idData);
        return data.post;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
})

const updatePostInArray = (array, updatedPost) => {
    const index = array.findIndex((p) => p._id === updatedPost._id);
    if (index !== -1) {
        array[index] = updatedPost;
    }
};

const postSlice = createSlice({
    name :"posts",
    initialState:{
        posts:[],
        myPosts: [],
        loading : false,
        error : null,
    },
    reducers:{
        clearPostError: (state) => {
            state.error = null;
        }
    },
    extraReducers :(builder)=>{
        builder
            //allposts
            .addCase(fetchAllPosts.pending, (state) => { 
                state.loading = true; 
            })
            .addCase(fetchAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Post
            .addCase(addUserPost.fulfilled, (state, action) => {
                // Add the new post to the top of the feed immediately
                state.posts.unshift(action.payload);
                state.myPosts.unshift(action.payload);
            })
            //likeUnlike
            .addCase(likeUnlikeUserPost.fulfilled, (state, action) => {
                updatePostInArray(state.posts, action.payload);   // Update Feed bucket
                updatePostInArray(state.myPosts, action.payload); // Update Profile bucket
            })
            // Delete Post
            .addCase(deleteUserPost.fulfilled, (state, action) => {
                // Remove the deleted post from the UI array
                state.posts = state.posts.filter((p) => p._id !== action.payload._id);
                state.myPosts = state.myPosts.filter((p) => p._id !== action.payload._id);
            })
            // My Posts
            .addCase(fetchMyPosts.pending, (state) => {
                    state.loading = true;
                })
            .addCase(fetchMyPosts.fulfilled, (state, action) => {
                state.loading = false;
                    state.myPosts = action.payload;
                } 
            )
            .addCase(fetchMyPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            //add Comment
            .addCase(addUserComment.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(addUserComment.fulfilled, (state, action) => {
                state.loading = false;
                updatePostInArray(state.posts, action.payload);   // Update Feed
                updatePostInArray(state.myPosts, action.payload); // Update Profile
            })
            //delete comment
           .addCase(deleteUserComment.fulfilled, (state, action) => {
                state.loading = false;
                updatePostInArray(state.posts, action.payload);   // Update Feed
                updatePostInArray(state.myPosts, action.payload); // Update Profile
            })
            //editcomment
             .addCase(editUserComment.pending,(state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(editUserComment.fulfilled, (state, action) => {
            state.loading = false;
            updatePostInArray(state.posts, action.payload);   // Update Feed
            updatePostInArray(state.myPosts, action.payload); // Update Profile
        })
    }
})

export const { clearPostError } = postSlice.actions;
export default postSlice.reducer;