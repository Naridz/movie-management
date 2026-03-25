import { Navigate, useNavigate, useParams } from "react-router-dom";
import { isLogin } from "../utils/isLogin";
import { useEffect, useState } from "react";
import axios from "axios";

const Edit = () => {

  const {id} = useParams()
  const navigate = useNavigate();

  const [title, setTitle] = useState("")
  const [year, setYear] = useState<number>();
  const [rating, setRating] = useState("G");

  if (!isLogin()) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
  const fetchMovie = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:4000/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const movie = res.data.movie;
      setTitle(movie.title);
      setYear(movie.year);
      setRating(movie.rating);
    } catch (err) {
      console.error(err);
    }
  };
  fetchMovie();
  }, [id]);

  const handleSubmit = async (e:any) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    await axios.put(`http://localhost:4000/movies/${id}`,
      { title, year, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    alert("Updated successfully");
    navigate("/movies");
  } catch (err) {
    console.error(err);
    alert("Error updating movie.");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-slate-600 hover:text-slate-800 font-medium transition-colors"
        >
          <span className="text-lg">←</span>
          Back
        </button>
        
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-green-500 to-blue-600"></div>
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg">
                <span className="text-white text-xl font-bold">✏️</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Edit Movie
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Movie Title</label>
                <input
                  type="text"
                  placeholder="Enter movie title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Release Year</label>
                <input
                  type="number"
                  placeholder="Enter release year"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="G">G - General Audiences</option>
                  <option value="PG">PG - Parental Guidance</option>
                  <option value="M">M - Mature</option>
                  <option value="MA">MA - Mature Accompanied</option>
                  <option value="R">R - Restricted</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200"
                >
                  Update Movie
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 py-3 px-6 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;