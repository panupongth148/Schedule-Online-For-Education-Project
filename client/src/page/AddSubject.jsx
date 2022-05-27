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
import React, { useCallback, useState } from "react";
import Select from "react-select";
import axios from "../plugins/axios";
import { gql, useMutation } from '@apollo/client';

const CREATE_SUBJECT_MUTATION = gql`
  mutation ($record: CreateOneSubjectInput!) {
    createSubject (record: $record) {
      __typename
    }
  }
`

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
  const { schedule } = location.state;
  const scheduleId = schedule._id

  const [createSubjectMutation] = useMutation(CREATE_SUBJECT_MUTATION);
  const [day, setDay] = useState("Monday");
  const [subjectName, setSubjectName] = useState("");
  const [subjectTime, setSubjectTime] = useState("");
  const [subjectLink, setSubjectLink] = useState("");

  console.log("id: " + scheduleId);

  const submitSubjectInfo = useCallback(
    async () => {
      console.log(subjectName);
      console.log(subjectTime);
      console.log(subjectLink);
      console.log(day);
      if (subjectName && subjectTime && subjectLink && day) {
        // let requestSubject = {
        //   subject_name: subjectName,
        //   period: subjectTime,
        //   date: day,
        //   link: subjectLink,
        //   schedule_id: scheduleId,
        // };
        // console.log(requestSubject);

        try {
          await createSubjectMutation({
            variables: {
              record: {
                subjectName: subjectName,
                date: day,
                time: subjectTime,
                link: subjectLink,
                scheduleId: scheduleId
              }
            }
          })
          alert('Add subject success')
        } catch (err) {
          console.log(err.message);
        }
      } else {
        alert("Please input data")
      }
    }
  );

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
              to={{ pathname: `/Schedule` }}
              state={{ schedule: schedule }}
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
