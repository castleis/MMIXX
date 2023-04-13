import styled from 'styled-components'
import { useEffect, useState } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { MiniPlaylistCard } from 'components/Playlist';
import { userInfo } from 'atom/atom';
import { getPlaylists, favoritePlaylists, globalPlaylists } from 'api/playlist';
import CustomToast from "components/mymusic/CustomToast";

const Playlist = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);
  const [playlistType, setType] = useState('');
  const mine = 'mine';
  const global = 'global';
  const favorite = 'favorite';
  const atomUser = useRecoilValue(userInfo);

  const { state } = useLocation();
  const [toastSuccess, setToastSuccess] = useState(state && state.success);

  useEffect(() => {
    // console.log(location)
    if (location.pathname.includes(global)) { // 글로벌 플레이리스트
      // console.log('global')
      globalPlaylists(atomUser.userSeq)
        .then((res) => {
          setData(res.data)
          setType(global)
          // console.log(res.data)
          // console.log(data)
        })
        .catch((err) => console.log(err))
      //   .then(
      //     res => {
      //       setData(res.data)
      //       return res.data
      //     }
      // ).then(_ => setType(global)).catch(err => console.log(err))
      
    } else if (location.pathname.includes(favorite)) { // 즐겨찾기한 플레이리스트
      favoritePlaylists(atomUser.userSeq)
        .then(
          res => {
            // console.log(res.data)
            setData(res.data)
            setType(favorite)
            return res.data
          }
      ).then(_ => setType(favorite)).catch(err => console.log(err))

    } else { // 내 플레이리스트
      getPlaylists(atomUser.userSeq)
        .then(
          res => {
            // console.log(res.data)
            setData(res.data)
            setType(mine)
            return res.data
          }
      ).then(_ => setType(mine)).catch(err => console.log(err))
    }
      
  }, [location.pathname]);


  return (
    <StyleWrapper>
      {playlistType === "mine" ? (
        <Header
          title="My Playlist"
          desc="내 플레이리스트"
        />
      ) : (
         playlistType === "global" ? (
          <Header
            title="Global Playlist"
            desc="글로벌 플레이리스트"
          />
        ) : (
          <Header
            title="Favorite Playlist"
            desc="즐겨찾기 플레이리스트"
          />    
      ))
      }
      {toastSuccess ? <CustomToast res='success' text={state.msg} toggle={setToastSuccess} width={state.width} /> : null}
      <Content>
        <Top>
          {playlistType === mine ? (
            <DefaultBtn
              onClick={() => navigate("/playlist/create")}
              width="150px">
              플레이리스트 추가
            </DefaultBtn>
          ) : (
              <> </>
          )}
        </Top>
        {/* {data?.length > 0 ?
          <CardWrapper>
            {data?.map((playlist, index) => {
              return (
                <MiniPlaylistCard
                  key={index}
                  index={index}
                  playlist={playlist}
                  onClick={() => navigate(`/playlist/${playlist.playlistSeq}`, {
                    state : {
                      playlistTitle: `${playlist.playlistName}`,
                      isPrivate: `${playlist.isPrivate}`,
                    } 
                    })}
                />
              )
            })}
          </CardWrapper>
          :
          <>
            테스트 중
          </>
        } */}
        {data != null && data.length > 0 ?
          <>
            <CardWrapper>
            
              {data.map((playlist, index) => {
                return (
                  <MiniPlaylistCard
                  key={index}
                  index={index}
                  playlist={playlist}              
                    onClick={() => navigate(`/playlist/${playlist.playlistSeq}`, {
                      state : {
                        playlistTitle: `${playlist.playlistName}`,
                        isPrivate: `${playlist.isPrivate}`,
                      } 
                      })}
                  />
                )
              })}

            </CardWrapper>
          </> 
          :
          <div>플레이리스트가 없습니다.</div>
        }
      </Content>
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  height: 100%;
`

const Content = styled.div`
  width: 1100px;
  flex-direction: column;
  margin-bottom: 100px;
`

const Top = styled.div`
  justify-content: end;
  margin-bottom: 10px;

  & > button:first-child {
    margin-right: 15px;
  }
`

const CardWrapper = styled.div`
  // border: 1px solid pink;
  margin-top: 15px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 25px; 
  justify-items: center;
  align-items: center;
`

export default Playlist;