import { atom } from "recoil";

import newJeansImage from "assets/cover_image.jpg"
import localStorageEffect from './_local'

export const isLogIn = atom({
  key: 'isLogIn',
  default: false,//localStorage.getItem('isLogin')==true ? true : false,
  effects: [
    localStorageEffect('isLogin')
  ]
})

export const userInfo = atom({
  key: 'userInfo',
  default: [], //localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  effects: [
    localStorageEffect('user')
  ]
})
