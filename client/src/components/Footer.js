import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

const FooterCore = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 10px;
  background-color: #cccccc;
  color: #000;
  text-align: center;
  @media only screen and (max-width: 540px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  a {
    text-decoration: none;
  }
  a li:hover {
    color: #696969;
  }
  li {
    margin: 10px;
    color: #000;
  }
  @media only screen and (max-width: 540px) {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0px;
  }
`;

const Footer = () => {
  return (
    <FooterCore>
      <p>© 2022 Schedule Expert™. All Rights Reserved.</p>
      <span>
        Schedule Expert{" "}
        <FontAwesomeIcon icon={faBook} style={{ color: "#ffffff" }} />
      </span>
      <div>
        <Ul>
          <a href="/">
            <li>About</li>
          </a>
          <a href="/">
            <li>Contact</li>
          </a>
          <a href="/">
            <li>Github</li>
          </a>
          <a href="/">
            <li>blog</li>
          </a>
        </Ul>
      </div>
    </FooterCore>
    //   <Box>
    //     <h1
    //       style={{
    //         color: "black",
    //         textAlign: "center",
    //         marginTop: "-60px",
    //         fontWeight: "bold",
    //       }}
    //     >
    //       ScheduleForOnlineEducation
    //     </h1>
    // <Container>
    //   <Row>
    //     <Column>
    //       <Heading>About Us</Heading>
    //       <FooterItem>62070042</FooterItem>
    //       <FooterItem>62070120</FooterItem>
    //       <FooterItem>62070148</FooterItem>
    //     </Column>
    //     <Column>
    //       <Heading>Services</Heading>
    //       <FooterItem>Chanathip</FooterItem>
    //       <FooterItem>Piyaparn</FooterItem>
    //       <FooterItem>Panupong</FooterItem>
    //     </Column>
    //     <Column>
    //       <Heading>Contact Us</Heading>
    //       <FooterItem>Amoncheewasilapakul</FooterItem>
    //       <FooterItem>Sukmakanan</FooterItem>
    //       <FooterItem>Thongbainoi</FooterItem>
    //     </Column>
    //     <Column>
    //       <Heading>Github</Heading>
    //       <FooterLink href="https://github.com/fchana">
    //         <i>
    //           <span style={{ marginLeft: "10px" }}>fchana</span>
    //         </i>
    //       </FooterLink>
    //       <FooterLink href="https://github.com/panupongth148">
    //         <i>
    //           <span style={{ marginLeft: "10px" }}>panupongth148</span>
    //         </i>
    //       </FooterLink>
    //       <FooterLink href="https://github.com/it62070120/it62070120">
    //         <i>
    //           <span style={{ marginLeft: "10px" }}>it62070120</span>
    //         </i>
    //       </FooterLink>
    //     </Column>
    //   </Row>
    // </Container>
    //   </Box>
  );
};

export default Footer;
