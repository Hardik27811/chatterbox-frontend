import { Navigate ,Outlet} from "react-router-dom";

// const ProtectedRoute = ({children})=>{
//     const token = localStorage.getItem('token');
//     return token ? children : <Navigate to={'/login'} replace />
// }
import Navbar from "./Navbar";

const ProtectedRoute = ()=>{

    const token = localStorage.getItem('token');
    return (
    <div className="min-h-screen bg-gray-50">
    <Navbar/>
    
    <main className="pb-20 md:pb-0 md:pl-20 lg:pl-64 transition-all duration-300">
  
  <div>
   { token ? <Outlet/> : <Navigate to='/login' replace /> }
   </div>

   </main>
    </div>)
}

export default ProtectedRoute;