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
    <div className="container mx-auto p-8">
      <button
        onClick={() => navigate(-1)} className="inline-block mb-6 px-4 py-3 rounded-full font-medium transition cursor-pointer bg-slate-800 text-white hover:bg-slate-700">
        ← Back
      </button>
      <hr className="my-3" />
      <h3 className="text-xl">Edit post</h3>
      <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
            type="number"
            className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value))}/>
            <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full bg-gray-200 py-2 px-3 rounded text-lg my-2">
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="M">M</option>
              <option value="MA">MA</option>
              <option value="R">R</option>
              </select>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-800 text-white border py-2 px-5 mt-2 rounded-md text-lg">
              Update
            </button>
          </form>
    </div>
  );
};

export default Edit;