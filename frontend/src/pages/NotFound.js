import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const NotFound = () => {
  const navigate = useNavigate()

  setTimeout(() => {
    navigate(-1)
  }, 5000)
  
  return (
    <NotFoundDiv>
      <h2>PAGE NOT FOUND</h2>
    </NotFoundDiv>
  )
}

const NotFoundDiv = styled.div`
  width: 100vw;
  height 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: black;
`
export default NotFound;