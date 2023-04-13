import styled from "styled-components";
import { Carousel } from 'react-carousel3';
import { useNavigate, useLocation } from "react-router-dom";

import { Wrapper, Header } from "components/Common";
import { PresetCard } from "components/Mix";
import { MusicInfo } from "components/Mix";
import { useState, useEffect } from "react";
import { DefaultBtn } from "components/Common";

import { getPreset } from 'api/genre';
import { useRecoilValue } from "recoil";
import { _mix_now } from "atom/music";

const Mix = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const coverImage = location.state && location.state.coverImage;
  const musicName = location.state && location.state.musicName;
  const musicianName = location.state && location.state.musicianName;
  const musicSeq = location.state && location.state.musicSeq;
  const musicSelected = !location.state
  const [presetSeq, setPresetSeq] = useState('');
  const [presetData, setPresetData] = useState('');

  const mixAudio = useRecoilValue(_mix_now)

  const presetSeqFunc = (x) => {
    setPresetSeq(x)
    // console.log('선택한 프리셋 번호 : ',x)
    // console.log('선택한 프리셋 이름 : ', presetData[x-1].presetName)
  }

  useEffect(() => {
    getPreset()
    .then((res) => {
      setPresetData(res.data)
      return res
    })
    // .then(res => console.log('데이터 확인?',res.data[1]))
    .catch((err) => console.log(err))

    return () => {
      mixAudio.pause()
      mixAudio.src = ''
    }
  }, [])

  return (
    <StyledWrapper>
      <HeadContent>
        <Header 
          style={{ width: 500 }}
          title="MIX"
          desc="음악 믹스하기" 
          help="도움말"
          helpDesc={"믹스하기는 프리셋의 곡 분위기를 참조하여 음악의 스타일을 변환하는 기능입니다. 프리셋을 선택한 후 음악 스타일을 변환해보세요."}
          />
      </HeadContent>
      <Music>
        { !musicSelected ? (<MusicInfo
            // props 보내기
            coverImage={coverImage}
            musicName={musicName}
            musicianName={musicianName}
          > </MusicInfo>) : (<DefaultBtn
            onClick={ () => navigate('/mix/select') }>
            곡 선택</DefaultBtn>)}
      </Music>
      <p> 원하는 프리셋을 선택하세요. </p>
      <Carousel children={PresetCard} height={"40vh"} width={"60vw"} xOrigin={100} yOrigin={0} yRadius={0} autoPlay={false}>
        {/* 컴포넌트 반복 코드 */}
        {/* <div key={1} style={{width: 400, height: 250}}> */}
        {/* { presetData && presetData.map((preset) =>  {
          console.log('preset :' ,preset)
          return (
            <div onClick={() => setPresetSeq(preset.presetSeq)}>
              <PresetCard
                key={preset.presetSeq}
                presetSeqFunc={presetSeqFunc}
                presetNum={preset.presetSeq}
                presetName={preset.presetName}
                musicName={preset.musicName}
                musicLength={preset.musicLength}
                musicianName={preset.musicianName}
                albumName={preset.albumName}
                presetUrl={preset.presetUrl}
                converImage={preset.converImage}
                selNum = {presetSeq}
              ></PresetCard>
            </div>
              )
            })} */}
        {/* </div> */}
        <div key={2} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='편안한'
            presetNum={2}
            musicName="Raindrops falling on my head"
            musicLength='442862'
            musicianName="B.J.Thomas"
            albumName="Unknown"
            presetUrl="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/music/c6d7bfbc-299a-47f4-b458-90ede40fe322.wav"
            coverImage="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/images/raindrops.jpg"
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={3} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='밝은'
            presetNum={3}
            musicName="Pop"
            musicianName="나연"
            musicLength="404836"
            albumName="Unknown"
            presetUrl="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/music/pop.wav"
            coverImage="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/images/poppop.jpg"
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={4} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='강렬한'
            presetNum={4}
            musicName="Bass"
            musicLength="287629"
            musicianName="DJ Unknown"
            albumName="Unknown"
            presetUrl="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/music/bass_2.mp3"
            coverImage="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/images/bass+img.png"
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={5} style={presetStyle}>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='신나는'
            presetNum={5}
            musicName="DNA"
            musicLength="223179"
            musicianName="방탄소년단"
            albumName="LOVE YOURSELF 承 `Her`"
            presetUrl="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/music/%EB%B0%A9%ED%83%84%EC%86%8C%EB%85%84%EB%8B%A8-02-DNA.mp3"
            coverImage="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/images/65c4bac4-ecc3-4c9a-baa3-4361d7f245f1.jpg"
            selNum = {presetSeq}
          ></PresetCard>
        </div>
        <div key={6} style={presetStyle}>
          <PresetCard
            presetSeqFunc={presetSeqFunc}
            presetName='웅장한'
            presetNum={6}
            musicName="Iron Man 3"
            musicLength="143550"
            musicianName="Brian Tyler"
            albumName="아이언맨 3 OST"
            presetUrl="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/music/Brian_Tyler-01-Iron_Man_3.mp3"
            coverImage="https://bucket-mp3-file-for-mmixx.s3.ap-northeast-2.amazonaws.com/images/man.PNG"
            selNum = {presetSeq}
          ></PresetCard>
        </div>
      </Carousel>
      
      <ButtonStyle>
        <DefaultBtn 
          onClick={ () => 
            navigate('/mix/result', { state: { musicSeq:musicSeq, presetSeq:presetSeq, presetName:presetData[presetSeq-1].presetName } })
          }
        >변환하기</DefaultBtn>
      </ButtonStyle>
    </StyledWrapper>
  );
};

export default Mix;

const StyledWrapper = styled(Wrapper)`
  min-height: 700px;
`

const HeadContent = styled.div`
  display: flex;
  flex-direction: row;
`

const Music = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 1vh;
  padding-left: 5vw;
`
const presetStyle = {
  width: 400,
  height: 250,
  border: '5px',
  borderColor: 'white',
}

const ButtonStyle = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
  // margin-top: 5px;
  padding: 15vh;
  padding-right: 6vw;
`