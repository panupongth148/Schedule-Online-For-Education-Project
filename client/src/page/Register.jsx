import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useCallback } from "react";
import Footer from "../components/Footer";
import "../assets/Styles.css";
import itlogo from "../assets/picture/it-logo.png";
import { FlexContainer, Box } from "../components/Components";
import { gql, useMutation } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation ($record: CreateOneUserInput!) {
    createUser(record: $record) {
      recordId
    }
  }
`;

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const [registerMutation] = useMutation(REGISTER_MUTATION);

  const onSubmitRegister = useCallback(
    async (e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
        setError("password ไม่ตรงกัน");
      } else if (password === confirmPassword) {
        try {
          await registerMutation({
            variables: {
              record: {
                username,
                password,
                name,
                email,
              },
            },
          });
          setSuccess(true);
          setError(null);
        } catch (err) {
          setError(err.message);
          console.log(err.message);
        }
      }
    },
    [username, password, name, email, registerMutation, confirmPassword]
  );

  return (
    <>
      <FlexContainer>
        <Box>
          <img id="logo" src={itlogo} alt="it-logo" />
          <form class="box" id="formRegister" onSubmit={onSubmitRegister}>
            <h1 class="title has-text-centered">Register</h1>
            {success && (
              <div class="alert alert-primary" role="alert">
                สมัครสมาชิกสำเร็จ <a href="/login">Login now!</a>
              </div>
            )}
            {error && (
              <div class="alert alert-danger" role="alert">
                {error}
              </div>
            )}
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Owen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  class="input"
                  type="email"
                  placeholder="Owenza@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
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

            <div class="field">
              <label class="label">Confirm Password</label>
              <div class="control">
                <input
                  class="input"
                  type="password"
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            <button class="button is-link is-fullwidth" type="submit">
              Sign up
            </button>
          </form>
        </Box>
      </FlexContainer>
      <Footer />
    </>
  );
};

export default Register;
