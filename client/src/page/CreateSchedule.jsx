import { Button, InputGroup, FormControl, Placeholder } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

import React, { useState } from "react";
import Footer from "../components/Footer";
import axios from "../plugins/axios";

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

const CreateSchedule = () => {
  const [schedule, setSchedule] = useState(null);
  const id = useLocation().state.id;
  console.log("id: ", id);

  let navigate = useNavigate();
  function handleChange(event) {
    console.log("test has changed");
    setSchedule(event.target.value);
  }

  const createSchedule = async () => {
    await axios
      .post("/addschedule", {
        s_name: schedule,
        account_id: id,
      })
      .then(async (res) => {
        console.log(res.data);
        navigate("/Createsc2", {
          state: { scheduleName: schedule, scheduleId: res.data.sehedule_id },
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // navigate('/sample', {replace: true});
  };
  return (
    <>
      <Background>
        <div
          className="container mt-5"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "#AB46D2",
            height: "50vh",
            borderRadius: "20px",
          }}
        >
          <FlexContainer>
            <Container>
              <h1 className="title is-1 has-text-white">Create Schedule</h1>
              <InputGroup className="mb-3">
                <InputGroup.Text style={{ backgroundColor: "#FCF69C" }}>
                  Schedule Name
                </InputGroup.Text>
                <FormControl
                  type="text"
                  style={{ height: "60px", fontSize: "40px" }}
                  aria-label="ScheduleCode"
                  placeholder="Please enter schedule name."
                  value={schedule}
                  onChange={handleChange}
                />
              </InputGroup>
              <div className="row">
                <Button
                  className="mt-1"
                  style={{
                    backgroundColor: "#55D8C1",
                    width: "30vw",
                    fontSize: "50px",
                  }}
                  onClick={createSchedule}
                >
                  {/* <Link style={{  textDecorationLine: "none", color: "white"}} to={{pathname:`/Createsc2`}} state={{ scheduleName: schedule, scheduleId: scheduleId }}>Add</Link> */}
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

export default CreateSchedule;
