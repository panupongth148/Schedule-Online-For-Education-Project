import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useCallback } from "react";
import Footer from "../components/Footer";
import "../assets/Styles.css";
import itlogo from "../assets/picture/it-logo.png";
import { useNavigate } from "react-router-dom";
import { FlexContainer, Box } from "../components/Components";
import { gql, useQuery, useMutation } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation ($record: CreateOneUserInput!) {
    createUser(record : $record) {
      recordId
    }
  }
`

// const USERS_QUERY = gql`
//   query{
//     users{
//       username,
//       name,
//     }
//   }
// `

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const [registerMutation] = useMutation(REGISTER_MUTATION);
  // const { data } = useQuery(USERS_QUERY)

  const onSubmitRegister = useCallback(
    async () => {
      console.log(password === confirmPassword)
      if (password !== confirmPassword) {
        alert("please check confirm password");
      } else if (password === confirmPassword) {
        console.log('inif');
        try {
          await registerMutation({
            variables: {
              record: {
                username,
                password,
                name,
                email,
              }
            }
          })
          alert('register success')
        } catch (err) {
          console.log(err.message);
        }
      }
    }, [username, password, name, email, registerMutation]
  );

  // console.log(data)

  // const onSubmitRegister = async () => {
  //   // axios
  //   axios
  //     .post("/register", {
  //       username: username,
  //       name: name,
  //       password: password,
  //       email: email,
  //     })
  //     .then(function (response) {
  //       console.log(response);
  //       setName("");
  //       setUsername("");
  //       setPassword("");
  //       setConfirmPassword("");
  //       setEmail("");
  //       console.log("register success");
  //       alert(response);

  //       navigate("/Login");
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       alert(error);
  //     });
  // };

  return (
    <>
      <FlexContainer>
        <Box>
          <img id="logo" src={itlogo} alt="it-logo" />
          <form class="box" id="formRegister">
            <h1 class="title has-text-centered">Register</h1>
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

            <button
              class="button is-link is-fullwidth"
              onClick={() => { onSubmitRegister(); navigate('/Login'); }}
            >
              Sign up
            </button>
          </form>
        </Box>
      </FlexContainer>
      <Footer />
    </>
    // <div className="App">
    //   <div className='container mt-5' style={{backgroundColor: "#AB46D2"}}>
    //     <h1 style={{fontSize: "80px"}}>Register page</h1>
    //     <InputGroup className="mb-3 mt-3">
    //       <InputGroup.Text style={{backgroundColor: "#FCF69C", width: "260px", fontSize: "30px"}}>Username</InputGroup.Text>
    //       <FormControl style={{height: "60px", fontSize: "40px"}} placeholder="Enter your username." aria-label="ScheduleCode" value={ username } onChange={ (e) => setUsername(e.target.value) } />
    //     </InputGroup>
    //     <InputGroup className="mb-3">
    //       <InputGroup.Text style={{backgroundColor: "#FCF69C", width: "260px", fontSize: "30px"}}>Password</InputGroup.Text>
    //       <FormControl style={{height: "60px", fontSize: "40px"}} placeholder="Enter your password." aria-label="ScheduleCode" value={ password } onChange={ (e) => setPassword(e.target.value) } />
    //     </InputGroup>
    //     <InputGroup className="mb-3">
    //       <InputGroup.Text style={{backgroundColor: "#FCF69C", width: "260px", fontSize: "30px"}}>Confirm password</InputGroup.Text>
    //       <FormControl style={{height: "60px", fontSize: "40px"}} placeholder="Confirm your password." aria-label="ScheduleCode" value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value) } />
    //     </InputGroup>
    //     <InputGroup className="mb-3">
    //       <InputGroup.Text style={{backgroundColor: "#FCF69C", width: "260px", fontSize: "30px"}}>Name</InputGroup.Text>
    //       <FormControl style={{height: "60px", fontSize: "40px"}} placeholder="Enter your name." aria-label="ScheduleCode" value={ name } onChange={ (e) => setName(e.target.value) } />
    //     </InputGroup>
    //     <InputGroup className="mb-3">
    //       <InputGroup.Text style={{backgroundColor: "#FCF69C", width: "260px", fontSize: "30px"}}>Email</InputGroup.Text>
    //       <FormControl style={{height: "60px", fontSize: "40px"}} placeholder="Enter your Email." aria-label="ScheduleCode" value={ email } onChange={ (e) => setEmail(e.target.value) } />
    //     </InputGroup>
    //     <div className="row">
    //     <Button className="mt-1 " style={{backgroundColor: "#55D8C1",height: "120px", fontSize: "70px"}} onClick={ () => onSubmitRegister() } >
    //       {/* <Link style={{  textDecorationLine: "none", color: "white"}} to={`/`} >Register</Link> */}
    //       Register
    //     </Button>
    //     </div>

    //   </div>
    //   <Footer/>
    // </div>
  );
};

export default Register;
