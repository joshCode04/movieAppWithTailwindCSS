import { useEffect, useState } from "react";
import img from "./trailer.jpeg";
// eslint-disable-next-line no-unused-vars
import play from "./play.png";
import { useParams } from "react-router-dom";
import Youtube from "react-youtube";

export default function Trailer() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  // const options = {
  //   method: "GET",
  //   headers: {
  //     accept: "application/json",
  //     Authorization:
  //       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkM2VjYzliMzhmZTY1MTU2YzExYjA3YTA4ZjNhMjllZCIsInN1YiI6IjY1MDA0NDJjZmZjOWRlMGVlM2M1ZDc4OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.K3FkBDQlRThV_YEw0WQ_17jdPNuAptkzU32vZnOxeXo",
  //   },
  // };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movieId) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=d3ecc9b38fe65156c11b07a08f3a29ed&append_to_response=videos`
          );

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log(data);
          setMovieDetails(data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMovieDetails();
  }, [movieId]); // Add movieId as a dependency

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 393px)").matches
  );
  const [isTablet, setIsTablet] = useState(
    window.matchMedia("(min-width: 394px) and (max-width: 412px)").matches
  );

  const handleMediaQuery = (e) => {
    setIsMobile(e.matches);
  };

  const handleTabletMediaQuery = (e) => {
    setIsTablet(e.matches);
  };

  useEffect(() => {
    window
      .matchMedia("(max-width: 393px)")
      .addEventListener("change", handleMediaQuery);
    window
      .matchMedia("(min-width: 394px) and (max-width: 412px)")
      .addEventListener("change", handleTabletMediaQuery);

    return () => {
      window
        .matchMedia("(max-width: 393px)")
        .removeEventListener("change", handleMediaQuery);
      window
        .matchMedia(" (max-width: 412px)")
        .removeEventListener("change", handleTabletMediaQuery);
    };
  }, [movieId]);

  const trailer = movieDetails?.videos?.results.find(
    (vid) => vid.name === "Official Trailer"
  );
  return (
    <div className="all">
      <div className="">
        {movieDetails ? (
          <Youtube
            title="trailer"
            videoId={trailer?.key}
            containerClassname="trailer-video"
            className="max-sm:ml-5"
            opts={{
              width: isMobile ? "345px" : isTablet ? "375px" : "100%",
              height: isMobile ? "200px" : isTablet ? "200px" : "389px",
            }}
          />
        ) : (
          <img className="trailer-image" src={img} alt="trailer" />
        )}

        <div className="watch"></div>
        <div className="movie-info">
          <div className="boxm" style={{ display: "flex" }}>
            <div className="content-header">
              <h3 className="text-3xl font-medium">
                {movieDetails?.original_title || "Unknown title"} •{" "}
                {movieDetails?.release_date}
                {movieDetails?.adult === false ? "" : "• PG-13"}
              </h3>

              {movieDetails?.genres && (
                <>
                  <button className="action">
                    {movieDetails.genres[0]?.name}
                  </button>
                  <button className="drama">
                    {movieDetails.genres[1]?.name}
                  </button>
                </>
              )}

              <p style={{ color: "white" }}>{movieDetails?.overview}</p>
            </div>
          </div>
          <div className="text-center mt-7">
            <p className="actors">
              Production Company :
              <span className="red-content">
                {movieDetails?.production_companies[0]?.name}
              </span>
            </p>
            <p className="actors">
              Production Company :
              <span className="red-content">
                {movieDetails?.production_companies[1]?.name}
              </span>
            </p>
            <p className="actors">
              Production Company :
              <span className="red-content">
                {movieDetails?.production_companies[2]?.name}
              </span>
            </p>
            <div className="last-div">
              <button className="last-btn">
                Vote Average : {movieDetails?.vote_average}
              </button>
              <p className="award">Awards 9 nominations</p>
            </div>
          </div>
          ]
        </div>
      </div>
    </div>
  );
}
