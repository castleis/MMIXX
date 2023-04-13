import { useState, useEffect } from "react";
import { countMusic } from "api/mymusic";
import styled, { keyframes } from "styled-components";
import { useRecoilValue } from "recoil";
import { userInfo } from "atom/atom";
// import { _new_music_list } from "atom/mymusic";
import { _new } from "atom/mymusic";

const MusicCount = () => {
  const atomUser = useRecoilValue(userInfo);
  const user = atomUser ? JSON.parse(localStorage.getItem("user")) : null;

  // const newMusicList = useRecoilValue(_new_music_list);
  const reload = useRecoilValue(_new);

  const [allCnt, setAllCnt] = useState(0);
  const [mixedCnt, setMixedCnt] = useState(0);
  const [instCnt, setInstCnt] = useState(0);

  useEffect(() => {
    countMusic(user ? user.userSeq : 0).then(({ data }) => {
      setAllCnt(data.allCnt);
      setMixedCnt(data.mixedCnt);
      setInstCnt(data.instCnt);
    });
  }, [reload]);

  return (
    <Table>
      <tbody>
        <Tr>
          <Td>내가 업로드한 곡</Td>
          <Cnt>{allCnt}</Cnt>
        </Tr>
        <Tr>
          <Td>내가 믹스한 곡</Td>
          <Cnt>{mixedCnt}</Cnt>
        </Tr>
        <Tr>
          <Td>내가 배경음 추출한 곡</Td>
          <Cnt>{instCnt}</Cnt>
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
  // position: absolute;
  // top: 400px;
  width: 90%;
  margin: 0 auto;
  height: 100px;
  // border: 1px dotted red;

  animation-duration: 0.15s;
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
`;

const Cnt = styled.td`
  color: ${({ theme }) => theme.palette.light};
  font-size: 14px;
  font-family: "Heebo", sans-serif;
  text-align: right;
`;

export default MusicCount;
