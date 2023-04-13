import instance from './base'

export const musicMix = async ( data ) => {
  return await instance.post('/music/mix', data
  )
}