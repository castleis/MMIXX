import styled from "styled-components"

const DefaultBtn = styled.button`
  background-color: ${({theme}) => theme.palette.secondary};
  color: ${({theme}) => theme.palette.dark};
  padding: 10px 20px;
  border-radius: 27px;
  border: none;
  font-size: 14px;
  font-weight: 300;
  transition: all 0.1s ease-in-out;
  width: ${({width}) => width ? width : 'auto'};

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.05);
  };

  ${({theme, white}) =>
  white &&`
    border: 1px solid ${theme.palette.light};
    background-color: transparent;
    color: ${theme.palette.light};
  `
  }
`

export default DefaultBtn;