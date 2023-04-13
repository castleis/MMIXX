import styled, { keyframes, css } from "styled-components";
import DefaultCoverImage from "assets/default-cover-image.jpg";
import Play from "./MusicPlayIcon";
import Mix from "./MusicMixIcon";
import Extract from "./MusicExtractIcon";
import Download from "./MusicDownloadIcon";
import UnCheck from "assets/check.png";
import Check from "assets/check-selected.png";
import More from "assets/more-vertical.png";
import { useRef, useEffect, useState } from "react";
import { usePlayControl } from "hooks/usePlayControl";

const CustomTable = ({
  musicList,
  playlistSeq = 0,
  // hasIcon = true,
  radio = false,
  checkMusic,
  checkBox = false,
  checkMusicList,
  isNew = false,
  isPlaylistUser = false
}) => {
  const musicSeq = useRef(null);
  const coverImage = useRef(null);
  const musicName = useRef(null);
  const musicianName = useRef(null);
  // const [musicSeqState, setMusicSeqState] = useState(-1);

  const checkedList = useRef([]);
  const [isOut, setIsOut] = useState(false);
  console.log('customtable', playlistSeq)
  const { createNowMusic, createNowPlaylist, setNow } = usePlayControl(playlistSeq);

  const onCheck = (event) => {
    if (radio) {
      musicSeq.current = event.target.attributes.getNamedItem("seq") === null ? null : event.target.attributes.getNamedItem("seq").value;
      coverImage.current = event.target.attributes.getNamedItem("cover") === null ? null : event.target.attributes.getNamedItem("cover").value;
      musicName.current = event.target.attributes.getNamedItem("title") === null ? null : event.target.attributes.getNamedItem("title").value;
      musicianName.current = event.target.attributes.getNamedItem("musician") === null ? null : event.target.attributes.getNamedItem("musician").value;

      // setMusicSeqState(musicSeq.current);

      // console.log(
      //   musicSeq.current,
      //   coverImage.current,
      //   musicName.current,
      //   musicianName.current
      // );

      checkMusic({
        musicSeq: Number(musicSeq.current),
        coverImage: coverImage.current,
        musicName: musicName.current,
        musicianName: musicianName.current,
      });
    } else if (checkBox) {
      // console.log(event.target.src);
      // console.log(UnCheck);
      // console.log(Check);

      if (event.target.src.includes("check-selected")) {
        event.target.setAttribute("src", UnCheck);
      } else {
        event.target.setAttribute("src", Check);
      }

      const newMusicSeq = event.target.attributes.getNamedItem("seq") === null ? null : event.target.attributes.getNamedItem("seq").value;

      const deletedIndex = checkedList.current.findIndex((item) => item.music_seq === newMusicSeq);

      if (deletedIndex === -1) {
        checkedList.current.push({
          music_seq: newMusicSeq,
          sequence: newMusicSeq,
        });
      } else {
        checkedList.current.splice(deletedIndex, 1);
      }
      checkMusicList(checkedList.current);
    }
  };

  const handlePlayClick = async (start) => {
    console.log(musicList) 
    
    const res = await createNowPlaylist(musicList, start);
    createNowMusic(res);
  };

  useEffect(() => {
    return () => { 
      if (isNew) setIsOut(true);
    };
  });

  return (
    <Table isNew={isNew} isOut={isOut}>
      <tbody>
        {musicList.map((music, index) => (
          <Tr key={index}>            
            {radio || checkBox ? (
              <Radio>
                <img
                  onClick={onCheck}
                  seq={music.musicSeq}
                  cover={music.coverImage}
                  title={music.musicName}
                  musician={music.musicianName}
                  src={Number(musicSeq.current) === music.musicSeq ? Check : UnCheck}
                  alt=''
                  width='23'
                />
              </Radio>
            ) : null}
            <TdRound width='5%' isNew={isNew}>
              <CoverImage coverImage={music.coverImage === null ? DefaultCoverImage : music.coverImage}></CoverImage>
            </TdRound>
            <Td weight='400' width='5%' align='center' isNew={isNew}>
              {music.mixed !== null ? "M" : music.inst !== null ? "Ⅰ" : null}
            </Td>
            {/* <Td width='27.5%'>{music.musicName.includes(".") ? music.musicName.substr(0, music.musicName.lastIndexOf(".")) : music.musicName}</Td>
            <Td width='15%'>{music.musicianName === null || music.musicianName.replace(/\s/g, "").length === 0 ? "-" : music.musicianName}</Td>
            <Td width='15%'>{music.albumName === null || music.albumName.replace(/\s/g, "").length === 0 ? "-" : music.albumName}</Td> */}
            <TdText width='27.5%' isNew={isNew}>
              {music.musicName.includes(".") ? music.musicName.substr(0, music.musicName.lastIndexOf(".")) : music.musicName}
            </TdText>
            <TdText width='15%' isNew={isNew} sx={{ width: "50px" }}>
              {music.musicianName === null || music.musicianName.replace(/\s/g, "").length === 0 ? "-" : music.musicianName}
            </TdText>
            <TdText width='15%' isNew={isNew}>
              {music.albumName === null || music.albumName.replace(/\s/g, "").length === 0 ? "-" : music.albumName}
            </TdText>
            <Td width='10%' isNew={isNew}>
              {Math.floor(music.musicLength / 1000 / 60)}:{String(Math.floor((music.musicLength / 1000) % 60)).padStart(2, "0")}
            </Td>
            {radio || checkBox ? (
              <Td width='10%' align='right' padding={true}>
                <img src={More} alt='' width='20' />
              </Td>
            ) : null}
            {!radio && !checkBox ? (
              <Td width='5%' isNew={isNew}>
                <Play onClick={() => handlePlayClick(index)} musicSeq={music.musicSeq}></Play>
              </Td>
            ) : null}
            {!radio && !checkBox && isPlaylistUser? (
              <Td width='5%' isNew={isNew}>
                <Mix
                  musicSeq={music.musicSeq}
                  musicName={music.musicName.includes(".") ? music.musicName.substr(0, music.musicName.lastIndexOf(".")) : music.musicName}
                  coverImage={music.coverImage}
                  musicianName={music.musicianName}
                ></Mix>
              </Td>
            ) : null}
            {!radio && !checkBox && isPlaylistUser? (
              <Td width='5%' isNew={isNew}>
                <Extract musicSeq={music.musicSeq}></Extract>
              </Td>
            ) : null}
            {!radio && !checkBox && isPlaylistUser ? (
              <Td width='5%' isNew={isNew}>
                <Download musicSeq={music.musicSeq} musicName={music.musicName} musicUrl={music.musicUrl}></Download>
              </Td>
            ) : null}
          </Tr>
        ))}
      </tbody>
    </Table>
  );
};

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const CoverImage = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8.5px;
  background-image: url(${({ coverImage }) => coverImage});
  background-size: cover;
  justify-content: start;
  align-items: end;
