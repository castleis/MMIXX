import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from "recoil"

import { _nowMusic, audioState, playlistQueue, _isPlaying, _onShuffle, _mix_now, _mixPlaying } from "atom/music"

export const usePlayControl = (playlistSeq) => {
  const audioElement = useRecoilValue(audioState)
  const [ nowMusic, setNow ] = useRecoilState(_nowMusic)
  const [ queue, setQueue ] = useRecoilState(playlistQueue)
  const [ isPlaying, setIsPlaying ] = useRecoilState(_isPlaying)
  const [ onShuffle, setOnShuffle ] = useRecoilState(_onShuffle)
  const mixAudio = useRecoilValue(_mix_now)
  const mixPlaying = useRecoilValue(_mixPlaying)

  const createNowMusic = async (props) => {
    if (props && props?.musicUrl) {
      localStorage.setItem("_nowMusic", JSON.stringify({
        ...props,
        currentTime: 0,
        duration: audioElement.duration
      }))
      setIsPlaying(true)
    }
    // console.log(newMusic)
    return props.musicUrl
  }

  const createNowPlaylist = async ( playlist, start = 0 ) => {
    audioElement.pause()

    const newPlaylist = await playlist.map((item, index) => {
      if (index === start) {
        const newItem = {...item, playing: true }
        // localStorage.setItem('_nowMusic', JSON.stringify(newItem))
        // setAudioElement(new Audio(item.musicUrl))
        setNow(newItem)
        return newItem
      } else {
        return { ...item, playing: false } 
      }
    })
    const newObj = {
      playlistSeq,
      playlist: newPlaylist,
    }
    localStorage.setItem('_queue', JSON.stringify(newObj))
    setQueue(newObj)
    audioElement.src = newPlaylist[start].musicUrl
    audioElement.currentTime = 0
    audioElement.load()
    audioElement.play()
    setIsPlaying(true)
    return newPlaylist[start]
  } 

  const playMusic = () => {
    audioElement.src = nowMusic.musicUrl
    audioElement.currentTime = nowMusic.currentTime
    audioElement.play()
  }

  const playPrev = async ( onShuffle = false ) => {
    const prevIndex = await queue.playlist.findIndex((item) => item.playing) - 1
    createNowMusic(queue.playlist[prevIndex])
    createNowPlaylist(queue.playlist, prevIndex)
  }

  /**
   * 다음 노래 재생하기 
   */
  const playNext = async ( onShuffle = false ) => {
    const nextIndex = await queue.playlist.findIndex((item) => item.playing) + 1
    createNowMusic(queue.playlist[nextIndex])
    createNowPlaylist(queue.playlist, nextIndex)
    if (!audioElement.paused) {
      audioElement.pause()
    }
    audioElement.play()
    console.log(nextIndex)
  }

  const handlePlay = () => {
    if (nowMusic.playing) {
      mixAudio.src = ''
      // audioElement.src = nowMusic.musicUrl
      // audioElement.currentTime = nowMusic.currentTime
      audioElement.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (isPlaying && !audioElement.paused){
      audioElement.pause()
      setIsPlaying(false)
      setNow({...nowMusic, currentTime: audioElement.currentTime})
    }
  }

  // const isNext = queue.playlist.findIndex((item) => item.playing) === queue.playlist.length
  //   ? false : true

  useEffect(() => {
    audioElement.addEventListener('ended', () => {

    })
    audioElement.addEventListener('playing', () => {
    })
    

  }, [audioElement, nowMusic])

  return { 
    audioElement, 
    isPlaying,
    setIsPlaying,
    nowMusic, 
    setNow,
    queue, 
    createNowPlaylist, 
    createNowMusic, 
    playMusic,
    playPrev,
    playNext,
    handlePlay,
    handlePause,
    onShuffle,
    setOnShuffle,
  }
}