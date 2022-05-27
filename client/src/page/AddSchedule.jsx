import { Button, InputGroup, FormControl, Placeholder } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import { Link, useLocation } from "react-router-dom";
import axios from "../plugins/axios";
import { useState } from "react";
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

const AddSchedule = () => {
  const [subjects, setSubject] = useState(null);
  const [code, setCode] = useState("");

  const summitCode = async () => {
    let response = await axios.post(`/schedule/bycode`, {
      code: code,
      account_id: 3,
    });
    let subjectRes = response.data;
    console.log(subjectRes);
    let idSchedule = subjectRes[0].schedule_id;
    let response2 = await axios.post("/addschedule", {
      s_name: subjectRes[0].s_name,
      account_id: 1,
    });

    let response3 = await axios.post("/schedule/subjectlist", {
      subjects: subjectRes,
      scheduleId: response2.data.sehedule_id,
    });
  };
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
            height: "50vh",
            borderRadius: "20px",
          }}
        >
          <FlexContainer>
            <Container>
              <h1 className="title is-1 has-text-white">Add Schedule</h1>
              <InputGroup className="mb-3">
                <InputGroup.Text style={{ backgroundColor: "#FCF69C" }}>
                  Schedule Code
                </InputGroup.Text>
                <FormControl
                  style={{ height: "60px", fontSize: "40px" }}
                  placeholder="Please enter schedule code like SABA001. "
                  aria-label="ScheduleCode"
                  onChange={(e) => {
                    setCode(e.target.value);
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
                  onClick={summitCode}
                >
                  Add
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

export default AddSchedule;
