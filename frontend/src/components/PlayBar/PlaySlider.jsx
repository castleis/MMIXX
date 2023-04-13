import styled, { useTheme } from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import Slider from '@mui/material/Slider';
import { usePlayControl } from 'hooks/usePlayControl';

const PlaySlider = () => {
  const theme = useTheme()
  const { audioElement, isPlaying, nowMusic } = usePlayControl()
  const [ position, setPosition ] = useState(0)
  const [ duration, setDuration ] = useState(0)
  const [ startTime, setStartTime ] = useState('0:00')
  const [ endTime, setEndTime ] = useState('-:--')
  const sliderRef = useRef(null)

  useEffect(() => {
  }, [sliderRef])

  const formatDuration = (value) => {
    const minute = Math.floor(value / 60)
    const secondLeft = value - minute * 60
    return `${minute} : ${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`
  }

  audioElement.onloadedmetadata = function() {
    // duration in seconds
    const durationInSeconds = Math.floor(audioElement.duration);

    // calculate minutes and seconds
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    // format the display string
    const displayString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    setEndTime(displayString)
    setDuration(minutes * 60 + seconds)
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60)
                    .toString()
                    .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  setInterval(() => {
    if (isPlaying){
      const newCurrentTime = parseInt(audioElement.currentTime)
      if (position !== newCurrentTime) {
        setPosition(newCurrentTime)
      }
    }
    setStartTime(formatTime(audioElement.currentTime))
  }, 1000)

  useEffect(() => {
    audioElement.src = nowMusic.musicUrl
  }, [])

  useEffect(() => {
  }, [position])

  return (
    <div style={{ position: 'relative'}}>
      {/* <Slider 
        value={position}
        min={0}
        step={1}
        max={duration}
        sx={{
          
        }}
      /> */}

      <Slider
        aria-label="time-indicator"
        size="small"
        ref={sliderRef}
        value={position}
        min={0}
        step={1}
        max={duration}
        sx={{
          // color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 8,
            height: 8,
            // transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
            '&:before': {
              boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible': {
              // boxShadow: `0px 0px 0px 8px ${
              //   theme.palette.mode === 'dark'
              //     ? 'rgb(255 255 255 / 16%)'
              //     : 'rgb(0 0 0 / 16%)'
              // }`,
            },
            // '&.Mui-active': {
            //   width: 20,
            //   height: 20,
            // },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <TimeInfo>
        <span>{startTime}</span>
        <span>{endTime}</span>
      </TimeInfo>
    </div>
  )
}

const TimeInfo = styled.div`
  position: absolute;
  // border: 1px solid pink;
  justify-content: space-between;
  top: 20px;

  span {
    font-size: 12px;
    font-weight: 300;
    color: gray;
  }
`

export default PlaySlider;