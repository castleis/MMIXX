import PlaySlider from './PlaySlider'
import styled from 'styled-components'
import { PlayIcons } from '.'

const PlayControl = ({ nowMusic }) => {
  const { isPlaying } = nowMusic 

  return (
    <Wrapper>
      <PlayIcons width="50%" isPlaying={isPlaying}/>
      <PlaySlider />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  flex-direction: column;
  width: 700px;
  padding: 0 20px;
`

export default PlayControl;