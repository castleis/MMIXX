import styled, { keyframes } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const MusicCount = ({ selected }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onClickMine = () => {
    navigate(`/playlist`);
  };

  const onClickGlobal = () => {
    navigate(`/playlist/global`);
  };

  const onClickFav = () => {
    navigate(`/playlist/favorite`);
  };
  return (
    <Table>
      <tbody>
        <Tr>
          <Td onClick={onClickMine} selected={location.pathname === `/playlist`}>
            내 플레이리스트
          </Td>
        </Tr>
        <Tr>
          <Td onClick={onClickGlobal} selected={location.pathname === `/playlist/global`}>
            글로벌 플레이리스트
          </Td>
        </Tr>
        <Tr>
          <Td onClick={onClickFav} selected={location.pathname === `/playlist/favorite`}>
            즐겨찾기
          </Td>
        </Tr>
      </tbody>
    </Table>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-5%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Table = styled.table`
  margin: 0 auto;
  height: 100px;
  width: 100%;

  animation-duration: 0.2s;
  animation-timing-function: ease-out;
  animation-name: ${fadeIn};
  animation-fill-mode: forwards;
`;

const Tr = styled.tr`
  background-color: transparent;
  height: 30px;
`;

const Td = styled.td`
  color: ${({ theme }) => theme.palette.light};
  font-size: 14px;
  font-weight: 200;
  font-family: "Heebo", sans-serif;
  border-radius: 15px;
  padding-left: 10px;

  &: hover {
    background-color: ${({ theme }) => theme.palette.hover};
    cursor: pointer;
  }

  ${({ selected, theme }) =>
    selected &&
    `
    background-color: ${theme.palette.hover};
    color: ${theme.palette.secondary}`}
`;

export default MusicCount;
