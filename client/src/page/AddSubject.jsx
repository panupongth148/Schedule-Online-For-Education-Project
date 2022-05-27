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
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";

const Background = styled.div`
  display: flex;
  background: #050a30;
  background-size: cover;
  width: 100%;
  min-height: 120vh;
  text-align: center;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
`;

const CREATE_SUBJECT_MUTATION = gql`
  mutation ($record: CreateOneSubjectInput!) {
    createSubject(record: $record) {
      __typename
    }
  }
`;

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
  const scheduleId = schedule._id;

  const [createSubjectMutation] = useMutation(CREATE_SUBJECT_MUTATION);
  const [day, setDay] = useState("Monday");
  const [subjectName, setSubjectName] = useState("");
  const [subjectTime, setSubjectTime] = useState("");
  const [subjectLink, setSubjectLink] = useState("");

  console.log("id: " + scheduleId);

  const submitSubjectInfo = useCallback(async () => {
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
              scheduleId: scheduleId,
            },
          },
        });
        alert("Add subject success");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      alert("Please input data");
    }
  });

  function handleChange(e) {
    console.log(e.value);
    setDay(e.value);
  }

  return (
    <>
      <Background>
        <div
          className="container mt-5"
          style={{
            backgroundColor: "#AB46D2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "70vh",
            borderRadius: "20px",
          }}
        >
          <FlexContainer>
            <Container>
              <h1 className="title is-1 has-text-white">Subject</h1>
              <Select
                class="form-select"
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
                    width: "30vw",
                    fontSize: "50px",
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
            </Container>
          </FlexContainer>
        </div>
      </Background>
      <Footer />
    </>
  );
};

export default AddSubject;
