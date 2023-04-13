import styled, { keyframes } from "styled-components";

const IconBtn = ({ icon, iconName, iconHeight = 22, fontSize, onClick }) => {
  return (
    <Button onClick={onClick}>
      <Icon src={icon} alt='' height={iconHeight} />
      <IconName fontSize={fontSize}>{iconName}</IconName>
    </Button>
  );
};

const fadeIn = keyframes`
from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Button = styled.button`
  background: transparent;
  width: 40px;
  height: 40px;

  &: hover {
    img {
      display: none;
    }
    div {
      display: block;
    }
  }
`;

const Icon = styled.img`
  animation: ${fadeIn} 0.2s linear forwards;
`;

const IconName = styled.div`
  font-size: ${(props) => props.fontSize || "12px"};
  font-weight: 200;
  font-family: "Heebo", sans-serif;
  animation: ${fadeIn} 0.2s linear forwards;
  display: none;
`;

export default IconBtn;
