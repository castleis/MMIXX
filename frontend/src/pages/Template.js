import { NavBar } from 'components/NavBar'
import { PlayBar } from 'components/PlayBar'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const Template = () => {
  return (
    <Wrapper>
      <StyledNavBar />
      <Outlet />
      <TestDiv />
      {/* <PlayBar /> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  // display: flex;
`

const StyledNavBar = styled(NavBar)`
  @media screen and (max-width: 1000px) {
    display: none;
  }
`

const TestDiv = styled(PlayBar)`
  position: fixed;
  bottom: 0;
  left: 200px;
  width: 100%;
  height: 100px;
  border: 1px solid red;
  backdrop-filter: blur(10px);
`
export default Template;