import { Route , Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgetPassword from '../components/PasswordReset/ForgetPassword';
import ResetPassword from '../components/PasswordReset/ResetPassword'
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import CreatePost from '../components/Posts/CreateModal'
import Search from '../components/Search';
import PostCard from '../components/Posts/PostCard';
import SkeletonPost from '../components/Posts/SkeletonPost';

const AppRoutes = () => {
  return (
    <Routes>
      {/*Public route */}
      <Route path="/" element={<Landing />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgetpassword' element={<ForgetPassword/>}/>
      <Route path='/resetpassword/:resetToken' element={<ResetPassword/>}/>
      {/*private */}
      <Route element={<ProtectedRoute/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/create' element={<CreatePost/>}/>
        <Route path='/:id' element={<Profile/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/:id' element={<PostCard/>}/>
        <Route path='/skeleton' element={<SkeletonPost/>}/>
        
        {/* <Route/>
        <Route/>
        <Route/> */}

      </Route>
      <Route path='*' element={<NotFound/>}/>

    </Routes>
  )
}

export default AppRoutes