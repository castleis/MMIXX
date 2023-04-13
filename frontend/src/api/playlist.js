import instance from './base'


// 임시 테스트용 (고양이 사진 API)
export const testApi = async () => {
  return await instance('https://jsonplaceholder.typicode.com/posts/1')
}  
// 회원 플레이리스트 가져오기
export const getPlaylists = async (userSeq) => {
  return await instance(`/playlist/user/${userSeq}`)
}
// 해당 플레이리스트 상세 페이지
export const getPlaylistDetail = async ( playlistSeq ) => {
  return await instance(`/playlist/${playlistSeq}`)
}
// 플레이리스트 정보 조회
export const getPlaylistInfo = async ( playlistSeq, userSeq ) => {
  return await instance(`/playlist/info/${playlistSeq}/${userSeq}`)
}
// 플레이리스트 생성
export const postPlaylist = async (userSeq, playlist) => {
  return await instance.post(`/playlist/${userSeq}`,  playlist )
}
// 즐겨찾기한 플레이리스트 목록 조회
export const favoritePlaylists = async (userSeq) => {
  return await instance(`/playlist/favorite/${userSeq}`)
}
// 글로벌 플레이리스트 목록 조회
export const globalPlaylists = async (userSeq) => {
  return await instance(`/playlist/global/${userSeq}`)
}
// 플레이리스트 대표 앨범커버 가져오기 (앨범아트가 없으면 default image 를 출력한다. (Error Code 404 처리 필요))
export const getPlaylistCoverImage = async ( playlistSeq ) => {
  return await instance(`/playlist/${playlistSeq}/1`)
}
// 해당 플레이리스트에 음악을 추가
export const insertMusicInPlaylist = async ( useSeq, playlistSeq, musicList ) => {
  return await instance.post(`/playlist/${useSeq}/${playlistSeq}`, musicList)
}
// 플레이리스트 삭제
export const deletePlaylist = async (playlistSeq) => {
  return await instance.delete(`/playlist/${playlistSeq}`)
}
// 플레이리스트 수정(플레이리스트 이름, 공개여부)
export const modifyPlaylist = async (playlistSeq, playlist) => {
  return await instance.put(`/playlist/detail/${playlistSeq}`,  playlist)
}
// 플레이리스트 즐겨찾기 등록
export const addFavoritePlaylist = async (favoritePlaylist) => {
  return await instance.post(`/playlist/favorite`, favoritePlaylist)
}
// 플레이리스트 즐겨찾기 삭제
export const deleteFavoritePlaylist = async (useSeq, playlistSeq) => {
  return await instance.delete(`/playlist/favorite/${useSeq}/${playlistSeq}`)
}
