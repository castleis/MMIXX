import styled from "styled-components";
import { useState } from "react";
import { Popover, Typography } from '@mui/material';
import theme from "styles/theme";

const Header = ({ title, desc, help, helpDesc, fontSize }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  return (
    <Wrapper>
      <p>
        <Title fontSize={fontSize}>{title}</Title>
        <Desc>{desc}</Desc>
        { help && (<Help>
          <Help
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}
            >
          {help}</Help>
          <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            disableRestoreFocus
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            sx={{
              pointerEvents: 'none',
              color: theme.palette.dark,
              width: 500,
            }}
          >
            <Typography sx={{ p: 2, color: "black", fontSize: '14px' }}> {helpDesc} </Typography>
          </Popover>
          </Help>
          ) }
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;  
  justify-content: start;
  padding: 30px 40px 30px;
`
const Title = styled.span`
  font-weight: bold;
  font-size: ${({fontSize}) => fontSize ? fontSize : "24px"};
  color: ${({theme}) => theme.palette.secondary};
  letter-spacing: -1px;
  font-weight: bold;
  margin-right: 0.5rem;
`

const Desc = styled.span`
  position: relative;
  top: -1px;
  letter-spacing: -0.09rem;
  font-weight: 200;
`
const Help = styled.span`
  position: relative;
  top: -1px;
  letter-spacing: -0.09rem;
  font-weight: 200;
  margin-left: 0.5rem;
`

export default Header;