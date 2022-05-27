import {
  Button,
  InputGroup,
  FormControl,
  Placeholder,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import axios from "../plugins/axios";
import { useState, useEffect } from "react";

const CreateScheduleNext = (props) => {
  const location = useLocation();
  const { scheduleName, scheduleId } = location.state;
  const [subjectData, setSubjectData] = useState(null);

  async function getScheduleList() {
    let response = await axios.get(`/getsubjectbysid/${scheduleId}`);
    let scheduleList = response.data;
    setSubjectData(scheduleList);
  }

  useEffect(() => {
    // Update the document title using the browser API
    getScheduleList();
  }, [setSubjectData]);

  return (
    <div className="App">
      <div className="container mt-5" style={{ backgroundColor: "#AB46D2" }}>
        <h1 style={{ fontSize: "80px" }}>Add Subject</h1>
        <ListGroup>
          {subjectData &&
            subjectData.map((subject) => {
              return (
                <ListGroup.Item
                  style={{
                    height: "100px",
                    fontSize: "50px",
                    backgroundColor: "#FCF69C",
                  }}
                >
                  {subject.subject_name}
                </ListGroup.Item>
              );
            })}
        </ListGroup>
        <div className="row">
          <Button
            className="mt-1"
            style={{
              backgroundColor: "#55D8C1",
              height: "60px",
              fontSize: "30px",
            }}
          >
            <Link
              style={{ textDecorationLine: "none", color: "white" }}
              to={`/Addsj`}
              state={{ scheduleName: scheduleName, scheduleId: scheduleId }}
            >
              Add Subject
            </Link>
          </Button>
        </div>
        <div className="row">
          <Button
            className="mt-1 "
            style={{
              backgroundColor: "#55D8C1",
              height: "60px",
              fontSize: "30px",
            }}
          >
            <Link
              style={{ textDecorationLine: "none", color: "white" }}
              to={`/Addsc`}
            >
              Create Schedule
            </Link>
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateScheduleNext;
