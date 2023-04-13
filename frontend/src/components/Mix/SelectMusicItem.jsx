import styled from "styled-components";
import DefaultCoverImage from "assets/default-cover-image.jpg";
// import Play from "../mymusic/MusicPlayIcon";
// import Mix from "../mymusic/MusicMixIcon";
// import Extract from "../mymusic/MusicExtractIcon";
// import Download from "../mymusic/MusicDownloadIcon";
import Checkbox from "@mui/material/Checkbox";
import theme from "styles/theme";
import { useState, useEffect } from "react";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const SelectMusicItem = (props, {selectedMusicSeq}) => {
  // console.log('props : ',props.music["music"])
  // console.log('뮤직 시퀀스 : ', props.music["musicSeq"])
  const music = props.music['music']
  const musicSeq = props.music['musicSeq']
  const [isSelected, setIsSelected] = useState(true)

  useEffect(() => {
    // console.log(props.selNum)
    if (props.selNum === musicSeq) {
      setIsSelected(true)
      // console.log('선택된 음악', props.selNum)
    } else {
      setIsSelected(false)
      // console.log('선택되지 않은 프리셋', props.selNum)
    }
  }, [props.selNum])

  return (
    <div>

    <Checkbox 
      {...label} 
      onClick={() => props.selectedMusicSeq(musicSeq)} 
      // disabled={ isSelected ? true : false }
      checked={ isSelected ? true : false }
      sx={{
        color: theme.palette.light,
        '&.Mui-checked': {
          color: theme.palette.secondary,
        },
      }}
    />
    <MusicItem isSelected={isSelected}>
      <CoverImage>
        <img src={music.coverImage === null ? DefaultCoverImage : music.coverImage}/>
      </CoverImage>
      <MusicContent>
        <p>{music.musicName}</p>
        {/* <p style={{ color:`${theme.palette.light}` }}>{music.musicName.substr(0, music.musicName.lastIndexOf("."))}</p> */}
      </MusicContent>
      <MusicContent>
        <p>{music.musicianName}</p>
        {/* {music.musicianName === null ||
        music.musicianName.replace(/\s/g, "").length === 0
        ? "-"
      : music.musicianName} */}
      </MusicContent>
      <MusicContent>
        <p>{music.albumName}</p>
        {/* {music.albumName === null ||
        music.albumName.replace(/\s/g, "").length === 0
          ? "-"
        : music.albumName} */}
      </MusicContent>
      <MusicContent>
        {/* <p>{music.musicLength}</p> */}
        <p>{Math.floor(music.musicLength / 1000 / 60)}:
        {String(Math.floor((music.musicLength / 1000) % 60)).padStart(
          2,
          "0"
          )}</p>
      </MusicContent>
    </MusicItem>
    </div>
  )
}
export default SelectMusicItem

const MusicItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  background-color: ${theme.palette.hover};
  border: 3px solid ${props => (props.isSelected ? theme.palette.secondary : theme.palette.dark)};
  margin: 3px;
  margin-left: 3px;
  border-radius: 5px;
`
const CoverImage = styled.div`
  object-fit: cover;
  width: 12vw;
  height: 5vh;
  overflow: hidden;
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
  }
`;
const MusicContent = styled.div`
  align-items: center;
  color: ${theme.palette.light}
`
const Icons = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 3vw;
`