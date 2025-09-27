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

  const [movies,setMovies] = useState<Movie[]>([])

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
    <div className="container mx-auto p-4">
      <button className="my-5">
          <Link className="bg-sky-600 text-white py-3 px-4 rounded-full hover:bg-sky-700 transition" to={"/create"}>Add Movie</Link>
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
        {movies.length ===0 && <p>no movie.</p>}
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <p className="text-sm text-gray-600">Year : {movie.year}</p>
            <p className="text-sm text-gray-600">Rating : {movie.rating}</p>

            <div className="flex justify-between items-center mt-4">
              <Link
                to={`/edit/${movie.id}`}
                className="border text-blue-600 py-3 px-4 rounded-full hover:text-white hover:bg-blue-600 transition">
                Edit
              </Link>

              {isManager && (
                <button
                  onClick={() => handleDelete(movie.id)}
                  className="border text-red-600 py-3 px-4 rounded-full hover:text-white hover:bg-red-600 transition">
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Movies