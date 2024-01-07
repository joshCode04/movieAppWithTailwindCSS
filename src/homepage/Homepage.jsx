import { useNavigate } from "react-router-dom";
import imdb from "./imdb.png";
import tomato from "./tomato.jpeg";
import spinner from "./Spinner.svg";
import { useState, useEffect } from "react";
import SearchResults from "../secondPage/SearchResult";

// ... (imports)

export default function HomepageContent() {
  const [movies, setMovies] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    setSelectedMovieId(id);
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2VjYzliMzhmZTY1MTU2YzExYjA3YTA4ZjNhMjllZCIsInN1YiI6IjY1MDA0NDJjZmZjOWRlMGVlM2M1ZDc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K3FkBDQlRThV_YEw0WQ_17jdPNuAptkzU32vZnOxeXo",
    },
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/all/day?language=en-US",
        options
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="main-content-container">
        {movies.length > 0 && (
          <MovieCarousel
            selectedMovieId={selectedMovieId}
            onSelectMovie={handleSelectMovie}
            movies={movies}
          />
        )}
      </div>
    </>
  );
}

export function Loader() {
  return (
    <div className="spinner">
      <img className="spin" src={spinner} alt="spinner" />
    </div>
  );
}

const MovieCarousel = ({ movies, selectedMovieId, onSelectMovie }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [movies.length]);

  const currentMovie = movies[currentIndex];

  const handleButtonClick = (movieId) => {
    onSelectMovie(movieId);
    navigate(`/trailer/${movieId}`);
  };
  console.log(handleButtonClick);

  return (
    <>
      <div className="m-3 relative font-montserrat">
        <img
          className="rounded-xl w-full h-full object-cover"
          src={
            window.innerWidth <= 600
              ? `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`
              : `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
          }
          alt="pics"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-transparent opacity-50 rounded-xl"></div>
        <div className="absolute top-36 flex flex-col items-center p-4 text-white">
          <h1 className="max-md:text-4xl max-sm:text-2xl text-6xl font-semibold mb-2 font-montserrat ">
            {currentMovie.name} || {currentMovie.title}
          </h1>
        </div>
        <div className="absolute top-[220px] flex items-center p-4 text-white space-x-2">
          <div className="flex items-center">
            <img className="w-6 h-3" src={imdb} alt="imdb" />
            <p className="text-sm">86.0/100</p>
          </div>
          <div className="flex items-center">
            <img className="w-4 h-4" src={tomato} alt={tomato} />
            <p className="text-sm">90%</p>
          </div>
        </div>
        <div className="lg:absolute lg:top-[290px] lg:pl-8 lg:w-[500px] ">
          <p className="text-white text-lg mt-4">{currentMovie.overview}</p>
        </div>
        {/* <button
        className="trailer-button"
        onClick={() => handleButtonClick(currentMovie.id)}
      >
        <span className="trailer-icon">
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
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM9.5547 7.16795C9.24784 6.96338 8.8533 6.94431 8.52814 7.11833C8.20298 7.29235 8 7.63121 8 8V12C8 12.3688 8.20298 12.7077 8.52814 12.8817C8.8533 13.0557 9.24784 13.0366 9.5547 12.8321L12.5547 10.8321C12.8329 10.6466 13 10.3344 13 10C13 9.66565 12.8329 9.35342 12.5547 9.16795L9.5547 7.16795Z"
              fill="white"
            />
          </svg>
        </span>
        Wacth Trailer
      </button> */}
        {selectedMovieId === currentMovie.id && (
          <div style={{ display: "none" }}>
            <SearchResults selectedMovieId={currentMovie.id} />
          </div>
        )}
      </div>
    </>
  );
};
