import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { MusicList } from "components/mymusic";

const MixSelectMusic = () => {
  const navigate = useNavigate();

  // [Test] 곡 선택하기 (radio)
  const [selectedMusic, setSelectedMusic] = useState({
    musicSeq: null,
    coverImage: null,
    musicName: null,
    musicianName: null,
  });

  return (
    <MusicItemWrapper>
      <Header title='Music Select' desc='믹스할 노래 고르기' />
      <MusicList radio={true} checkMusic={setSelectedMusic}></MusicList>
      <div style={{ height: "200px" }}></div>
      <CreateBtn
        onClick={() =>
          navigate("/mix", {
            state: {
              coverImage: selectedMusic.coverImage,
              musicName: selectedMusic.musicName,
              musicianName: selectedMusic.musicianName,
              musicSeq: selectedMusic.musicSeq,
            },
          })
        }
      >
        선택 완료
      </CreateBtn>
    </MusicItemWrapper>
  );
};

export default MixSelectMusic;

const MusicItemWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
  width: 80vw;
  padding-left: 3px;
`;
const CreateBtn = styled(DefaultBtn)`
  position: fixed;
  bottom: -20px;
`;
