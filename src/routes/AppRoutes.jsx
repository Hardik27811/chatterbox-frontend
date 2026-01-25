import { Route , Routes } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgetPassword from '../components/PasswordReset/ForgetPassword';
import ResetPassword from '../components/PasswordReset/ResetPassword'
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';

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
      </Route>
      <Route path='*' element={<NotFound/>}/>

    </Routes>
  )
}

export default AppRoutes