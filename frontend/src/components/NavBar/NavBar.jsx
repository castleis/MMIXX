import { Avatar } from "@mui/material";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import AlbumIcon from "@mui/icons-material/Album";
import MusicNoteSharpIcon from "@mui/icons-material/MusicNoteSharp";
import PlaylistPlaySharpIcon from "@mui/icons-material/PlaylistPlaySharp";
import { useRecoilValue } from "recoil";

import { DefaultBtn, PlainBtn } from "components/Common";
// import logo from 'assets/logo.png'
import logoText from "assets/logo_text.png";
import arrow from "assets/arrow-down-sign-to-navigate.png";
import MusicCount from "components/mymusic/MusicCount";
import { isLogIn, userInfo } from "atom/atom";
import { handleLogout } from "api/base";
import PlaylistNavigate from "components/Playlist/PlaylistNavigate";

const NavBar = () => {
  const navigate = useNavigate();
  const atomIsLogin = useRecoilValue(isLogIn);
  const atomUser = useRecoilValue(userInfo);

  // console.log(atomTest)
  const isLogin = atomIsLogin
    ? // localStorage.getItem("isLogin") && localStorage.getItem("isLogin") == "true"
      true
    : false;

  const user = atomUser
    ? // localStorage.getItem("user")
      JSON.parse(localStorage.getItem("user"))
    : null;

  const onClickLogin = () => {
    // handleLogin().then((res) => console.log(res));
    // if (!isLogin) window.location.href = "http://localhost:5555/api/user/login";
    if (!isLogin) window.location.href = process.env.REACT_APP_BASE_URL + "/user/login";
    else {
      handleLogout().then(() => {
        localStorage.clear();
        // console.log("로그아웃");
        window.location.href = "/";
      });
    }
  };

  return (
    <Wrapper>
      <NavLogo onClick={() => navigate("/")}>
        {/* <LogoImage img={logo} alt="logo"/> */}
        <LogoText img={logoText} alt='logoText' />
      </NavLogo>
      {atomIsLogin ? (
        <>
          {/* <hr style={{ width: 50, marginBottom: '20px'}}/> */}
          <NavProfile>
            <NavAvatar src={user ? user.profileImageUrl : ""} sx={{ width: 80, height: 80 }} referrerPolicy='no-referrer' />
            <p>{user ? user.userName : "사람 이름"}</p>
            {/* <p>사람 이름</p> */}
          </NavProfile>
          {/* <hr style={{ width: 50, marginBottom: '20px'}}/> */}
          <NavMenu />
          {/* <NavList>
          {navList && navList.map((item, idx) => {
            return (
              <NavItem key={idx} to={item.path}>
                <NavBtn selected={'/' + item.path === location.pathname}>
                  {item.name}
                </NavBtn>
              </NavItem>
            )
          })}
        </NavList> */}
          <LogOut>
            <PlainBtn onClick={onClickLogin}>로그아웃</PlainBtn>
          </LogOut>
        </>
      ) : (
        <LoginWrapper>
          <DefaultBtn width='150px' onClick={onClickLogin}>
            로그인 하기
          </DefaultBtn>
        </LoginWrapper>
      )}
    </Wrapper>
  );
};

const NavMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navList = [
    // {name: 'MIX', path: 'mix', icon: <AlbumOutlinedIcon />},
    { name: "MIX", path: "mix", icon: <AlbumIcon fontSize='small' /> },
    { name: "PLAYLIST", path: "playlist", icon: <PlaylistPlaySharpIcon fontSize='small' /> },
    { name: "MY MUSIC", path: "mymusic", icon: <MusicNoteSharpIcon fontSize='small' /> },
  ];

  return (
    <NavUl>
      {navList &&
        navList.map((item, index) => {
          return (
            <section key={"NavLi" + index}>
              <NavLi onClick={() => navigate(item.path)} selected={location.pathname.includes("/" + item.path)}>
                {item.icon}
                <span>{item.name}</span>
                {item.name === "MY MUSIC" ? <Arrow src={arrow} selected={"/" + item.path === location.pathname} alt=''></Arrow> : null}
              </NavLi>
              {item.name === "PLAYLIST" && location.pathname.includes("/playlist") ? (
                <li>
                  <PlaylistNavigate />
                </li>
              ) : null}
            </section>
          );
        })}
      <div>{location.pathname === "/mymusic" ? <MusicCount /> : null}</div>
    </NavUl>
  );
};

const Wrapper = styled.nav`
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.dark};
  flex-direction: column;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: ${({ isLogin }) => !isLogin && "start"};
  // min-height: 100vh;
  @media (max-width: 768px) {
    display: none;
  }
  z-index: 10000;
`;

const NavLogo = styled.div`
  height: 50px;
  justify-content: space-evenly;
`;

// const LogoImage = styled.div`
//   background-image: url(${({img}) => img});
//   background-size: cover;
//   cursor: pointer;
//   height: 40px;
//   width: 40px;
// `

const LogoText = styled.div`
  background-image: url(${({ img }) => img});
  background-size: cover;
  cursor: pointer;
  height: 30px;
  width: 100px;
  margin-top: 10px;
`;

const NavProfile = styled.div`
  flex-direction: column;
  flex-grow: 0.7;
`;

const NavAvatar = styled(Avatar)`
  margin-bottom: 15px;
`;

// const NavList = styled.div`
//   flex-direction: column;
//   justify-content: start;
//   flex-grow: 4;
// `

// const NavItem = styled(Link)`
//   width: 100%;
//   text-align: center;
//   text-decoration: none;
// `

// const NavBtn = styled.button`
//   background-color: ${({ theme }) => theme.palette.dark};
//   color: ${({ theme }) => theme.palette.light};
//   padding: 10px 20px;
//   border: 1.3px solid ${({theme}) => theme.palette.secondary};
//   border-radius: 27px;
//   margin: 5px auto;
//   width: 90%;
//   font-weight: bold;
//   font-size: 14px;
//   height: 40px;
//   text-align: left;
//   font-family: 'Heebo', sans-serif;
//   display: flex;
//   align-items: center;

//   ${({ selected, theme }) =>
//     selected &&`
//       background-color: ${theme.palette.secondary};
//       color: ${theme.palette.dark};
//     `
//   };

//   &: hover {
//     background-color: ${({ theme }) => theme.palette.secondary};
//     color: ${({ theme }) => theme.palette.dark};
//   }
// `

const LogOut = styled.div``;

const LoginWrapper = styled.div`
  margin-top: 20px;
`;

const NavUl = styled.ul`
  list-style: url(${({ icon }) => icon});
  width: 180px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  flex-grow: 4;
`;

const NavLi = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 10px 17px;
  // justify-content: start;
  // display: inline-flex;
  // vertical-align: middle;
  text-align: left;
  cursor: pointer;
  border-radius: 25px;
  margin: 3px 0;
  animation: 1s ease-in-out 0s 1 normal forwards;

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary};
    color: ${({ theme }) => theme.palette.darkAlt};

    span {
      color: ${({ theme }) => theme.palette.darkAlt};
    }
  }

  ${({ selected, theme }) =>
    selected &&
    `
    background-color: ${theme.palette.secondary};
    color: ${theme.palette.dark};

    span {
      color: ${theme.palette.darkAlt};
    }
    `}

  span {
    margin-left: 10px;
  }
`;
const Arrow = styled.img`
  width: 12px;
  margin-left: auto;
  transition: all ease 0.4s;
  ${({ selected }) =>
    selected &&
    `
    transform: rotate(-180deg);
    `};
`;

export default NavBar;
