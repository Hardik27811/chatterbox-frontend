import api from "./api";


export const login = async(credentials)=>{
    const res = await api.post('/auth/login',credentials);
    return res.data; //Thunk will receive this as 'action.payload'
}

export const register = async(credentials)=>{
    const res = await api.post('/auth/register',credentials);
    return res.data;
}

export const forgetPassword = async(emailData)=>{
    const {email} = emailData;
    const res = await api.post('/auth/forgotpassword',{email});
    return res.data;
}
export const resetPassword = async(credentials)=>{
    
    const {resetToken,password} = credentials;
    // console.log("URL TOKEN:", resetToken);
    const res = await api.put(`/auth/resetpassword/${resetToken}`,{password});
    return res.data;
}

const authService = {
    login,
    register,
    forgetPassword,
    resetPassword
};

export default authService;