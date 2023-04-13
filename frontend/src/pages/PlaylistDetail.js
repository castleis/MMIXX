import { useState, useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { useNavigate, useParams } from 'react-router-dom'
import AlbumIcon from '@mui/icons-material/Album'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useRecoilValue } from "recoil"
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';

import { Wrapper, Header } from "components/Common"
import { getPlaylistDetail, deletePlaylist, getPlaylistInfo, addFavoritePlaylist, deleteFavoritePlaylist } from "api/playlist"
import { CustomTable } from "components/mymusic"
import { usePlayControl } from "hooks/usePlayControl"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { userInfo } from 'atom/atom';
import { getUser } from "api/user"

const PlaylistDetail = () => {
  const { playlistSeq } = useParams()
  const [ playlistMusic, setPlayListMusic ] = useState([]);
  const [ coverImage, setCoverImage ] = useState(null)
  const [ playlistInfo, setPlaylistInfo ] = useState({
      playlistName: '',
      isPrivate: true,
      userSeq: -1
  })

  const [ playlistUserInfo, setPlaylistUserInfo ] = useState({
    profileImageUrl: '',
    userName: '',
  })
  const { 
    audioElement, 
    nowMusic, 
    queue, 
    isPlaying, 
    setIsPlaying, 
    createNowPlaylist, 
    createNowMusic 
  } = usePlayControl(playlistSeq)
  
  // user 
  const atomUser = useRecoilValue(userInfo)

  // 공개 여부 체크
  const [isPrivate, setIsPrivate] = useState(false);

  useEffect(() => {
  }, [nowMusic])
  /**
   * 플레이리스트 재생
   */
  const handlePlaying = async () => {
    if (queue && queue === playlistMusic) {
      console.log(' same! ')
      audioElement.paused ? audioElement.play() : audioElement.pause()
    } else {
      const res = await createNowPlaylist(playlistMusic)
      createNowMusic(res)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
    audioElement.pause()
  }

  // 즐겨찾기
  const [isFavorite, setIsFavorite] = useState(false);
  const heartClick = (e) => {
    // setIsFavorite(!isFavorite);
    // e.stopPropagation();
    // console.log("heartClick")
    if (!isFavorite) {
      addFavoritePlaylist({
        userSeq: atomUser.userSeq,
        playlistSeq: playlistSeq
      }).then(res => {
        setIsFavorite(true);
      })
    } else {
      deleteFavoritePlaylist(atomUser.userSeq, playlistSeq).then(res => {
        setIsFavorite(false);
      })
    }

  }

  useEffect(() => {
    // 플레이리스트 음악 목록 가져오기
    getPlaylistDetail(playlistSeq)
      .then(res => {
        setPlayListMusic(res.data)
        setCoverImage(res.data[0].coverImage)
      })
      .catch(err => console.log(err))
    
    // 플레이리스트 정보(제목, 공개여부, 즐겨찾기 여부 등) 가져오기
    getPlaylistInfo(playlistSeq, atomUser.userSeq)
      .then(res => {
        // setPlaylistTitle(res.data.playlistName)
        setPlaylistInfo(res.data);
        setIsPrivate(res.data.isPrivate);
        setIsFavorite(res.data.isFavorite);
        return res.data.userSeq;
      })
      .then(res => {
        getUser(res)
          .then(res => setPlaylistUserInfo(res.data))
        console.log("000 ",res.data.isFavorite)
      })
      .catch(err => console.log(err))
    
  }, [playlistSeq]);

  return (
    <StyleWrapper url={coverImage}>
      <Header 
        title={playlistInfo.playlistName}
        desc=""
        fontSize="24px"
      />
      <InfoContent>
        <PlaylistCover coverImage={coverImage}>
          {!coverImage &&
            <AlbumIcon color="white" fontSize="large"/>
          }
        </PlaylistCover>
        <RightContent>
            {isFavorite ?
              <StyleFavoriteIcon onClick={heartClick } />
              :
              <StyleFavoriteBorderIcon onClick={heartClick } />
            }
          <Top>
            {playlistUserInfo.userSeq === atomUser.userSeq && isPrivate && <p style={{ color: "gray", position: "absolute", top: 0 }}>비공개 처리된 플레이리스트 입니다</p>}
            <PlaylistTitle>
              <p>{playlistInfo.playlistName}</p>
            </PlaylistTitle>
            <PlaylistUser>
              <img src={playlistUserInfo.profileImageUrl} alt="만든 사람"/>
              <span>{playlistUserInfo.userName}</span>
            </PlaylistUser>
            {/* {playlistUserInfo.userSeq === atomUser.userSeq &&
              <PrivateToggle>
                비공개여부
                <Switch checked={isChecked } />
              </PrivateToggle>
            } */}
          </Top>
          <Bottom>
            {/* 재생하기 */}
            {(isPlaying || !audioElement.paused) && queue.playlistSeq === playlistSeq? 
              <StylePauseCircleRoundedIcon 
                sx={{ fontSize: '60px'}}
                onClick={handlePause}
              />
            :
              <StylePlayCircleFilledRoundedIcon 
                sx={{ fontSize: '60px'}}
                onClick={handlePlaying}
                disabled={playlistMusic.length === 0}
              />
            }
            {playlistUserInfo.userSeq === atomUser.userSeq &&
              <MoreIconDiv 
                playlistMusic={playlistMusic} 
                playlistSeq={playlistSeq}
              />
            }
          </Bottom>
        </RightContent>
      </InfoContent>

      <CustomTable playlistSeq={playlistSeq} musicList={playlistMusic} isPlaylistUser={playlistUserInfo.userSeq === atomUser.userSeq} />
    </StyleWrapper>
  );
};

const MoreIconDiv = ({ playlistMusic, playlistSeq }) => {
  const wrapperRef = useRef(null)
  const navigate = useNavigate()
  const [ isOpen, setIsOpen ] = useState(false)

  // 플레이리스트 삭제 시작
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
  
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
  
    return confirmAction;
  };
  const deleteConfirm = () => {
    deletePlaylist(playlistSeq)
      .then(res => {
        // alert('삭제되었습니다.')
        navigate('/playlist')
      })
  }
  const cancelConfirm = () => console.log("취소했습니다.");
  const confirmDelete = useConfirm(
    "삭제하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );
  // 플레이리스트 삭제 끝

  const handleToggle = () => {
    setIsOpen((pre) => !pre)
    // console.log(isOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!isOpen) return;
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      // console.log(isOpen)
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, isOpen]);

  return (
    <MoreDiv ref={wrapperRef}>
      <SelectSection>
        <MoreVertIcon 
          fontSize="small" 
          onClick={handleToggle}
        />
        {isOpen &&
          <CustomSelect>
            <ul>
              <li onClick={() => navigate(`/playlist/select/update`, {
                      state : {
                        playlistSeq: `${playlistSeq}`,
                        playlistMusic: playlistMusic
                      }
                    })}
                      >
                곡 추가하기
              </li>
              <li onClick={() => navigate(`/playlist/edit/${playlistSeq}`)}>
                수정하기
              </li>
              <li onClick={confirmDelete}>
                삭제하기
              </li>
            </ul>
          </CustomSelect>
        }
      </SelectSection>
    </MoreDiv>
  )
}

