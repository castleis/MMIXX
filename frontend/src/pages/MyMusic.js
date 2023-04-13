import { useState } from "react";
import { Wrapper, Header } from "components/Common";
import { MusicSearchBar, MusicUploadBtn, MusicList } from "components/mymusic";
import { CustomSelect } from "components/mymusic";
import { filterOptions, orderOptions } from "components/mymusic/options";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import CustomToast from "components/mymusic/CustomToast";

// import { useRecoilValue } from "recoil";
// import { _show_new, _new_music_list } from "atom/mymusic";

const MyMusic = () => {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("");
  const [searchText, setSearchText] = useState("");

  const { state } = useLocation();
  const [toastSuccess, setToastSuccess] = useState(state && state.success);

  // const [showNew, setShowNew] = useState(false);
  // const [newMusicList, setNewMusicList] = useState([]);
  // const showNew = useRecoilValue(_show_new);
  // const newMusicList = useRecoilValue(_new_music_list);

  // console.log("[new]", showNew, newMusicList);

  // // [Test] 곡 선택하기 (radio)
  // const [selectedMusic, setSelectedMusic] = useState({
  //   musicSeq: null,
  //   coverImage: null,
  //   musicName: null,
  //   musicianName: null,
  // });

  // // [Test] 곡 선택하기 (check box)
  // const [checkedList, setCheckedList] = useState([]);

  // useEffect(() => {
  //   localStorage.setItem("_showNew", showNew);
  // }, [showNew]);

  // useEffect(() => {
  //   localStorage.setItem("_newMusicList", newMusicList);
  // }, [newMusicList]);

  return (
    <Wrapper>
      {toastSuccess ? <CustomToast res='success' text='보컬 제거 성공' toggle={setToastSuccess} /> : null}
      <div>
        <Header title='My Music' desc='내 음악 들어보기' />
        <SearchBarSection>
          <MusicSearchBar setQuery={setQuery} searchText={searchText} setSearchText={setSearchText} />
        </SearchBarSection>
      </div>
      <Div>
        <section>
          <MusicUploadBtn />
        </section>
        <SelectSection>
          <CustomSelect options={filterOptions} selectKind='필터' setSelect={setFilter} />
          <CustomSelect options={orderOptions} selectKind='정렬' setSelect={setOrder} />
        </SelectSection>
      </Div>

      {/* {showNew ? <CustomTable musicList={newMusicList} isNew={true} /> : null} */}
      {/* <CustomTable
        musicList={[
          {
            musicSeq: 0,
            coverImage: null,
            mixed: null,
            edited: null,
            musicName: "곡 제목",
            musicianName: "수지",
            albumName: "앨범 이름",
            musicLength: 35000,
          },
          {
            musicSeq: 999999,
            coverImage: null,
            mixed: null,
            edited: null,
            musicName: "곡 제목9999",
            musicianName: "뉴진스",
            albumName: "앨범 이름9999",
            musicLength: 35000,
          },
        ]}
        isNew={true}
      /> */}

      <MusicList filter={filter} order={order} query={query} setSearchText={setSearchText} />

      {/* [Test] 곡 선택하기 (radio) */}
      {/* {selectedMusic.musicSeq}
      {selectedMusic.coverImage}
      {selectedMusic.musicName}
      {selectedMusic.musicianName}
      <MusicList radio={true} checkMusic={setSelectedMusic}></MusicList> */}

      {/* [Test] 여러 곡 선택하기 (check box) */}
      {/* <button onClick={() => console.log(checkedList)}>추가하기</button>
      <MusicList checkBox={true} checkMusicList={setCheckedList}></MusicList> */}
    </Wrapper>
  );
};

// const DivRight = styled.div`
//   justify-content: end;
//   margin-right: 15px;
//   // margin-bottom: 10px;
//   // & > button:first-child {
//   //   margin-right: 15px;
//   // }
// `;

const Div = styled.div`
  // border: 1px dotted green;
  justify-content: space-between;
  width: 87%;
  margin: 10px auto 20px auto;
`;

const SearchBarSection = styled.section`
  margin-top: 20px;
  margin-right: 83px;
  // border: 1px dotted green;
`;

const SelectSection = styled.section`
  display: flex;
`;

export default MyMusic;
