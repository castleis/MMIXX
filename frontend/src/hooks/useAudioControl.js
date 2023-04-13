import { useEffect } from 'react'
import { useRecoilState } from "recoil"

import { audioState } from "atom/music"

export const useAudioControl = () => {
  const [audio, setAudio] = useRecoilState(audioState)

  useEffect(() => {
    // audioElement.u
  }, [])
  return { audio, setAudio }
}