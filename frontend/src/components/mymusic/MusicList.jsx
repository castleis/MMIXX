import { useState, useEffect, useRef } from "react";
import { getMusicList, getMusicListByCondition } from "api/mymusic";
import CustomTable from "./CustomTable";
import upIcon from "assets/up-arrow.png";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userInfo } from "atom/atom";
// import { _show_new } from "atom/mymusic";
import { _new } from "atom/mymusic";
import { throttle } from "lodash";

const MusicList = ({ filter, order, query, setSearchText, radio = false, checkMusic, checkBox = false, checkMusicList }) => {
  const atomUser = useRecoilValue(userInfo);
  const user = atomUser ? JSON.parse(localStorage.getItem("user")) : null;
  const reload = useRecoilValue(_new);

  // const setShowNew = useSetRecoilState(_show_new);

  // const [musicList, setMusicList] = useState([
  //   {
  //     musicSeq: 0,
  //     coverImage: null,
  //     mixed: null,
  //     edited: null,
  //     musicName: "곡 제목",
  //     musicianName: "수지",
  //     albumName: "앨범 이름",
  //     musicLength: 35000,
  //   },
  //   {
  //     musicSeq: 999999,
  //     coverImage: null,
  //     mixed: null,
  //     edited: null,
  //     musicName: "곡 제목9999",
  //     musicianName: "뉴진스",
  //     albumName: "앨범 이름9999",
  //     musicLength: 35000,
  //   },
  // ]);
  // const [isLoading, setIsLoading] = useState(false);
  const [musicList, setMusicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noticeNoList, setNoticeNoList] = useState("음악 목록이 없습니다.");

  const [scroll, setScroll] = useState(1);
  const [showUpIcon, setShowUpIcon] = useState(false);

  const page = useRef(1);
  const isLastPage = useRef(false);
  const hasCondition = useRef(false);

  const curQuery = useRef(null);
  const curFilter = useRef(null);
  const curOrder = useRef(null);

  const didMount1 = useRef(false);
  const didMount2 = useRef(false);
  const didMount3 = useRef(false);
  const didMount4 = useRef(false);

  // // 1. 첫 렌더링 시에만 음악 리스트를 가져온다.
  // useEffect(() => {
  //   getMusicList({ userSeq: user ? user.userSeq : 0, page: 1 })
  //     .then(({ data }) => {
  //       // console.log(data.content);
  //       setMusicList(data.content);
  //       isLastPage.current = data.last;
  //     })
  //     .then(() => setIsLoading(false));
  // }, [reload]);
  // // 2. 첫 렌더링을 제외하고, 페이징 된 음악 리스트를 가져온다. 조건 검색이 아니다.
  // useEffect(() => {
  //   if (didMount2.current) {
  //     if (hasCondition.current) return;

  //     // setShowNew(false);

  //     page.current += 1;
  //     getMusicList({
  //       userSeq: user ? user.userSeq : 0,
  //       page: page.current,
  //     }).then(({ data }) => {
  //       // console.log(data.content);
  //       setMusicList((currentArray) => [...currentArray, ...data.content]);
  //       isLastPage.current = data.last;
  //     });
  //   } else {
  //     didMount2.current = true;
  //   }
  // }, [scroll]);
  // 1. 첫 렌더링 시에만 음악 리스트를 가져온다.
  useEffect(() => {
    if (didMount1.current && hasCondition.current) return;

    page.current = 1;

    getMusicListByCondition({
      userSeq: user ? user.userSeq : 0,
      order: "date2",
    })
      .then(({ data }) => {
        // console.log(data.content);
        setMusicList(data.content);
        isLastPage.current = data.last;
      })
      .then(() => setIsLoading(false));

    didMount1.current = true;
  }, [reload]);
  // 2. 첫 렌더링을 제외하고, 페이징 된 음악 리스트를 가져온다. 조건 검색이 아니다.
  useEffect(() => {
    if (didMount2.current) {
      if (hasCondition.current) return;

      // setShowNew(false);

      page.current += 1;
      getMusicListByCondition({
        userSeq: user ? user.userSeq : 0,
        order: "date2",
        page: page.current,
      }).then(({ data }) => {
        // console.log(data.content);
        setMusicList((currentArray) => [...currentArray, ...data.content]);
        isLastPage.current = data.last;
      });
    } else {
      didMount2.current = true;
    }
  }, [scroll]);
  // 3. 첫 렌더링을 제외하고, 조건을 검색하면 페이징 된 음악 리스트를 가져온다.
  useEffect(() => {
    if (didMount3.current) {
      // console.log(`query: ${query}, filter: ${filter}, order: ${order}`);

      if (setSearchText) setSearchText(query);
      // setShowNew(false);

      page.current = 1;
      hasCondition.current = true;
      curQuery.current = query;
      curFilter.current = filter;
      curOrder.current = order;

      getMusicListByCondition({
        userSeq: user ? user.userSeq : 0,
        filter: filter,
        order: order === "" ? "date2" : order,
        query: query,
      }).then(({ data }) => {
        setMusicList(data.content);
        isLastPage.current = data.last;
        if (data.content.length === 0) setNoticeNoList("검색 결과가 없습니다.");
      });
    } else {
      didMount3.current = true;
    }
  }, [query, filter, order]);
  // 4.
  useEffect(() => {
    if (didMount4.current) {
      if (!hasCondition.current) return;
      // console.log(`query: ${query}, filter: ${filter}, order: ${order}`);

      // setShowNew(false);

      page.current += 1;
      getMusicListByCondition({
        userSeq: user ? user.userSeq : 0,
        filter: curFilter.current,
        order: curOrder.current === "" ? "date2" : curOrder.current,
        query: curQuery.current,
        page: page.current,
      }).then(({ data }) => {
        setMusicList((currentArray) => [...currentArray, ...data.content]);
        isLastPage.current = data.last;
      });
    } else {
      didMount4.current = true;
    }
  }, [scroll]);
  // 스크롤 이벤트
  useEffect(() => {
    const onScroll = throttle(() => {
      // console.log("scroll...");
      // 기능 1. up-arrow icon 나타나기/사라지기
      if (window.scrollY > 100) {
        setShowUpIcon(true);
      } else {
        setShowUpIcon(false);
      }

      // 기능 2. 스크롤 내리면 다음 페이지 부르기
      if (isLastPage.current) {
        console.log("last page");
        return;
      }
      console.log("scroll2...");

      // (2)
      const { scrollHeight } = document.documentElement;
      const { scrollTop } = document.documentElement;
      const { clientHeight } = document.documentElement;

      // if (scrollTop >= scrollHeight - clientHeight) {
      if (scrollTop + 10 >= scrollHeight - clientHeight) {
        console.log("[new2] scroll down!");
        // page.current += 1;
        setScroll((current) => current + 1);
      }

      // // (4)
      // if (document.documentElement.scrollTop + window.innerHeight + 300 >= document.documentElement.scrollHeight) {
      //   console.log("[new4] scroll down...!!");
      //   // page.current += 1;
      //   // setScroll((current) => current + 1);
      // }

      // // (3)
      // const { scrollTop, offsetHeight } = document.documentElement;
      // if (window.innerHeight + scrollTop >= offsetHeight) {
      //   console.log("[new3] scroll down...!!");
      //   // page.current += 1;
      //   setScroll((current) => current + 1);
      // }

      // // (1)
      // if (
      //   window.scrollY + document.documentElement.clientHeight >
      //   document.documentElement.scrollHeight
      // ) {
      //   console.log("scroll down!");
      //   // page.current += 1;
      //   // setScroll((current) => current + 1);
      // }
    }, 200);

    window.addEventListener("scroll", onScroll);

    return () => {
      console.log("bye!");
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onClickUpIcon = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : musicList.length === 0 ? (
        <div>{noticeNoList}</div>
      ) : (
        <CustomTable musicList={musicList} radio={radio} checkMusic={checkMusic} checkBox={checkBox} checkMusicList={checkMusicList} isPlaylistUser={true}></CustomTable>
      )}
      <Button onClick={onClickUpIcon} visible={showUpIcon ? "visible" : "hidden"}>
        <img src={upIcon} width='55' alt=''></img>
      </Button>
    </div>
  );
};

const Loading = styled.div`
  font-family: "Heebo", sans-serif;
`;

const Button = styled.button`
  position: fixed;
  bottom: 120px;
  background-color: transparent;
  right: 21px;
  visibility: ${(props) => props.visible};
`;

export default MusicList;
