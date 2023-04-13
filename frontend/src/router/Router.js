import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
  Template,
  Main, 
  Mix,
  MyMusic,
  Playlist, 
  PlaylistCreate,
  PlaylistSelectMusic,
  PlaylistDetail,
  PlaylistEdit,
  Login,
  LoginSuccess,
  NotFound, 
  Test,
  MixResult,
  MixSelectMusic,
} from 'pages'

const index = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route path="" element={<Main />} />
          <Route path="mix" element={<Mix />} />
          <Route path="mix/result" element={<MixResult />} />
          <Route path="mix/select" element={<MixSelectMusic />} />
          <Route path="mymusic" element={<MyMusic />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="playlist/create" element={<PlaylistCreate />} />
          <Route path="playlist/:playlistSeq" element={<PlaylistDetail />} />
          <Route path="playlist/edit/:playlistSeq" element={<PlaylistEdit />} />
          <Route path="playlist/select/:type" element={<PlaylistSelectMusic />} />
          <Route path="login" element={<Login />} />
          <Route path="login/success" element={<LoginSuccess />} />       
          <Route path="playlist/test" element={<Test />} />
          <Route path="playlist/global" element={<Playlist />} />
          <Route path="playlist/favorite" element={<Playlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default index;