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

export const getPostById = async(id)=>{
    const res = await api.get(`/post/${id}`);
    return res.data;
}

export const updatePost = async(id)=>{
    const res = await api.put(`/post/updatePost/${id}`);
    return res.data;
}

export const deletePost = async(id)=>{
    const res = await api.delete(`/post/deletePost/${id}`);
    return res.data;
}

export const likeUnlikePost = async(id)=>{
    const res = await api.put(`/post/likeUnlikePost/${id}`);
    return res.data;
}

const postService = {
    addPost,
    getAllPost,
    getMyPosts,
    getPostById,
    updatePost,
    deletePost,
    likeUnlikePost
}

export default postService;