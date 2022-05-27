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
import { useQuery, gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const SCHEDULE_QUERY = gql`
  query ($_id: MongoID!) {
    scheduleId(_id: $_id) {
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

const DELETE_SCHEDULE = gql`
  mutation ($id: MongoID!) {
    deleteScheduleId(_id: $id) {
      recordId
    }
  }
`;

const DELETE_ALLSUBJECT = gql`
  mutation ($filter: FilterRemoveManySubjectInput!) {
    deleteSubjectAllById(filter: $filter) {
      numAffected
    }
  }
`;

const Schedule = () => {
  const location = useLocation();
  const { schedule } = location.state;
  const schedule_id = schedule._id;
  console.log(typeof schedule_id);
  const navigate = useNavigate();
  const [deleteScheduleMutation] = useMutation(DELETE_SCHEDULE);
  const [deleteSubjectMutation] = useMutation(DELETE_ALLSUBJECT);

  const { loading, data } = useQuery(SCHEDULE_QUERY, {
    variables: { _id: schedule_id },
  });

  const handleDeleteButton = async () => {
    await MySwal.fire({
      title: "ลบตาราง",
      text: "คุณต้องการจะลบตารางและวิชาทั้งหมดในตารางนี้?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (data.scheduleId.subjects.length !== 0) {
            await deleteSubjectMutation({
              variables: {
                filter: {
                  scheduleId: schedule_id,
                },
              },
            });
          }
          await deleteScheduleMutation({
            variables: {
              id: schedule_id,
            },
          });

          await Swal.fire("ลบสำเร็จ", "", "success");
          navigate("/", { replace: true });
        } catch (error) {
          console.log(error);
          await Swal.fire(
            `ไม่สามารถลบได้เนื่องจาก Error code:${error.message}`,
            "",
            "info"
          );
        }
      }
    });
  };

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
          onClick={() => handleDeleteButton()}
        >
          Delete this schedule
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Schedule;
