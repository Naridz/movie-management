import { Link, useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg';
import { useEffect, useState } from 'react';

const Navbar = () => {

  const [isLog,setIsLog] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLog(!!token);
  }, []);

  const handleLogout = (e:any) =>{
    e.preventDefault();
    alert("Logout")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLog(false)
    navigate('/login')
  }

  return (
    <nav className="bg-white shadow-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to={"/"} className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
              <img src={reactLogo} alt="React Logo" className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Movie
            </span>
          </Link>
          
          <div className="flex items-center gap-3">
            {!isLog ? (
              <>
                <Link 
                  to="/login" 
                  className="px-5 py-2 text-slate-700 font-medium hover:text-slate-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/movies" 
                  className="px-5 py-2 text-slate-700 font-medium hover:text-slate-900 transition-colors flex items-center gap-2"
                >
                  <span>🎬</span>
                  Movies
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                >
                  <span>🚪</span>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar