import {
  Button,
  ModalHeader,
  ModalBody,
  ModalDialog,
  ModalFooter,
  Table,
  ModalTitle,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import Subject from "./../components/Subject";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "../plugins/axios";
import { useQuery, gql } from "@apollo/client";

const SCHEDULE_QUERY = gql`
  query ($_id: MongoID!) {
    scheduleId (_id: $_id) {
      subjects {
        time
        date
        subjectName
        link
        _id
      }
    }
  }
`;

const Schedule = () => {
  const location = useLocation();
  const { schedule } = location.state;
  const schedule_id = schedule._id;
  console.log(typeof(schedule_id))
  const navigate = useNavigate();

  const { loading, data } = useQuery(SCHEDULE_QUERY, {
    variables: { "_id": schedule_id },
  });
  console.log(data);
  // const [subjectData, setSubjectData] = useState(null);
  const [deleteStatus, setDeleteStatus] = useState("hidden");

  // Get Schedules
  // async function getScheduleList() {
  //   let response = await axios.get(`/getsubjectbysid/${schedule_id}`);
  //   console.log(response.data);
  //   let scheduleList = response.data;
  //   setSubjectData(scheduleList);
  //   console.log(subjectData);
  // }

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   getScheduleList();
  // }, []);

  const handleDeleteButton = (status) => {
    setDeleteStatus(status);
  };

  // Delete Schedule
  async function handleDeleteSubmit() {
    // console.log(schedule_id);
    await axios
      .delete(`/subject/delbyscid`, { data: { schedule_id: schedule_id } })
      .catch((err) => {
        console.log(err);
      });
    await axios
      .delete("/deleteschedule", { data: { schedule_id: schedule_id } })
      .then((res) => {
        alert(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  if (loading) return null;

  return (
    <div className="App">
      <div className="container mt-5">
        <h2>{schedule.title}</h2>
        <p>
          <b>Code:</b> {schedule.code}
        </p>
        <Table striped bordered hover className="mt-5">
          <thead>
            <tr>
              <th>Day</th>
              <th>Subject</th>
              <th>Time</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {data.scheduleId.subjects &&
              data.scheduleId.subjects.map((subject) => {
                return <Subject key={subject._id} subject={subject} />;
              })}
          </tbody>
        </Table>
        <Button
          variant="success"
          style={{ width: "100%", marginBottom: "5px" }}
        >
          <Link
            style={{ textDecorationLine: "none", color: "white" }}
            to={`/AddSj`}
            state={{ schedule: schedule }}
          >
            Add Subject
          </Link>
        </Button>
        <Button
          variant="danger"
          style={{ width: "100%" }}
          onClick={() => handleDeleteButton("visible")}
        >
          Delete this schedule
        </Button>

        <ModalDialog style={{ visibility: deleteStatus }}>
          <ModalHeader closeButton>
            <ModalTitle>Confirm to delete this schedule.</ModalTitle>
          </ModalHeader>

          <ModalBody>
            <p>Please choose your choice.</p>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="secondary"
              onClick={() => handleDeleteButton("hidden")}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleDeleteSubmit}>
              Delete
            </Button>
          </ModalFooter>
        </ModalDialog>
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;
