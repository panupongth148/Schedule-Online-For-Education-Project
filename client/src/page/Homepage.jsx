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
import Cookies from "js-cookie";
import { gql, useQuery } from "@apollo/client";

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

const Me = gql`
  query {
    me {
      _id
      name
      username
      email
    }
  }
`;

const SCHEDULE_QUERY = gql`
  query {
    schedules {
      _id
      title
      userId
      code
    }
  }
`;

const Homepage = () => {
  const [user, setUser] = useState({account_id: 0});
  const [schedules, setSchedules] = useState(null);

  const me = useQuery(Me);
  const schedule = useQuery(SCHEDULE_QUERY);

  const navigate = useNavigate();
  
  function getScheduleList() {
    console.log(schedule.data.schedules);
    setSchedules(schedule.data.schedules);
  }
  
  function getUserByToken() {
    console.log(me.data.me);
    setUser(me.data.me._id);
  }

  useEffect(() => {
    // Update the document title using the browser API
    getScheduleList();
  }, [user]);

  useEffect(() => {
    getUserByToken();
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
                              {!schedule && <>loading...</>}
                              {schedule && <>{schedules.length}</>}
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
                    {!schedules && <>loading...</>}
                    {schedules && schedules.length === 0 && (
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
                      {schedules &&
                        schedules.map((schedule) => {
                          return (
                            <HomepageSchedule
                              key={schedule._id}
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
