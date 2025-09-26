import { Link, Navigate } from "react-router-dom"
import { isLogin } from "../utils/isLogin"
import { useState } from "react";
import axios from "axios";

const Create = () => {

    const [title, setTitle] = useState<string>("")
    const [year, setYear] = useState<number | "">()
    const [rating, setRating] = useState("G");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    

    if (!isLogin()) {
    return <Navigate to="/login" replace />;
    }

    const handleSubmit = async(e:any) =>{
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const res = await axios.post("http://localhost:4000/movies",
                { title, year, rating },
                {headers: {Authorization: `Bearer ${token}`} } );
                if (res.data.status === "empty"){
                    setSuccess("")
                    setError(res.data.message)
                }
                if (res.data.status === "ok") {
                    setError("");
                    setSuccess(res.data.message);
                    setTitle("");
                    setYear("");
                    setRating("G");
                }
            } catch (err) {
                console.error(err)
            }
        }

  return (
    <div className="container mx-auto p-8">
        <Link to={'/movies'} className="inline-block mb-6 px-4 py-3 rounded-full font-medium transition cursor-pointer bg-slate-800 text-white hover:bg-slate-700">
        ← Back
        </Link>
        <h1 className="text-2xl font-bold mb-4">Create New Movie</h1>

        <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-700 text-white py-2 px-4 rounded mb-4">{error}</div>
        )}
        {success && (
          <div className="bg-green-600 text-white py-2 px-4 rounded mb-4">{success}</div>
        )}

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
        />
        <input
          type="number"
          placeholder="Enter Year"
          value={year}
          onChange={(e) => setYear(parseInt(e.target.value))}
          min={1}
          className="w-full border border-gray-300 rounded py-2 px-3 mb-4"
        />
        <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="w-full border border-gray-300 rounded py-2 px-3 mb-4">
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="M">M</option>
            <option value="MA">MA</option>
            <option value="R">R</option>
        </select>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded">
          Create
        </button>
      </form>
    </div>
  )
}

export default Create