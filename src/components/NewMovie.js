import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { addMovie } from "../utils";
import {
  Form,
  FormLabel,
  FormControl,
  Button,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";

const NewMovie = () => {
  const [title, setTitle] = useState("");
  const [poster_path, setPoster_path] = useState("");
  const [overview, setOverview] = useState("");

  const isFormFilled = () => title && poster_path && overview;


  // to add movie to near protocol  
  const newMovie = async () => {
    try {
      addMovie(title, poster_path, overview).then((res) => {});
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div className="jumbotron jumbotron-fluid" style={{ marginTop: "18px" }}>
      <div className="container">
        <Form>
          <FormLabel htmlFor="basic-url">Title</FormLabel>
          <InputGroup className="mb-2">
            <FormControl
              placeholder="Enter the movie title"
              aria-label="enter the movie title"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              aria-describedby="basic-addon2"
            />
          </InputGroup>

          <FormLabel htmlFor="basic-url">Poster Url</FormLabel>
          <InputGroup className="mb-2">
            <FormControl
              placeholder="Enter the poster url"
              aria-label="enter the movie title"
              onChange={(e) => {
                setPoster_path(e.target.value);
              }}
              aria-describedby="basic-addon2"
            />
          </InputGroup>
          <FormLabel htmlFor="basic-url">Overview</FormLabel>

          <FloatingLabel controlId="floatingTextarea2">
            <FormControl
              as="textarea"
              placeholder="Overview"
              style={{ height: "100px" }}
              onChange={(e) => {
                setOverview(e.target.value);
              }}
            />
          </FloatingLabel>
          <Button
            variant="warning"
            id="button-addon2"
            className="ml-1"
            disabled={!isFormFilled()}
            onClick={() => {
              newMovie();
            }}
          >
            Add Movie
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewMovie;
