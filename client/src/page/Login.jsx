import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useCallback } from "react";
import Footer from "../components/Footer";
import { Navigate } from "react-router-dom";
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

  const onSubmitLogin = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const statusLogin = await loginMutation({
          variables: {
            username: username,
            password: password,
          },
        });
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
  );
};

export default Login;
