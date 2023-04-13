import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.darkAlt};
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-left: 200px;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }

  >:last-child {
    margin-bottom: 150px;
  }
`
export default Wrapper;