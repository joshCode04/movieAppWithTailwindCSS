import Trailer from "./trailer.jsx";
import { useNavigate } from "react-router-dom";

function SearchResults({ selectedMovieId }) {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(-1);
  };
  return (
    <div className="movie1">
      <div className="flex justify-between mx-4 p-3">
        <button onClick={handleButtonClick} className="" style={{}}>
          <span className="text-3xl hover:scale-90 transition-transform">
            <ion-icon name="chevron-back-circle-outline"></ion-icon>
          </span>
          <span className="hover:underline text-2xl">Go back</span>
        </button>

        <div className="flex">
          <div className="icon-container">
            <span className="text-3xl">
              <ion-icon name="film-outline"></ion-icon>
            </span>
          </div>
          <h3 className="text-2xl">FilmFusion</h3>
        </div>
      </div>
      <Trailer selectedMovieId={selectedMovieId} />
    </div>
  );
}

export default SearchResults;
