import { useEffect, useState } from "react";
import "./homepage/Search.jsx";
import SearchContainer from "./homepage/Search.jsx";
import "./homepage/Homepage.jsx";
import HomepageContent from "./homepage/Homepage.jsx";
import MovieCard from "./homepage/Movie.jsx";
import Feature from "./homepage/feature.jsx";
import Footer from "./homepage/footer.jsx";
import { Route, Routes } from "react-router-dom";
import SearchResults from "./secondPage/SearchResult.jsx";
import background from "./homepage/background.jpeg";
// import Trailer from "./secondPage/trailer.jsx";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2VjYzliMzhmZTY1MTU2YzExYjA3YTA4ZjNhMjllZCIsInN1YiI6IjY1MDA0NDJjZmZjOWRlMGVlM2M1ZDc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K3FkBDQlRThV_YEw0WQ_17jdPNuAptkzU32vZnOxeXo",
  },
};

function App() {
  return (
    <Routes>
      <Route path="" element={<AllApp />} />
      <Route path="/searchInput" element={<SearchResults />} />
      <Route path="/trailer/:movieId" element={<SearchResults />} />
    </Routes>
  );
}
function AllApp() {
  return (
    <div className="">
      <div className="homepage-title" style={{ background: { background } }}>
        <section className="font-montserrat">
          <SearchContainer />
        </section>
        <section>
          <HomepageContent />
        </section>
        <section>
          <Feature />
        </section>
        <section>
          <Card />
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </div>
  );
}

export default App;

export function Card() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          options
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setMovies(data.results.slice(8));
        console.log(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to run once on component mount

  return (
    <div className="flex flex-wrap w-full max-md:mx-50 sm:gap-4 gap-14 max-[688px]:justify-evenly max-[568px]:justify-center">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
