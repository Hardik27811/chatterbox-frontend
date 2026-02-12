import api from './api'

export const search = async(query)=>{
    const res = await api.post(`/users/search?query=${query}`) // config allows you to pass extra information along with your HTTP request.
    // console.log(res.data);
    
    return res.data;
} 

const userService={
    search,
}

export default userService;