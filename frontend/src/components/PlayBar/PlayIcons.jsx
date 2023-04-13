import { useState, useEffect } from 'react'
import styled, { useTheme } from 'styled-components'
import PlayCircleFilledRoundedIcon from '@mui/icons-material/PlayCircleFilledRounded';
import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
import ShuffleRoundedIcon from '@mui/icons-material/ShuffleRounded';
import RepeatOneRoundedIcon from '@mui/icons-material/RepeatOneRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

import { useAudioControl } from 'hooks/useAudioControl';
import { usePlayControl } from 'hooks/usePlayControl';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { playlistQueue } from 'atom/music';

const PlayControl = ({ width, height }) => {
  const theme = useTheme()
  const queue = useRecoilValue(playlistQueue)
  const { 
    isPlaying,
    playMusic, 
    audioElement, 
    handlePlay, 
    handlePause, 
    playPrev, 
    playNext,
    onShuffle,
    setOnShuffle,
    isNext,
  } = usePlayControl(queue?.playlistSeq)

  const handlePlayMusic = () => {

  }
  
  return (
    <IconWrapper width={width} height={height}>
      <ShuffleRoundedIcon 
        fontSize="small" 
        onClick={() => setOnShuffle((pre) => !pre)}
        style={{ color: onShuffle && theme.palette.secondary }}
        />
      <SkipPreviousRoundedIcon onClick={playPrev}/>
      {!isPlaying || audioElement.paused? 
        <StylePlayCircleFilledRoundedIcon 
          color="color"
          onClick={handlePlay}
        />
      :
        <PauseCircleRoundedIcon onClick={handlePause}/>
      }
      <SkipNextRoundedIcon onClick={playNext}/>
      {/* {isNext ?
        <SkipNextRoundedIcon onClick={playNext}/>
        :
        <SkipNextRoundedIcon sx={{ cursor: 'wait', color: 'gray'}}/>
      } */}
      <RepeatOneRoundedIcon />
    </IconWrapper>
  )
}

const IconWrapper = styled.div`
  width: ${({width}) => width ? width: 'auto'};
  height: ${({height}) => height ? height: 'auto'};
  // border: 1px solid red;
  justify-content: space-around;
  
  * {
    // border: 1px dotted pink;
    cursor: pointer;
  }

  > :nth-child(3) {
    // border: 1px dotted green;
    transition: all 0.1s ease-in-out;
    color: ${({color, theme}) => color === 'color' ? theme.palette.secondary : 'white'};
    font-size: 40px;

    &:hover {
      transform: scale(1.1);
      cursor: pointer;
    }

  }
`

const StylePlayCircleFilledRoundedIcon = styled(PlayCircleFilledRoundedIcon)`
  color: ${({color, theme}) => color ? theme.palette.secondary : 'red'};
  transition: all 0.1s ease-in-out;
`

export default PlayControl;