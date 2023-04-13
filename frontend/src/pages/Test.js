import { Wrapper } from 'components/Common';
import styled from 'styled-components'

import Remix from 'assets/music/NewJeans-Future Funk Remix.mp3';

const Test = () => {
  // setInterval(() => {
  //   console.log(audioElement.duration)
  //   console.log(audioElement.currentTime)
  // }, 1000)

  return (
    <Wrapper style={{ backgroundImage: "url('https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80')"}}>
      <button style={{ color: 'red'}}>
        {Remix}
      </button>
      <button>
        recoil 테스트용 
      </button>
      <TestDiv />
    </Wrapper>
  )
}

const TestDiv = styled.div`
  position: fixed;

  width: 300px;
  height: 300px;
  // border: 1px solid red;
  backdrop-filter: blur(10px);
`

export default Test;