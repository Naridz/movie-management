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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link 
          to="/movies" 
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-slate-600 hover:text-slate-800 font-medium transition-colors"
        >
          <span className="text-lg">←</span>
          Back to Movies
        </Link>
        
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <span className="text-white text-xl font-bold">+</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Create New Movie
              </h1>
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
                <label className="text-sm font-semibold text-slate-700">Movie Title</label>
                <input
                  type="text"
                  placeholder="Enter movie title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Release Year</label>
                <input
                  type="number"
                  placeholder="Enter release year"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  min={1}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="G">G - General Audiences</option>
                  <option value="PG">PG - Parental Guidance</option>
                  <option value="M">M - Mature</option>
                  <option value="MA">MA - Mature Accompanied</option>
                  <option value="R">R - Restricted</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
              >
                Create Movie
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Create