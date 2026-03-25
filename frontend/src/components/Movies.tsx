import { Link, Navigate } from "react-router-dom"
import { isLogin } from "../utils/isLogin"
import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  year: number;
  rating: string;
}

const Movies = () => {

  const [movies, setMovies] = useState<Movie[]>([])

  if (!isLogin()) {
    return <Navigate to="/login" replace />;
  }

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")!);
  const isManager = user?.role === "MANAGER";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:4000/movies", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMovies(res.data.movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure ?")) return;

    try {
      await axios.delete(`http://localhost:4000/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(movies.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <span className="text-white text-xl font-bold">🎬</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Movie Collection
            </h1>
          </div>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <span className="text-lg">+</span>
            Add Movie
          </Link>
        </div>

        {movies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="p-6 bg-slate-100 rounded-full mb-4">
              <span className="text-4xl">🎬</span>
            </div>
            <p className="text-xl text-slate-500 font-medium">No movies found</p>
            <p className="text-slate-400 mt-2">Start by adding your first movie to the collection</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-slate-300"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {movie.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-500">Year:</span>
                      <span className="text-sm text-slate-700 font-semibold">{movie.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-500">Rating:</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                        {movie.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/edit/${movie.id}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <span>✏️</span>
                      Edit
                    </Link>

                    {isManager && (
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                      >
                        <span>🗑️</span>
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Movies