import { Wrapper, Header, DefaultBtn } from "components/Common";
import { useRecoilValue } from "recoil";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { userInfo } from "atom/atom";
import { postPlaylist, insertMusicInPlaylist } from "api/playlist";
import { MusicList } from "components/mymusic";
import CustomToast from "components/mymusic/CustomToast";

const PlaylistSelectMusic = () => {
  const navigate = useNavigate();
  // const playList = useRecoilValue(testPlaylistMusic);

  const { state } = useLocation();
  const playlistTitle = state.playlistTitle;
  // console.log(playlistTitle);
  const atomUser = useRecoilValue(userInfo);

  // [Test] 곡 선택하기 (check box)
  const [checkedList, setCheckedList] = useState([]);

  const { type } = useParams();

  const [errorInfo, setErrorInfo] = useState({ msg: "", width: "" });
  const [isError, setIsError] = useState(false);

  // 선택 완료 버튼 누르면 플레이리스트 생성
  const onClickLogin = () => {
    console.log(checkedList);
    if (type === "create") {
      postPlaylist(atomUser.userSeq, {
        playlist_name: playlistTitle,
        is_private: state.isPrivate,
        user_seq: atomUser.userSeq,
        playlist_music: checkedList,
      })
        .then((res) => {
          // setToastSuccess({ state: true, msg: "플레이리스트 생성 성공" });
          navigate(`/playlist/${res.data}`, {
            state: {
              playlistTitle: `${playlistTitle}`,
              isPrivate: `${state.isPrivate}`,
              success: true,
              msg: "플레이리스트 생성 성공",
              width: "250px",
            },
          });
        })
        .catch(() => {
          setIsError(true);
          setErrorInfo({ msg: "플레이리스트 생성 실패", width: "250px" });
        });
    } else {
      insertMusicInPlaylist(atomUser.userSeq, state.playlistSeq, {
        playlist_music: state.playlistMusic,
        add_music: checkedList,
      })
        .then(() => {
          navigate(`/playlist/${state.playlistSeq}`, {
            state: {
              success: true,
              msg: "곡 추가 성공",
              width: "150px",
            },
          });
        })
        .catch(() => {
          setIsError(true);
          setErrorInfo({ msg: "곡 추가 실패", width: "150px" });
        });
    }
  };

  console.log("playlistTitle :", playlistTitle);

  return (
    <Wrapper>
      <Header title='Music Select' desc='노래 고르기' />
      <MusicList checkBox={true} checkMusicList={setCheckedList}></MusicList>
      <div style={{ height: "200px" }}></div>
      <CreateBtn onClick={onClickLogin}>선택 완료</CreateBtn>
      {isError ? <CustomToast res='error' text={errorInfo.msg} toggle={setIsError} width={errorInfo.width} /> : null}
    </Wrapper>
  );
};

const CreateBtn = styled(DefaultBtn)`
  position: fixed;
  bottom: -20px;
`;

export default PlaylistSelectMusic;

// const MusicItemWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   width: 80vw;
//   padding-left: 3px;
// `;
// const SelectBox = styled.div``;
