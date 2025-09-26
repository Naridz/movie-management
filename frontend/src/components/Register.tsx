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
    <div className="flex-grow">
      <div className="flex justify-center item-center">
        <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
          <h3 className="text-2xl">Sign Up</h3>
          <hr className="my-3 text-gray-200" />
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md">
                {success}
              </div>
            )}
            <input
              type="text"
              className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <select
              className="w-full bg-gray-200 py-2 px-3 rounded my-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="FLOORSTAFF">FLOORSTAFF</option>
              <option value="TEAMLEADER">TEAMLEADER</option>
              <option value="MANAGER">MANAGER</option>
            </select>

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white border py-2 px-3 my-2 rounded text-lg"
            >
              Sign Up
            </button>
            <hr className="my-3 text-gray-200" />
            <p>
              <Link className="text-blue-700 hover:underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;