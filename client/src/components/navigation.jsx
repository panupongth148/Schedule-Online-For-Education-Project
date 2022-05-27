import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../plugins/axios";
import Cookies from "js-cookie";
import { gql, useQuery } from '@apollo/client';

import HomePage from "../page/Homepage";
import AddSchedule from "../page/AddSchedule";
import CreateSchedule from "../page/CreateSchedule";
import CreateScheduleNext from "../page/CreateScheduleNext";
import AddSubject from "../page/AddSubject";
import Login from "../page/Login";
import Register from "../page/Register";
import Schedule from "../page/Schedule";

const ME_QUERY = gql`
  query {
    me {
      _id
      name
      username
      email
    }
  }
`;

const Navigation = () => {
  const {loading, data} = useQuery(ME_QUERY);
  
  const logout = () => {
    Cookies.remove("token");
    window.location.reload(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Container>
            <Navbar.Brand style={{ color: "#FCF69C" }} as={Link} to="/">
              <span>
                <img
                  className="mr-2"
                  src="https://cdn-icons-png.flaticon.com/512/470/470326.png"
                  width="40px"
                  height="100%"
                  alt="Shedule"
                />
                Schedule Expert
              </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              {!data && (
                <Nav>
                  <Nav.Link
                    style={{ color: "#FCF69C" }}
                    as={Link}
                    to="/Register"
                  >
                    Register
                  </Nav.Link>
                  <Nav.Link style={{ color: "#FCF69C" }} as={Link} to="/Login">
                    Login
                  </Nav.Link>
                </Nav>
              )}
              {data && (
                <Nav>
                  <Nav.Link style={{ color: "#FCF69C" }}>
                    {data.me.name}
                  </Nav.Link>
                  <Nav.Link
                    style={{ color: "#FCF69C" }}
                    onClick={logout}
                    to="/"
                  >
                    Logout
                  </Nav.Link>
                </Nav>
              )}
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route exact name="home" path="/" _id={data._id} element={<HomePage />} ></Route>
          <Route
            name="AddSchedule"
            path="/AddSc"
            element={<AddSchedule />}
          ></Route>
          <Route
            name="CreateSchedule"
            path="/CreateSc"
            element={<CreateSchedule />}
          ></Route>
          <Route
            name="CreateScheduleNext"
            path="/CreateSc2"
            element={<CreateScheduleNext />}
          ></Route>
          <Route
            name="AddSubject"
            path="/AddSj"
            element={<AddSubject />}
          ></Route>
          <Route name="Login" path="/Login" element={<Login />}></Route>
          <Route
            name="Register"
            path="/Register"
            element={<Register />}
          ></Route>
          <Route
            name="Schedule"
            path="/Schedule"
            element={<Schedule />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Navigation;
