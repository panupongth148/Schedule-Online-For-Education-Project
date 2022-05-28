import {
  Button,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect } from "react";
import Subject from "./../components/Subject";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useQuery, gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ScheduleContainer, BoxSchedule } from "../components/Components";

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

const DELETE_SUBJECT = gql`
  mutation ($id: MongoID!) {
    deleteSubjectById(_id: $id) {
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
  const navigate = useNavigate();

  const [deleteScheduleMutation] = useMutation(DELETE_SCHEDULE);
  const [deleteSubjectByIdMutation] = useMutation(DELETE_SUBJECT);
  const [deleteSubjectAllMutation] = useMutation(DELETE_ALLSUBJECT);

  const { loading, data, refetch } = useQuery(SCHEDULE_QUERY, {
    variables: { _id: schedule_id },
  });

  useEffect(() => {
    refetch();
  }, []);

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
            await deleteSubjectAllMutation({
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

  async function deleteSubjectById(subjectId) {
    try {
      await deleteSubjectByIdMutation({
        variables: {
          id: subjectId,
        },
      });
      refetch();
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return null;

  return (
    <>
      <ScheduleContainer>
        <BoxSchedule>
          <div className="container">
            <h2 className="mt-5">{schedule.title}</h2>
            <p>
              <b>Code:</b> {schedule.code}
            </p>
            <Table striped bordered hover className="mt-5">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Day</th>
                  <th style={{ textAlign: "center" }}>Subject</th>
                  <th style={{ textAlign: "center" }}>Time</th>
                  <th style={{ textAlign: "center" }}>Link</th>
                  <th style={{ textAlign: "center" }}>Option</th>
                </tr>
              </thead>
              <tbody>
                {data.scheduleId.subjects &&
                  data.scheduleId.subjects.map((subject) => {
                    return (
                      <Subject
                        key={subject._id}
                        subject={subject}
                        deleteSubjectById={deleteSubjectById}
                      />
                    );
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
        </BoxSchedule>
      </ScheduleContainer>
      <Footer />
    </>
  );
};

export default Schedule;
