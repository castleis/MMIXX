import React, { useEffect } from 'react';
import styled, { css } from 'styled-components'
import AOS from "aos";
import "aos/dist/aos.css";

import Main1 from 'assets/main1.jpg'
import { Wrapper, DefaultBtn } from 'components/Common';

const Main = () => {

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <StyleWrapper>
      <First url={Main1} data-aos="fade-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        <p>
          <span>M</span>USIC<br />
          <span>MIX</span>ING FOR<br />
          WHOLE NEW E<span>X</span>PERIENCE<br />
        </p>
        {/* <p style={{ fontSize: '2rem'}}>
          음악을 듣기만 하는 것이 지루해지셨나요?
          MMIXX 는 딥러닝 기반의 음악 믹싱 웹어플리케이션입니다.
          곡의 분위기를 변화시킬 수 있는 Music Style Transfer 기능과,
          연주음(MR) 과 보컬을 분리할 수 있는 Sound Source Separation 기능을 활용해 자신만의 플레이리스트를 만들고 공유해보세요!
        </p> */}
      </First>
      <First data-aos="fade-up-right" data-aos-duration="1000" data-aos-anchor-placement="top-center">
        음악을 듣기만 하는 것이 지루해지셨나요? <br />
        {/* 임시텍스트 두 번째 줄<br /> */}
      </First>
      <First data-aos="fade-up-left" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        MMIXX 는 딥러닝 기반<br />
        음악 믹싱 웹어플리케이션입니다 <br />
        {/* 임시텍스트 두 번째 줄<br /> */}
      </First>
      {/* <First data-aos="fade-up-left" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        곡의 분위기를 변화시킬 수 있는 Music Style Transfer 기능과 <br />
        연주음(MR) 과 보컬을 분리할 수 있는 Sound Source Separation 기능을 활용해 <br />
        자신만의 플레이리스트를 만들고 공유해보세요! <br />
      </First> */}
      {/* <First data-aos="slide-up" data-aos-duration="1000" data-aos-anchor-placement="bottom-bottom">
        임시 텍스트 <br />
        임시텍스트 두 번째 줄<br />
      </First> */}
      <First>
        <DefaultBtn width="150px" 
          data-aos="zoom-in-up" 
          data-aos-duration="1000" 
          data-aos-anchor-placement="bottom-bottom">
            시작해보기
        </DefaultBtn>
      </First>
    </StyleWrapper>
  );
};

const StyleWrapper = styled(Wrapper)`
  font-family: 'Pretendard-Regular';
  flex-direction: column;
  height: calc(${({ children }) => {
    const childCount = React.Children.count(children);
    // 모든 자식 요소의 높이를 합산한 값에 60px를 더한 결과를 반환합니다.
    return `100% / ${childCount} * ${childCount} + 60px`;
  }});

  > div {
    height: 80vh;
    cursor: default;
  }

  > div:first-child {
    font-size: 5rem;
    letter-spacing: -0.05em;
    line-height: 5rem;
    flex-direction: column;
  //   margin-top: 50px;
  //   ${({theme, url}) => css`
  //   background-image: linear-gradient(to bottom left, rgba(0, 0, 0, 0.5), ${theme.palette.darkAlt} 70%), url(${url});
  //   background-size: cover;
  // `}
    span {
      color: ${({theme}) => theme.palette.secondary}
    }
  }

  > div:nth-child(4) {
    
    font-size: 2rem;
  }

  > div:last-child {
    height: 500px;
  }
`

const First = styled.div`
  font-size: 3rem;
  font-weight: 900;
  text-align: center;
`


export default Main;