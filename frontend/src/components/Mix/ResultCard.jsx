import React, { useEffect } from 'react';
import styled from 'styled-components'
import Box from '@mui/material/Box';
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import { useRecoilState, useRecoilValue } from 'recoil';
import { PlaySlider } from 'components/PlayBar';
import { _mix_now, _mixPlaying } from 'atom/music';
import theme from 'styles/theme.jsx';
import { usePlayControl } from 'hooks/usePlayControl';
// import cover from '../../assets/cover_image.jpg'

const ResultCard = (props) => {
  const musicUrl = props.musicUrl
  const musicName = props.musicName
  const musicianName = props.musicianName
  const coverImage = props.coverImage
  const isResult = props.isResult
  
  const [ mixPlay ] = useRecoilState(_mix_now)
  const [ mixPlaying ] = useRecoilState(_mixPlaying)
  const { handlePlay, handlePause } = usePlayControl()
  const [ isPlaying, setIsPlaying ] = React.useState(false)

   const handleMixPlay = () => {
    if (mixPlaying) {
      mixPlay.pause()
    } 
    mixPlay.src = props.musicUrl
    mixPlay.play()
    setIsPlaying(true)
   }

   const handleMixPause = () => {
    mixPlay.pause()
    setIsPlaying(false)
   }
  return (
      <Card isResult={isResult}>
        <CoverImage>
          {/* <img src={ cover } alt={ musicName } /> */}
          <img src={ coverImage } alt={ musicName } />
        </CoverImage>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Content>
            <div style={{ color: `${theme.palette.light}`, fontSize: '2.5vw', fontWeight: 'bold', justifyContent: 'flex-start' }}>
              { musicName }
            </div>
            <div style={{ color: `${theme.palette.light}`, fontSize: '1vw', fontWeight: 'normal', justifyContent: 'flex-start' }}>
              { musicianName }
            </div>
          </Content>
        </Box>
        <MusicPlayer>
          {!isPlaying ? 
            <PlayCircleFilledRoundedIcon style={{ width: '8vh', height: '8vh' }} onClick={handleMixPlay} />
          :
            <PauseCircleRoundedIcon style={{ width: '8vh', height: '8vh' }} onClick={handleMixPause} />
          }
        </MusicPlayer>
      </Card>
  )
}

export default ResultCard

const Card = styled.div`
  display: flex;
  // flex-direction: row;
  flex-direction: column;
  border: 5px solid ${props => (props.isResult ? theme.palette.secondary : theme.palette.light)};
  background-color: ${theme.palette.darkgray};
  border-radius: 10px;
  width: 28vw;
  height: 70vh;
  padding: 1vw;
`
const Content = styled.div`
  display: flex;
  flex-direction: column; 
  padding: 1vw;
  align-items: center;
  pl: 1;
  pb: 1;
`
const CoverImage = styled.div`
  object-fit: cover;
  width: 17vw;
  height: 33vh;
  overflow: hidden;
  border-radius: 1vw;
  img {
    width: 100%;
    height: 100%;
  }
`
const MusicPlayer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  margin: 1px;
`