`;

const Table = styled.table`
  border-collapse: separate;
  border-spacing: 0 10px;

  width: 87%;
  font-size: 14px;
  font-weight: 400;

  ${({ isNew }) =>
    isNew &&
    css`
      animation: ${blink} 0.7s linear 2;
    `}
  ${({ isOut }) =>
    isOut &&
    css`
      animation: ${fadeOut} 0.25s linear forwards;
    `}
`;

const Tr = styled.tr`
  background-color: ${({ theme }) => theme.palette.darkgray};
  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }
  height: 65px;
`;

const Radio = styled.td`
  background-color: ${({ theme }) => theme.palette.darkAlt};
  width: 5%;
`;

const TdRound = styled.td`
  ${({ isNew, theme }) =>
    isNew &&
    `
  border-width: 2px 0px 2px 2px;
  border-style: solid;
  border-color: ${theme.palette.secondary};
  `}

  border-radius: 15px 0 0 15px;
  padding-left: 10px;
`;

const Td = styled.td`
  ${({ isNew, theme }) =>
    isNew &&
    `
  border-width: 2px 0px 2px 0px;
  border-style: solid;
  border-color: ${theme.palette.secondary};

  &:last-child {
    border-width: 2px 2px 2px 0px;
    border-style: solid;
    border-color: ${theme.palette.secondary};
  }
  `}

  font-size: 14px;
  font-weight: ${(props) => props.weight || "200"};
  // font-family: "Heebo", sans-serif;
  width: ${(props) => props.width || "auto"};
  text-align: ${(props) => props.align || "left"};
  ${(props) =>
    props.padding &&
    `padding-top: 5px;
    padding-right: 10px;`};

  // &:first-child {
  //   border-radius: 15px 0 0 15px;
  //   // margin-left: 10px;
  // }
  &:last-child {
    border-radius: 0 15px 15px 0;
  }
