import { useState } from "react";
import { Loader } from "./Homepage";
import images from "./images.jpeg";
import SearchResults from "../secondPage/SearchResult";
import { useNavigate } from "react-router-dom";

export default function SearchContainer() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer d3ecc9b38fe65156c11b07a08f3a29ed",
    },
  };

  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleCancel = () => {
    // Clear search results
    setSearchResults([]);
    setSearchInitiated(false);
    setIsSearching(false);
    setSearchInput("");
  };

  const handleSearch = async (query) => {
    setIsSearching(true);
    setSearchInitiated(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=d3ecc9b38fe65156c11b07a08f3a29ed`,
        options
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setTimeout(() => {
        setIsSearching(false);
      }, 2000);

      const data = await response.json();
      console.log(data);
      setSearchResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
    setSelectedMovieId(id);
  }

  return (
    <>
      <div className="relative flex items-center justify-between p-3 mb-[-75px] z-10 font-montserrat text-[18px] mx-2 max-sm:justify-evenly">
        <div className="flex gap-2">
          <div className="bg-[#2f2abc] p-1 rounded-full items-center">
            <ion-icon name="film-outline"></ion-icon>
          </div>
          <div>
            <h3 className="max-sm:hidden text-slate-200">FilmFusion</h3>
          </div>
        </div>

        <Search
          handleSearch={handleSearch}
          setSearchInitiated={setSearchInitiated}
          setSearchInput={setSearchInput}
          searchInput={searchInput}
        />
        {isSearching && <Loader />}
        {searchInitiated && (
          <>
            <button onClick={() => handleSearch("spiderman")} className="z-50">
              <ion-icon name="search-outline"></ion-icon>
            </button>
            <button
              className="bg-red-500 absolute w-8 h-8 rounded-full right-2 z-50"
              onClick={handleCancel}
            >
              X
            </button>
          </>
        )}

        <div className="flex gap-2">
          <div className="right-text">
            <h3 className="max-sm:hidden text-slate-200">Sign in</h3>
          </div>
          <div className="bg-[#2f2abc] p-1 rounded-full items-center">
            <ion-icon name="reorder-two-outline"></ion-icon>
          </div>
        </div>
      </div>
      <div className="underline"></div>
      <MovieList
        searchResults={searchResults}
        onSelectMovie={handleSelectMovie}
        selectedMovieId={selectedMovieId}
      />
    </>
  );
}

function Search({
  handleSearch,
  setSearchInitiated,
  searchInput,
  setSearchInput,
}) {
  return (
    <input
      type="text"
      className="max-md:w-72 w-96 p-2 bg-transparent border-blue-500 border-2 rounded-full"
      placeholder="What do you want to watch?"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          handleSearch(e.target.value);
          setSearchInitiated(true);
        }
      }}
    />
  );
}
function MovieList({ searchResults, onSelectMovie, selectedMovieId }) {
  return (
    <div className="mx-36 overflow-y-scroll h-[650px] mt-3 max-md:mx-12 absolute z-10 bg-slate-400 custom-scrollbar">
      <ul className="flex gap-8 justify-center flex-wrap">
        {searchResults.map((movie) => (
          <Movie
            key={movie.id}
            id={movie.id}
            title={movie.title}
            releaseDate={movie.release_date}
            overview={movie.overview}
            posterPath={movie.poster_path}
            onSelectMovie={onSelectMovie}
            isSelected={selectedMovieId === movie.id}
          />
        ))}
      </ul>
    </div>
  );
}

export function Movie({
  id,
  title,
  releaseDate,
  // eslint-disable-next-line no-unused-vars
  overview,
  posterPath,
  onSelectMovie,
  isSelected,
  // eslint-disable-next-line no-unused-vars
  selectedMovieId,
}) {
  const navigate = useNavigate();

  const handleMovieClick = (movieId) => {
    // Call the onSelectMovie function with the movie id
    onSelectMovie(id);
    navigate(`/trailer/${movieId}`);
  };

  return (
    <li
      className="w-40 shadow-xl rounded-lg hover:scale-105 transition-transform duration-300 max-[412px]:w-28 max-[412px]:mx-1"
      onClick={() => handleMovieClick(id)}
    >
      <img
        className="rounded-t-lg"
        src={
          posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : images
        }
        alt={title}
      />

      <h3>{title}</h3>
      <div style={{ display: "flex" }}>
        <span style={{ fontSize: "10.4px" }}>Release Date:</span>
        <span style={{ fontSize: "10.4px" }}>{releaseDate}</span>
      </div>
      {isSelected && (
        <div style={{ display: "none" }}>
          <SearchResults selectedMovieId={id} />
        </div>
      )}
    </li>
  );
}
