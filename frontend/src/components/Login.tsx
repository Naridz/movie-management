import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { isLogin } from "../utils/isLogin";

const Login = () => {

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<string>("")

  if (isLogin()) {
    return <Navigate to="/movies" replace />;
  }

  const handleSubmit = async (e:any) =>{
    e.preventDefault()

    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        username,
        password,
      });

      if (res.data.status === "empty" || res.data.status === "error") {
        setError(res.data.message);
        return;
      }
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Login success");
      window.location.href = "/movies";
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex-grow">
      <div className="flex justify-center item-center">
        <div className="w-[400px] shadow-xl p-10 mt-5 rounded-xl">
          <h3 className="text-2xl">Login</h3>
          <hr className="my-3 text-gray-200" />
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-600 w-fit text-white text-sm py-1 px-3 mt-2 rounded-md">
                {error}
              </div>
            )}
            <input
              type="text"
              className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white border py-2 px-3 my-2 rounded text-lg"
            >
              Sign In
            </button>
            <hr className="my-3 text-gray-200" />
            <p>
              <Link className="text-blue-700 hover:underline" to="/register">
                Create new account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;