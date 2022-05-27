import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/Styles.css";

const HomepageSchedule = (props) => {
  return (
    <>
      <Link
        style={{
          textDecorationLine: "none",
          fontSize: "20px",
          backgroundColor: "rgb(255, 255, 255, 0.30)",
        }}
        to={`/Schedule`}
        state={{ schedule: props.schedule }}
        className="has-text-warning-light"
      >
        <li id="scheduleName">
          <a>{props.schedule.s_name}</a>
        </li>
      </Link>
    </>
  );
};

export default HomepageSchedule;
