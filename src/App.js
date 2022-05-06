import "regenerator-runtime/runtime";
import React from "react";
import { login, logout } from "./utils";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import getConfig from "./config";
import { Navbar, Container, Nav } from "react-bootstrap";
const { networkId } = getConfig(process.env.NODE_ENV || "development");
import Home from "./components/Home";
import NewMovie from "./components/NewMovie";
import MovieDetail from "./components/MovieDetail";

export default function App() {
  return (
    <>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="/">Near Movie App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto"></Nav>
              <Nav className="me-auto">
                <Nav.Link href="/NewMovie">{window.accountId === "" ? "" : "Add Movie"}</Nav.Link>
                <Nav.Link onClick={window.accountId === "" ? login : logout}>
                  {window.accountId === "" ? "Login" : "Logout"}
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <div className="container mt-5">
                <Home />
              </div>
            }
          />
          <Route path="/NewMovie" element={<NewMovie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    </>
  );
}
