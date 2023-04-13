import { useRef, useEffect, useState } from 'react'
import styled, { css } from "styled-components"
import AlbumIcon from '@mui/icons-material/Album'

import { Wrapper, Header, DefaultBtn } from "components/Common"
import { Switch } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { getPlaylistInfo, modifyPlaylist } from 'api/playlist'
import { useRecoilValue } from "recoil";
import { userInfo } from "atom/atom";
import CustomToast from "components/mymusic/CustomToast";

const PlaylistEdit = () => {
  const { playlistSeq } = useParams();
  // console.log(playlistSeq);
  const inputRef = useRef(null)
  const navigate = useNavigate()
  const [ playlistInfo, setPlaylistInfo ] = useState({
    playlistName: '',
    isPrivate: true,
    userSeq: -1
  })
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(!isChecked);
  };

  // user
  const atomUser = useRecoilValue(userInfo);

  const [toastCheck, setToastCheck] = useState(false);

  // 플레이리스트 정보 불러오기
  useEffect(() => {    
    getPlaylistInfo(playlistSeq, atomUser.userSeq)
    .then(res => {
      setPlaylistInfo(res.data)
      setIsChecked(res.data.isPrivate)
    })
    .catch(err => console.log(err))
    
    inputRef.current.select()
    inputRef.current.focus()
  }, [])

  // 수정 완료
  const modifySubmit =  () => {
    // console.log(isChecked);
    // console.log(inputRef.current.value);
    var title = inputRef.current.value;
    if (title.replace(/\s/g, "") === "") {
      // alert("제목을 입력해주세요!!")
      setToastCheck(true)
    } else {
      modifyPlaylist(
        playlistSeq,
        {
          playlist_name: title,
          is_private: isChecked,
        }
      ).then(_ => {
        // console.log('?????', res)
        navigate(`/playlist/${playlistSeq}`, {
          state: {
            success: true,
            msg: "플레이리스트 수정 성공",
            width: "250px",
        }})
      }
      )
    }//else
  }//modifySubmit

  return (
    <StyleWrapper url="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWN8ZW58MHx8MHx8&w=1000&q=80">
      <Header 
        title="Edit Playlist"
        desc="플레이리스트 수정"
      />
      {toastCheck ? <CustomToast res='error' text='제목을 입력해주세요!' toggle={setToastCheck} width='230px' /> : null}
      <InputContent>
        <DefaultCover>
          <AlbumIcon color="white" fontSize="large"/>
        </DefaultCover>
        <RightContent>
          <Top>
            <InputTitle>
              <input type="text" ref={inputRef} defaultValue={playlistInfo.playlistName }></input>
            </InputTitle>
            <InputRivateToggle>
              비공개여부
              <Switch checked={isChecked } onChange={handleChange} />
            </InputRivateToggle>
          </Top>
          <Bottom>
            <CancleBtn onClick={() => navigate(`/playlist/${playlistSeq}`)}>
              취소
            </CancleBtn>
            <ModifyBtn onClick={modifySubmit}>
              수정 완료
            </ModifyBtn>
          </Bottom>
        </RightContent>
      </InputContent>
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  ${({theme, url}) => css`
    background-image: linear-gradient(to bottom left, rgba(0, 0, 0, 0.8), ${theme.palette.darkAlt} 70%), url(${url});
    background-size: cover;
  `}
`

const InputContent = styled.div`
  height: 350px;
  width: 1100px;
  overflow: hidden;
  display: grid;
  padding: 0px 10px;
  grid-template-columns: 300px 700px;
  gap: 30px;
  justify-content: start;
`

const DefaultCover = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${({theme}) => theme.palette.dark};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
` 

const RightContent = styled.div`
  width: 700px;
  height: 300px;
  display: flex;
  flex-direction: column;
`

const Top = styled.div`
  flex-direction: column;
  flex-grow: 4;
  align-items: start;
`

const Bottom = styled.div`
  flex-grow: 1;
  justify-content: start;
  align-items: end;
`

const InputTitle = styled.div`
  color: #fff;
  font-size: 45px;
  font-weight: bold;
  
  & input {
    color: #fff;
    background-color: transparent;
    font-size: 50px;
    font-weight: 800;
    border: none;
    border-bottom: 1px solid white;
    width: 100%;
    
    :focus {
      outline: none;
  }
`

const InputRivateToggle = styled.div`
  font-weight: light;
  display: inline-block;
`

// const AddMusicBtn = styled(DefaultBtn)`
// `
const ModifyBtn = styled(DefaultBtn)`
`

const CancleBtn = styled(DefaultBtn)`
`

export default PlaylistEdit;