const StyleWrapper = styled(Wrapper)`
  ${({theme, url}) => css`
    background-image: linear-gradient(to bottom left, rgba(0, 0, 0, 0.8), ${theme.palette.darkAlt} 70%), url(${url});
    background-size: cover;
  `}
`

const InfoContent = styled.div`
  height: 350px;
  width: 1130px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 300px 700px;
  justify-content: start;
`

const PlaylistCover = styled.div`
  width: 300px;
  height: 300px;
  background-color: ${({theme, coverImage}) => coverImage || theme.palette.dark};
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({coverImage}) => 
    coverImage && `
    background-image: url(${coverImage});
    background-size: cover;
  `}
` 

const RightContent = styled.div`
  width: 810px;
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  position: relative;
  margin-left: 20px;
`

const Top = styled.div`
  flex-direction: column;
  flex-grow: 4;
  align-items: start;
  position: relative;
`

const Bottom = styled.div`
  flex-grow: 1;
  justify-content: space-between;
  align-items: end;
`

const StylePlayCircleFilledRoundedIcon = styled(PlayCircleFilledRoundedIcon)`
  color: ${({theme}) => theme.palette.secondary};
  
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${({disabled}) => disabled && `
    color: gray;
    
    :hover {
      transform: scale(1);
      cursor: default;
    }
  `}
`

const StylePauseCircleRoundedIcon = styled(PauseCircleRoundedIcon)`
  color: ${({theme}) => theme.palette.secondary};
  :hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${({disabled}) => disabled && `
    color: gray;
    
    :hover {
      transform: scale(1);
      cursor: default;
    }
  `}
`

const MoreDiv = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-bottom: 5px;
  cursor: pointer;
  position: relative;
  margin-right: 10px;
`

const CustomSelect = styled.div`
  position: absolute;
  left: -95px;
  top: -35px;
  border: 1px solid pink;
  width: 100px;
  border-radius: 10px;
  border: 2px solid ${({theme}) => theme.palette.secondary};
  background-color: ${({theme}) => theme.palette.dark};
  height: 75px;
  font-size: 14px;

  li {
    width: 100%;
  }

  li:hover {
    background-color: ${({theme}) => theme.palette.hover};
  }
`

const PlaylistTitle = styled.div`
  color: #fff;
  font-size: 45px;
  font-weight: bold;
  
  & p {
    color: ${({theme}) => theme.palette.alt};
    background-color: transparent;
    font-size: 50px;
    font-weight: 800;
    border: none;
    width: 100%;
    margin: 0;
    padding: 0;
    
    :focus {
      outline: none;
  }
`

const PlaylistUser = styled.div`
  justify-content: start;
  img {
    width: 30px;
    height: 30px;
    padding: 5px 0;
    border-radius: 50%;
    margin-right: 10px;
  }
`

const PrivateToggle = styled.div`
  font-weight: light;
  display: inline-block;
`

const SelectSection = styled.section`
  display: flex;
`;

const StyleFavoriteIcon = styled(FavoriteIcon)`
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 2rem;
  color: red;
  cursor: pointer;
  z-index: 1000;
`;

const StyleFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  position: absolute;
  right: 30px;
  top: 30px;
  font-size: 2rem;
  color: red;
  cursor: pointer;
  z-index: 1000;
`;

export default PlaylistDetail;
