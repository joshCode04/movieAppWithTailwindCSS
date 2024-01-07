import imdb from "./imdb.png";
import tomato from "./tomato.jpeg";
import { useNavigate } from "react-router-dom";

export default function MovieCard({ movie }) {
  const imgUrl = "https://image.tmdb.org/t/p/original";
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/trailer/${movie.id}`);
  };
  return (
    <>
      <div
        className="w-[280px] mx-6 max-[688px]:w-[200px] max-[568px]:flex-grow  max-[1032px]:w-[270px] max-[1002px]:w-[260px] shadow-xl rounded-lg hover:scale-105 transition-transform duration-300"
        onClick={handleMovieClick}
      >
        <div className="absolute bg-[#0b1452] w-12 rounded-lg">
          <p className="text-white font-palanquin text-center">
            {movie.media_type}
          </p>

          {/* <span className="hearts">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.17157 5.48284C4.73367 3.96185 7.26633 3.96185 8.82842 5.48284L9.99999 6.62359L11.1716 5.48284C12.7337 3.96185 15.2663 3.96185 16.8284 5.48284C18.3905 7.00383 18.3905 9.46984 16.8284 10.9908L9.99999 17.6396L3.17157 10.9908C1.60948 9.46984 1.60948 7.00383 3.17157 5.48284Z"
                fill="#D1D5DB"
              />
            </svg>
          </span> */}
        </div>
        <div className="">
          <img
            className="rounded-xl hover:shadow-xl"
            src={`${imgUrl}/${movie.backdrop_path}`}
            alt="img"
          />
        </div>
        <div style={{ color: "white", paddingBottom: "20px" }}>
          <span style={{ color: "#9ca3af" }}>
            {movie.origin_country ? movie.origin_country : "No Origin Country"}
          </span>
          <h3 style={{ color: "white" }}>{movie.title || movie.name}</h3>
          <div className="flex gap-2">
            <div>
              <img className="h-5 w-11" src={imdb} alt="imdb" />
            </div>
            <p>86.0/100</p>
            <div>
              <img className="w-5 h-5" src={tomato} alt="tomato" />
            </div>
            <p>90%</p>
          </div>
        </div>
      </div>
    </>
  );
}
