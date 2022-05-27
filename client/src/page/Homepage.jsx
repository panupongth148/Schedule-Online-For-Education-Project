import { Button, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import HomepageSchedule from "./../components/HomepageSchedule";
import Footer from "../components/Footer";
import axios from "../plugins/axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { FlexContainer } from "../components/Components";
import "../assets/Styles.css";
import person from "../assets/picture/person.png";

const ButtonGroup = styled.div`
  .bn1, .bn2{
    background-color: #7DF9FF;
    color: #000;
    margin: 5px;
  },
`;

const Container = styled.div`
  @media only screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Homepage = (props) => {
  const [schedule_list, set_schedule_list] = useState(null);
  const [user, setUser] = useState({ account_id: 0 });
  const navigate = useNavigate();
  console.log(user);

  async function getScheduleList() {
    let response = await axios.get(`/getallsbyid/${user.account_id}`);
    // console.log(response.data)
    let scheduleList = response.data;
    set_schedule_list(scheduleList);
    console.log(schedule_list);
  }

  async function getUserByToken() {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log(token);
      let response = await axios.get(`getuserbytoken`, {
        params: {
          token: token,
        },
      });
      const us = response.data[0];
      console.log(us);
      setUser(us);
    }
  }

  useEffect(() => {
    // Update the document title using the browser API
    getScheduleList();
  }, [user]);

  useEffect(() => {
    getUserByToken();
    console.log(user);
  }, []);

  return (
    <>
      {user.account_id !== 0 && (
        <FlexContainer>
          <div className="container mt-5">
            <div className="container">
              <aside class="menu">
                <ul class="menu-list">
                  <li>
                    <a className="is-active">
                      <Container>
                        <h1 class="menu-label has-text-info-light">
                          Schedule List{" "}
                          <span>
                            <Badge bg="warning">
                              <FontAwesomeIcon icon={faCalendarPlus} />{" "}
                              {!schedule_list && <>loading...</>}
                              {schedule_list && <>{schedule_list.length}</>}
                            </Badge>
                          </span>
                        </h1>
                        <ButtonGroup>
                          <Button
                            className="bn1"
                            onClick={() => {
                              navigate("/Createsc", {
                                state: { id: user.account_id },
                              });
                            }}
                          >
                            Create Schedule
                          </Button>
                          <Button
                            className="bn2"
                            onClick={() => {
                              navigate("/Addsc");
                            }}
                          >
                            Add Schedule
                          </Button>
                        </ButtonGroup>
                      </Container>
                    </a>
                    {!schedule_list && <>loading...</>}
                    {schedule_list && schedule_list.length === 0 && (
                      <>
                        <div className="d-flex justify-content-center">
                          <div class="card mt-6">
                            <div class="card-body">
                              <h1 className="title is-4 has-text-centered">
                                คุณยังไม่มีกำหนดการเวลาเรียน
                              </h1>
                            </div>
                          </div>{" "}
                        </div>
                      </>
                    )}
                    <ul>
                      {schedule_list &&
                        schedule_list.map((schedule) => {
                          return (
                            <HomepageSchedule
                              key={schedule.schedule_id}
                              schedule={schedule}
                            />
                          );
                        })}
                    </ul>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </FlexContainer>
      )}
      {user.account_id === 0 && (
        <div className="row g-0">
          <div className="col-md-6 g-0">
            <div className="leftside">
              <p className="title is-2 has-text-centered">WELCOME!</p>
              <p className="title is-3 has-text-centered">
                WE ARE SCHEDULE EXPERT.
              </p>
              <p className="subtitle has-text-centered">
                We make managing your class schedule easier.
              </p>
              <Link to="/Register">
                <button type="button" class="btn btn-outline-dark">
                  Start now
                </button>
              </Link>
            </div>
          </div>
          <div className="col-md-6 g-0">
            <div className="rightside">
              <img id="person" src={person} alt="" />
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Homepage;
