import * as React from 'react';
import { Box } from '@mui/material';
import styled from 'styled-components';
import theme from 'styles/theme';
import { useState } from 'react';

const MusicInfo = (props) => {
  const coverImg = props.coverImage
  const musicName = props.musicName
  const musicianName = props.musicianName
  const [hidden, setHidden] = useState(false)

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
      { !hidden && (<MiniCover
        onMouseEnter={ () => setHidden(true) }
        >
        <img src={coverImg} alt={musicName} />
      </MiniCover>)}

      { hidden && (
        <Card onMouseOut={ () => setHidden(false) }>
          <CoverImage>
            <img src={coverImg} alt={musicName} />
          </CoverImage>
          <Box style={{ display: 'grid' }}>
            <Box sx={{ color: `${theme.palette.dark}`, fontSize: 20, fontWeight: 'medium' }}>
              { musicName }
            </Box>
            <Box sx={{ color:`${theme.palette.dark}` }}>
              { musicianName }
            </Box>
          </Box>
        </Card>
      )}
    </div>
  );
}

export default MusicInfo

const Card = styled.div`
  display: flex;
  flex-direction: row;
  Width: 17vw;
  Height: 15vh;
  background-color: ${theme.palette.light};
  border-radius: 5px;
`

const CoverImage = styled.div`
  object-fit: cover;
  width: 13vw;
  height: 15vh;
  overflow: hidden;
  border-radius: 5px;

  img {
    width: 100%;
    height: 100%;
  }
`
const MiniCover = styled.div`
  object-fit: cover;
  width: 7vw;
  height: 15vh;
  overflow: hidden;
  border-radius: 70%;
  img {
    width: 100%;
    height: 100%;
  }
`