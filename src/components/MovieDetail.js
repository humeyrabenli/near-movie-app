import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieById, donateMovie, getAllDonations } from "../utils";
import { utils } from "near-api-js";
import {
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
} from "react-bootstrap";

const MovieDetail = () => {
  const [loading, setLoading] = useState(false);
  const [donateAmount, setDonateAmount] = useState("");
  const [movie, setMovie] = useState({});
  const [donations, setDonations] = useState([]);
  let res = 0;


  const { id } = useParams();
  const newvalue = parseInt(id);

  //to get movie by movie id 
  const getMovie = () => {
    try {
      console.log(newvalue);
      setLoading(true);
      getMovieById(newvalue).then((res) => {
        setMovie(res);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  //to get all donations 
  const getDonations = () => {
    try {
      setLoading(true);
      getAllDonations().then((res) => {
        setDonations(res);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovie();
    getDonations();
  }, [newvalue]);

  //to donate to a movie 
  const donate = async () => {
    try {
      donateMovie(newvalue, donateAmount).then((resp) => {});
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="jumbotron jumbotron-fluid" style={{ marginTop: "18px" }}>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card" style={{ width: "16rem" }}>
              <img
                className="card-img-top"
                src={movie.poster_path}
                alt="Card Image cap"
              />
            </div>{" "}
            <br></br>
            <Link className="btn btn-outline-secondary" to="/">
              Home Page
            </Link>
          </div>
          <div className="col-8">
            <h4 style={{ color: "burlywood" }}>{movie.title}</h4>
            <p>{movie.overview}</p>

            <div className="row">
              <div className="col-6">
                <InputGroup className="mb-2">
                  <FormControl
                    placeholder="Enter the donate amount"
                    aria-label="Recipient's username"
                    onChange={(e) => {
                      setDonateAmount(e.target.value);
                    }}
                    aria-describedby="basic-addon2"
                  />
                  <Button
                    variant="warning"
                    id="button-addon2"
                    onClick={() => {
                      donate();
                    }}
                    className="ml-1"
                  >
                    Donate
                  </Button>
                </InputGroup>
              </div>
            </div>
            <br />
            <div className="row">
              <div className="col-6">
                <h5>All Donations</h5>
                {donations.map(function (donate, i) {
                  return (
                    <p key={i}>
                      {donate.id === newvalue
                        ? donate.donater +
                          "  " +
                          utils.format.formatNearAmount(donate.donateAmount) +
                          " NEAR"
                        : null}
                    </p>
                  );
                })}
                {donations.map(function (donate) {
                  if (donate.id === newvalue) {
                    res += parseFloat(
                      utils.format.formatNearAmount(donate.donateAmount)
                    );
                  }
                })}
              </div>
              <div className="col-6">
                <h5>Total Donate Amount</h5>
                <p>{res} NEAR</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
