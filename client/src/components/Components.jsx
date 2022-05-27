import styled from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  background: url("https://www.it.kmitl.ac.th/wp-content/themes/itkmitl2017wp/img/life/life-13.jpg");
  background-size: cover;
  width: 100%;
  min-height: 120vh;
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;
  margin-top: 40px;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 0px;
  }
`;

export const BoxSchedule = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: auto;
`;

export const ScheduleContainer = styled.div`
  display: flex;
  background: #eaddca;
  width: 100%;
  min-height: 100vh;
`;
