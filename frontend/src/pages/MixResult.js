import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import styled from "styled-components";

import { Wrapper, Header, DefaultBtn } from "components/Common";
import { ResultCard } from "components/Mix";
import theme from "styles/theme";

import { musicMix } from "api/mix";

const MixResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState('')
  const musicSeq = location.state && location.state.musicSeq;
  const presetSeq = location.state && location.state.presetSeq;
  const presetName = location.state && location.state.presetName;
  
  useEffect(() => {
    // console.log('Mix Result : ', musicSeq, presetSeq)
    musicMix({music_seq: musicSeq, preset_seq: presetSeq}).then(
      response => setResult(response.data)
    ).catch( error => console.log(error))
  }, [musicSeq, presetSeq])

  return (
    <ResultWrapper>
      <Header 
        title="MIX Result"
        desc="음악 믹스 결과"  
        />
      { !result && (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0px' }}>
        <InProgress>
          <CircularProgress 
            style={{ alignItems: 'center', justifyContent: 'center', padding: '2vh',  width: '10vh', height: '10vh', color: theme.palette.secondary }}
            />
          <p>음악을 변환하고 있습니다. 잠시만 기다려주세요.</p>
        </InProgress>
        </div>
      )}
      { result && (
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '0px' }}>
          {/* <h2 style={{ padding: '1vh' }}>"아무노래"를 {presetName}로 변환한 결과입니다.</h2> */}
          <h2 style={{ padding: '1vh' }}>{result.origin_music.musicName}을 {presetName}로 변환한 결과입니다.</h2>
          <ContentWrapper>
            <Mixed>
              <ResultCard 
                musicUrl={result.mixed_music.musicUrl}
                musicName={result.mixed_music.musicName}
                musicianName={result.mixed_music.musicianName}
                coverImage={result.mixed_music.coverImage}
                // musicUrl='아무노래url'
                // musicName='아무노래_mix'
                // musicianName='지아콬'
                // coverImage='아무이미지'
                isResult={true}
                >
              </ResultCard>
            </Mixed>
          </ContentWrapper>
          <DefaultBtn
            style={{ margin: "2vh" }}
            onClick={ () => navigate('/mymusic') }
          >확인</DefaultBtn>
        </div>
      )}
    </ResultWrapper>
  )
}

export default MixResult

const ResultWrapper = styled(Wrapper)`
  background: linear-gradient(
    135deg, 
    ${theme.palette.dark} 45%, 
    ${theme.palette.light} 100%);
`
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 75vw;
  height: 70vh;
`
const Mixed = styled(ContentWrapper)`
  align-items: center;
  justify-content: center;
`
const InProgress = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 75vh;
  align-items: center;
  justify-content: center;
`