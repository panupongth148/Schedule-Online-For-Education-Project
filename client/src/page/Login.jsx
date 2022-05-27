import { Button, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useCallback } from "react";
import Footer from "../components/Footer";
import { useNavigate, Navigate } from "react-router-dom";
import "../assets/Styles.css";
import itlogo from "../assets/picture/it-logo.png";
import { FlexContainer, Box } from "../components/Components";
import Cookies from "js-cookie";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      status
      message
      token
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");
  const [loginMutation] = useMutation(LOGIN);
  let navigate = useNavigate();

  const onSubmitLogin = useCallback(
    async (event) => {
      console.log("test");
      event.preventDefault();
      try {
        const statusLogin = await loginMutation({
          variables: {
            username: username,
            password: password,
          },
        });
        console.log(statusLogin);
        if (statusLogin.data.login.status === "success") {
          Cookies.set("token", statusLogin.data.login.token, {
            expires: 7,
            path: "*",
          });
          setLogin(true);
        } else {
          setLogin(false);
          setError("Username or Password is incorrect");
        }
      } catch (error) {
        console.log(error);
        setError("Username or Password is incorrect");
      }

      setUsername("");
      setPassword("");
    },
    [username, password, loginMutation]
  );

  if (login) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <FlexContainer>
        <Box>
          <img id="logo" src={itlogo} alt="it-logo" />
          <form id="formLogin" class="box" onSubmit={onSubmitLogin}>
            <h1 class="title has-text-centered">Login</h1>
            {error !== "" && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div class="field">
              <label class="label">Username</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="e.g. Owensudhod"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" class="button is-link is-fullwidth">
              Sign in
            </button>
          </form>
        </Box>
      </FlexContainer>
      <Footer />
    </>
    // <div className="App">
    //   <div className='container mt-5' style={{backgroundColor: "#AB46D2"}}>
    //     <h1 style={{fontSize: "80px"}}>Login to my schedule</h1>
    //     <InputGroup className="mb-3 mt-3">
    //       <InputGroup.Text style={{backgroundColor: "#FCF69C", width: "150px", fontSize: "30px"}}>Username</InputGroup.Text>
    //       <FormControl style={{height: "60px", fontSize: "40px"}} placeholder="Enter your username." aria-label="ScheduleCode" value={ username } onChange={ (e) => setUsername(e.target.value) } />
    //     </InputGroup>
    //     <InputGroup className="mb-3">
    //       <InputGroup.Text style={{backgroundColor: "#FCF69C", width: "150px", fontSize: "30px"}}>Password</InputGroup.Text>
    //       <FormControl style={{height: "60px", fontSize: "40px"}} placeholder="Enter your password." aria-label="ScheduleCode" value={ password } onChange={ (e) => setPassword(e.target.value) } />
    //     </InputGroup>
    //     <div className="row">
    //     <Button className="mt-1 " style={{backgroundColor: "#55D8C1",height: "90px", fontSize: "50px"}} onClick={ () => onSubmitLogin() } >
    //       {/* <Link style={{  textDecorationLine: "none", color: "white"}} to={`/`} >Login</Link> */}
    //       Login
    //     </Button>
    //     <Button className="mt-1 " style={{backgroundColor: "#55D8C1",height: "90px", fontSize: "50px"}}>
    //       <Link style={{  textDecorationLine: "none", color: "white"}} to={`/Register`} >Register</Link>
    //     </Button>
    //     </div>
    //   </div>
    //   <Footer/>
    // </div>
  );
};

export default Login;
