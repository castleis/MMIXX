import { atom, selector } from 'recoil'

import localStorageEffect from './_local'

export const audioState = atom({
  key: 'audioState',
  default: new Audio(),
})

export const _mix_now = atom({
  key: '_mix_now',
  default: new Audio()
})

export const _nowMusic = atom({
  key: '_nowMusic',
  default: {
    coverImage: '',
    musicName: '',
    musicianName: '',
    playing: false,
    currentTime: 0,
    duration: 30000,
  },
  effects: [
    localStorageEffect('_nowMusic')
  ]
})

export const _isPlaying = atom({
  key: '_isPlaying',
  default: false
})

export const _mixPlaying = atom({
  key: '_mixPlaying',
  default: false
})

export const playlistQueue = atom({
  key: 'Queue',
  default: {},
  effects: [
    localStorageEffect('_queue')
  ]
})

export const volumeState = atom({
  key: 'volumeState',
  default: 1,
  effects: [
    localStorageEffect('_volume')
  ]
})

export const _onShuffle = atom({
  key: '_onShuffle',
  default: false,
  effects: [
    localStorageEffect('_onShuffle')
  ]
})

export const _nowSelector = selector({
  key: '_nowSelector',
  get: ({ get }) => {
    const getNow = get(playlistQueue)
    const nowMusic = getNow.filter((item) => item.playing)
    // const nowMusic = playlist.filter((item) => item.playing)
    // const { coverImage, musicName, musicianName, musicUrl } = nowMusic[0]
    
    return {
      getNow,
      nowMusic, 
      // coverImage,
      // musicName,
      // musicianName,
      // musicUrl
    }
  },
  set: ({ set }, newValue) => {
    set(playlistQueue, newValue)
    set(playlistQueue, newValue)
  },
  effects: [
    localStorageEffect('_test')
  ]
})