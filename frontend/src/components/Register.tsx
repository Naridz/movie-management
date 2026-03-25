import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { isLogin } from "../utils/isLogin";

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [role, setRole] = useState<string>("FLOORSTAFF");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  
  if (isLogin()) {
    return <Navigate to="/movies" replace />;
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirm) {
      setSuccess("");
      setError("Password not match");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/auth/register", {
        username,
        password,
        role,
      });
      if (res.data.status === "exist") {
        setSuccess("");
        setError(res.data.message);
        return;
      }
      if (res.data.status === "empty") {
        setSuccess("");
        setError(res.data.message);
        return;
      }
      if (res.data.status === "ok") {
        setError("");
        setSuccess(res.data.message);
        setUsername("");
        setPassword("");
        setConfirm("");
      } else {
        setError("Register failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-green-500 to-blue-600"></div>
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl shadow-lg mb-4">
                <span className="text-white text-2xl font-bold">👤</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Create Account
              </h1>
              <p className="text-slate-500">Join our movie management system</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <span className="text-red-500 text-xl">⚠️</span>
                  <span className="text-red-700 font-medium">{error}</span>
                </div>
              )}
              {success && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <span className="text-green-500 text-xl">✅</span>
                  <span className="text-green-700 font-medium">{success}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="FLOORSTAFF">🎥 Floor Staff</option>
                  <option value="TEAMLEADER">👥 Team Leader</option>
                  <option value="MANAGER">👔 Manager</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;