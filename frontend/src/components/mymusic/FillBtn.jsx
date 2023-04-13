import styled from "styled-components";

const SecondaryBtn = styled.button`
  background-color: ${({ background, theme }) =>
    background || theme.palette.secondary};
  color: ${({ theme }) => theme.palette.dark};
  padding: 10px 20px;
  border-radius: 27px;
  // margin: 5px auto;
  font-size: 14px;
  height: 40px;
  // text-align: left;
  font-family: "Heebo", sans-serif;
  // display: flex;
  // align-items: center;

  &: hover {
    font-weight: bold;
  }
`;

export default SecondaryBtn;
