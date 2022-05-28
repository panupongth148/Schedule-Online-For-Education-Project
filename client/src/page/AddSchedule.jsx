import { Button, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import styled from "styled-components";
import { gql, useMutation } from "@apollo/client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ADDSCHEDULE_MUTATION = gql`
  mutation ($code: String!, $userId: String!) {
    addSchedule(code: $code, userId: $userId) {
      status
      message
    }
  }
`;
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
  const [code, setCode] = useState("");
  const [addSchedule] = useMutation(ADDSCHEDULE_MUTATION);
  const [error, setError] = useState(null);
  const id = useLocation().state.id;
  const navigate = useNavigate();

  const summitCode = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const { data } = await addSchedule({
          variables: {
            code: code,
            userId: id,
          },
        });
        if (data.addSchedule.status === "fail") {
          setError("กรุณากรอก code ด้วยค่ะ!");
        } else {
          await MySwal.fire({
            title: "เพิ่มตารางสำเร็จ!",
          });
          navigate("/", {});
        }
      } catch (error) {
        console.log("das001", error);
        setError(error);
      }

      setCode("");
    },
    [code, id, addSchedule]
  );

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
              {error && (
                <div class="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
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
