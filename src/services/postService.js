 import api  from "./api";

export const addPost = async(postData)=>{
    const res = await api.post('/post/add',postData);
    return res.data;
}

export const getAllPost = async()=>{
    const res = await api.get('/post/getAll');
    return res.data;
}

export const getMyPosts = async()=>{
    const res = await api.get('/post/getMyPosts');
    return res.data;
}

export const getPostById = async(postId)=>{
    const res = await api.get(`/post/${postId}`);
    return res.data;
}

export const updatePost = async(data)=>{
    const {postId , content} = data;
    const res = await api.put(`/post/${postId}updatePost`,{content});
    return res.data;
}

export const deletePost = async(postId)=>{
    const res = await api.delete(`/post/${postId}/deletePost`);
    return res.data;
}

export const likeUnlikePost = async(postId)=>{
    const res = await api.put(`/post/${postId}/likeUnlikePost`);
    return res.data;
}

export const addComment = async(data)=>{
    const {postId , text} = data;
    const res = await api.post(`/post/${postId}/addComment`,{text});
    return res.data;
}

export const deleteComment = async(data)=>{
    const {postId,commentId} = data;
    const res = await api.delete(`/post/${postId}/deleteComment/${commentId}`);
    return res.data;
}

export const editComment = async(data)=>{
    const {postId,commentId , text} = data;
    const res = await api.put(`/post/${postId}/editComment/${commentId}`,{text});
    return res.data;
}

const postService = {
    addPost,
    getAllPost,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost,
    likeUnlikePost,
    addComment,
    deleteComment,
    editComment,
}

export default postService;