import {
  Button,
  InputGroup,
  FormControl,
  Placeholder,
  Dropdown,
  Form,
  Control,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import React, { Component, useEffect, useState } from "react";
import Select from "react-select";
import axios from "../plugins/axios";

const options = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sundayy", label: "Sundayy" },
];
const AddSubject = () => {
  const location = useLocation();
  const { scheduleName, scheduleId } = location.state;

  const [day, setDay] = useState("Monday");
  const [subjectName, setSubjectName] = useState("");
  const [subjectTime, setSubjectTime] = useState("");
  const [subjectLink, setSubjectLink] = useState("");
  const [subject, setSubject] = useState(null);
  const [noSubject, setNoSubject] = useState(null);

  console.log(scheduleName + " " + scheduleId);
  useEffect(() => {
    // Update the document title using the browser API
  });
  const submitSubjectInfo = () => {
    console.log(subjectName);
    console.log(subjectTime);
    console.log(subjectLink);
    console.log(day);

    let requestSubject = {
      subject_name: subjectName,
      period: subjectTime,
      date: day,
      link: subjectLink,
      schedule_id: scheduleId,
    };
    console.log(requestSubject);
    axios.post("/addsubject", requestSubject);
  };
  function handleChange(e) {
    console.log(e.value);
    setDay(e.value);
  }
  return (
    <div className="App">
      <div className="container mt-5" style={{ backgroundColor: "#AB46D2" }}>
        <h1 style={{ fontSize: "80px" }}>Subject</h1>
        <Select
          options={options}
          onChange={handleChange}
          defaultValue="Monday"
        />
        <InputGroup className="mb-3 mt-3">
          <InputGroup.Text
            style={{ backgroundColor: "#FCF69C", width: "150px" }}
          >
            Subject Name
          </InputGroup.Text>
          <FormControl
            style={{ height: "60px", fontSize: "40px" }}
            placeholder="Please enter your subject name."
            aria-label="ScheduleCode"
            value={subjectName}
            onChange={(e) => {
              setSubjectName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text
            style={{ backgroundColor: "#FCF69C", width: "150px" }}
          >
            Subject Time
          </InputGroup.Text>
          <FormControl
            style={{ height: "60px", fontSize: "40px" }}
            placeholder="Please enter your subject name."
            aria-label="ScheduleCode"
            value={subjectTime}
            onChange={(e) => {
              setSubjectTime(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text
            style={{ backgroundColor: "#FCF69C", width: "150px" }}
          >
            Subject Link
          </InputGroup.Text>
          <FormControl
            style={{ height: "60px", fontSize: "40px" }}
            placeholder="Please enter your subject link."
            aria-label="ScheduleCode"
            value={subjectLink}
            onChange={(e) => {
              setSubjectLink(e.target.value);
            }}
          />
        </InputGroup>
        <div className="row">
          <Button
            className="mt-1 "
            style={{
              backgroundColor: "#55D8C1",
              height: "120px",
              fontSize: "70px",
            }}
            onClick={submitSubjectInfo}
          >
            <Link
              style={{ textDecorationLine: "none", color: "white" }}
              to={{ pathname: `/Createsc2` }}
              state={{ scheduleName: scheduleName, scheduleId: scheduleId }}
            >
              Add
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddSubject;