`;

const TdText = styled.td`
  ${({ isNew, theme }) =>
    isNew &&
    `
  border-width: 2px 0px 2px 0px;
  border-style: solid;
  border-color: ${theme.palette.secondary};
  `}

  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  font-weight: ${(props) => props.weight || "200"};
  // font-family: "Heebo", sans-serif;
  width: ${(props) => props.width || "auto"};
  text-align: ${(props) => props.align || "left"};
  ${(props) =>
    props.padding &&
    `padding-top: 5px;
  padding-right: 10px;`};

  &:nth-child(2) {
    color: red;
  }
`;

// const Table = styled.table`
//   // border-collapse: separate;
//   // border-spacing: 0 10px;
//   margin-top: 10px;
//   display: flex;
//   flex-direction: column;

//   width: 87%;
//   font-size: 14px;
//   font-weight: 400;

//   ${({ isNew }) =>
//     isNew &&
//     css`
//       animation: ${blink} 0.7s linear 2;
//     `}
//   ${({ isOut }) =>
//     isOut &&
//     css`
//       animation: ${fadeOut} 0.25s linear forwards;
//     `}
// `;

// const Tr = styled.tr`
//   background-color: ${({ theme }) => theme.palette.darkgray};
//   &:hover {
//     background-color: ${({ theme }) => theme.palette.hover};
//   }
//   height: 65px;

//   display: flex;
//   align-items: center;
//   margin-bottom: 10px;
// `;

// const Radio = styled.td`
//   background-color: ${({ theme }) => theme.palette.darkAlt};
//   width: 5%;
// `;

// const TdRound = styled.td`
//   ${({ isNew, theme }) =>
//     isNew &&
//     `
//   border-width: 2px 0px 2px 2px;
//   border-style: solid;
//   border-color: ${theme.palette.secondary};
//   `}

//   border-radius: 15px 0 0 15px;
//   padding-left: 10px;
// `;

// const Td = styled.td`
//   ${({ isNew, theme }) =>
//     isNew &&
//     `
//   border-width: 2px 0px 2px 0px;
//   border-style: solid;
//   border-color: ${theme.palette.secondary};

//   &:last-child {
//     border-width: 2px 2px 2px 0px;
//     border-style: solid;
//     border-color: ${theme.palette.secondary};
//   }
//   `}

//   font-size: 14px;
//   font-weight: ${(props) => props.weight || "200"};
//   font-family: "Heebo", sans-serif;
//   width: ${(props) => props.width || "auto"};
//   text-align: ${(props) => props.align || "left"};
//   ${(props) =>
//     props.padding &&
//     `padding-top: 5px;
//     padding-right: 10px;`};

//   // &:first-child {
//   //   border-radius: 15px 0 0 15px;
//   //   // margin-left: 10px;
//   // }
//   &:last-child {
//     border-radius: 0 15px 15px 0;
//   }

//   // position: relative;
//   // &::before {
//   //   content: "";
//   //   display: block;
//   //   position: absolute;
//   //   top: 0;
//   //   bottom: 0;
//   //   left: 0;
//   //   right: 0;
//   //   border-radius: 10px;
//   //   z-index: -1;
//   // }
// `;

// const TdText = styled.td`
//   ${({ isNew, theme }) =>
//     isNew &&
//     `
//   border-width: 2px 0px 2px 0px;
//   border-style: solid;
//   border-color: ${theme.palette.secondary};
//   `}

//   font-size: 14px;
//   font-weight: ${(props) => props.weight || "200"};
//   font-family: "Heebo", sans-serif;
//   width: ${(props) => props.width || "auto"};
//   text-align: ${(props) => props.align || "left"};
//   ${(props) =>
//     props.padding &&
//     `padding-top: 5px;
//   padding-right: 10px;`};

//   padding-right: 10px;

//   display: inline-block;
//   white-space: nowrap;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   vertical-align: middle;
// `;

export default CustomTable;
