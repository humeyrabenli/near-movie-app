import React from "react";
import { Link,Outlet } from "react-router-dom";
import MovieDetail from "./MovieDetail";

const Movie = ({movie}) => {
  return (
      <>
    <div className="card shadow-sm">
      <img
        alt="movie"
        src={movie.poster_path}
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <div className="">
          <div style={{float:'right'}}>
              <Link
              to={`/movie/${movie.id}`}
              className="btn btn-sm btn-outline-secondary"
            >
              Donate
            </Link> 
          </div>
        </div>
      </div>
    </div>
    <Outlet/>
    </>
  );
};

export default Movie;