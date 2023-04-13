import styled, { keyframes, css } from "styled-components"
import { getPlaylistCoverImage, addFavoritePlaylist, deleteFavoritePlaylist } from "api/playlist"
import { useEffect, useRef, useState } from "react"
import FavoriteIcon from '@mui/icons-material/Favorite'; // 하트
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // 빈 하트
// import { InsightsOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'atom/atom';

const MiniPlaylistCard = ({ playlist, onClick }) => {
  const { playlistName } = playlist
  const [coverImage, setCoverImg] = useState('')
  const [isOverflowed, setIsOverflowed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const pRef = useRef(null)
  const location = useLocation();
  const atomUser = useRecoilValue(userInfo);
  const navigate = useNavigate();
  const [type, setType] = useState('');

  useEffect(() => {
    // console.log("****", location)
    if (location.pathname.includes('favorite')) {
      setIsFavorite(true)
      setType('favorite')
    } else {
      setIsFavorite(playlist.isFavorite)   
      if (location.pathname.includes('global')) setType('global')
      else setType('mine')
    }
    getPlaylistCoverImage(playlist.playlistSeq)
      .then(res => {
      // console.log(res);
      setCoverImg(res.data);
    })
  }, [playlist])

  useEffect(() => {
    if (pRef) {
      setIsOverflowed(parseInt(pRef.current.offsetWidth) > 250)
    }
  }, [pRef]);

  const heartClick = (e) => {
    // setIsFavorite(!isFavorite);
    e.stopPropagation(); // 이벤트 버블링 막기
    if (!isFavorite) {
      addFavoritePlaylist({
        userSeq: atomUser.userSeq,
        playlistSeq: playlist.playlistSeq
      }).then(res => {
        setIsFavorite(true);
      })
    } else {
      deleteFavoritePlaylist(atomUser.userSeq, playlist.playlistSeq).then(res => {
        setIsFavorite(false);
      })
    }

    // console.log(location.pathname)
    navigate(`${location.pathname}`);
  }

  return (
    <CardWrapper
      coverImage={coverImage} 
      onClick={onClick}
      isOverflowed={isOverflowed}
    >
      {isFavorite ?
        <StyledFavoriteIcon onClick={heartClick } />
        :
        <StyledFavoriteBorderIcon onClick={heartClick } />
      }
      <PlaylistTitle ref={pRef} className="title">
        {playlistName}
      </PlaylistTitle>
    </CardWrapper>
  )
}

const marquee = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
`

const CardWrapper = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 5px;
  background-size: cover;
  // justify-content: end;
  // align-items: end;
  cursor: pointer;
  background-image: url(${({ coverImage }) => coverImage});
  background-color: #000;/* 까만색(0,0,0) */
    opacity:0.8; /* 80% 불투명도 */
  overflow: hidden;
  position: relative;

  &:hover {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.4) 70%, rgba(0, 0, 0, 0.6) 90%),
      url(${({ coverImage }) => coverImage});
    transform: scale(1.1);
    transition: transform 0.3s ease-out;

    ${props => props.isOverflowed && css`
      p {
        animation: ${marquee} 5s linear infinite;
      }
    `}
  }
  `

  // 하트
const StyledFavoriteIcon = styled(FavoriteIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  color: red;
`
// 빈하트
const StyledFavoriteBorderIcon = styled(FavoriteBorderIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  color: red;
`

const PlaylistTitle = styled.p`
  align-self: end;
  padding: 5px;
  position: absolute;
  left: 15px;
  color: ${({theme}) => theme.palette.light};
  font-size: 24px;
  letter-spacing: -1px;
  font-style: italic;
  white-space: nowrap; // 텍스트 줄바꿈 방지
  // overflow: hidden; // 넘치는 부분을 숨김
  text-overflow: ellipsis;
  transform: translateY(100%);
  transition: transform 0.1s ease-out;

  ${CardWrapper}:hover & {
    transform: translateY(0);
  }
`

export default MiniPlaylistCard