import React, { useState,useEffect } from "react";
import Movie from "./Movie"
import {getAllMovies} from "../utils";
import { Outlet } from "react-router-dom";

const Home = (props) => {
    const [loading,setLoading] = useState(false);
    const [movies,setMovies] = useState([]);


    const getMovies = () => {
        try {
            setLoading(true);
            getAllMovies().then((res) => {
                setMovies(res);
            });
          } catch (error) {
              console.log(error);
          } finally {
            setLoading(false);
          }
    }

    useEffect(() => {
        getMovies();
      }, []);
  return (
      <>
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
     {
         movies.map(function(movie) {
             return (
                 <div className="col" key={movie.id}>
                     <Movie key={movie.id} movie={movie}/>
                     
                 </div>
             )
         })
     }
     <Outlet/>
    </div>
     </>
  );
};

export default Home;
