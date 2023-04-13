import styled from "styled-components";

const LightOutlineBtn = styled.button`
  background-color: ${({ theme }) => theme.palette.darkgray};
  color: ${({ theme }) => theme.palette.light};
  padding: 10px 10px;
  border: 1.6px solid ${({ theme }) => theme.palette.light};
  border-radius: 25px;
  margin: 5px auto;
  font-size: 14px;
  height: 40px;
  width: ${(props) => props.width || "100px"};
  // text-align: left;
  font-family: "Heebo", sans-serif;
  // display: flex;
  align-items: center;

  transition: all 0.1s ease-in-out;

  &: hover {
    background-color: ${({ theme }) => theme.palette.hover};
    border: 1.6px solid ${({ theme }) => theme.palette.secondary};
  }

  ${({ active, theme }) =>
    active &&
    `
    background-color: ${theme.palette.hover};
    border: 1.6px solid ${theme.palette.secondary};
    `};
`;

export default LightOutlineBtn;
