import instance from './base'

export const uploadMusic = async () => {
  return await instance.post('/music', {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export const uploadMetaData = async () => {
  return await instance.post('/music', {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}

export const downloadMetaData = async ( fileName ) => {
  return await instance(`/music/download/${fileName}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  })
}