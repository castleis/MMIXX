import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
  }
  p,
  div,
  span, 
  ul, 
  li,
  button { 
    font-family: 'Noto Sans KR', sans-serif;
    // font-family: 'Heebo', sans-serif;
    // font-family: 'Pretendard-Regular';
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.palette.light }
  }
  nav,
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  ul {
    list-style: none;
    cursor: pointer;
  }
  button {
    cursor: pointer;
    border: none;
  }
`

export default GlobalStyle;