import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import WarningIcon from "@mui/icons-material/WarningAmberOutlined";
import ErrorrIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import SuccessIcon from "@mui/icons-material/CheckBoxOutlined";

const CustomToast = ({ res, text, toggle, width = "160px", time = 3000 }) => {
  const [state, setState] = useState(slideDown);

  useEffect(() => {
    let timer2;
    let timer = setTimeout(() => {
      setState(slideUp);
      timer2 = setTimeout(() => {
        toggle(false);
      }, 500);
    }, time);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    // <Toast animation={state} forUpload={true}>
    <Toast animation={state} width={width}>
      {/* <Section> */}
      {res === "info" ? (
        <InfoIcon color='primary' style={{ textalign: "left" }} />
      ) : res === "error" ? (
        <ErrorrIcon sx={{ color: "rgb(220, 53, 69)" }} />
      ) : res === "success" ? (
        <SuccessIcon color='success' />
      ) : res === "warning" ? (
        <WarningIcon sx={{ color: "rgb(255, 193, 7)" }} />
      ) : null}
      {/* <InfoIcon color='primary' />
      <WarningIcon sx={{ color: "rgb(255, 193, 7)" }} />
      <ErrorrIcon sx={{ color: "rgb(220, 53, 69)" }} />
      <SuccessIcon color='success' /> */}
      <Text>{text}</Text>
      {/* </Section> */}
    </Toast>
  );
};

// const slideIn = keyframes`
// from {
//     transform: translateX(150%);
//   }
//   to {
//     transform: translateX(0%);
//   }
// `;

// const slideOut = keyframes`
// from {
//     transform: translateX(0%);
//   }
//   to {
//     transform: translateX(150%);
//   }
// `;

const slideDown = keyframes`
from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0%);
  }
`;

const slideUp = keyframes`
from {
    opacity: 1;
    transform: translateY(0%);
  }
  to {
    opacity: 0;
    transform: translateY(-5%);
  }
`;

const Toast = styled.div`
  background-color: ${({ theme }) => theme.palette.light};
  // border: 1px solid ${({ theme }) => theme.palette.darkgray};
  border-radius: 15px;
  box-shadow: 0 0.5rem 1rem rgb(0 0 0 / 15%);
  height: 40px;
  width: ${(props) => props.width};
  padding: 10px;
  // display: inline-block;
  // text-align: center;
  // text-align: left;
  display: flex;
  // align-items: center;
  // justify-content: center;
  justify-content: flex-start;

  position: fixed;
  top: 115px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  @media (max-width: 768px) {
    margin-left: -100px;
    left: 50%;
    transform: translateX(-50%);
  }

  animation: ${({ animation }) => animation} 0.5s ease-in-out 0s 1 normal forwards;
`;

const Text = styled.p`
  color: ${({ theme }) => theme.palette.hover};
  font-size: 16px;
  font-weight: bold;
  font-family: "Heebo", sans-serif;

  margin-left: 10px;
`;

export default CustomToast;
