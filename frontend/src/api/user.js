import instance from './base'

export const getUser = async ( userSeq ) => {
  return await instance({
    url: `/user/${userSeq}`
  })
}

export const removeUser = async ( userSeq ) => {
  return await instance.delete({
    url: `/user/${userSeq}`
  })
}

export const logoutUser = async ( ) => {
  return await instance.post({
    url: `/logout`
  })
}