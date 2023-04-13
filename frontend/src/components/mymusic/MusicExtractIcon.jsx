import IconBtn from "./IconBtn";
import ExtractIcon from "assets/extract.png";
import { splitMusic } from "api/mymusic";
import CustomToast from "./CustomToast";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useSetRecoilState } from "recoil";
// import { _show_new, _new_music_list } from "atom/mymusic";
import { _new } from "atom/mymusic";
import { useLocation, useNavigate } from "react-router-dom";

const MusicExtractIcon = ({ musicSeq }) => {
  const [loading, setLoading] = useState(false);
  const [toastInfo, setToastInfo] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);

  // const setShowNew = useSetRecoilState(_show_new);
  // const setNewMusicList = useSetRecoilState(_new_music_list);
  const setReload = useSetRecoilState(_new);

  const location = useLocation();
  const navigate = useNavigate();

  const onClick = () => {
    console.log(musicSeq);

    setLoading(true);
    setToastInfo(true);

    // setShowNew(false);

    splitMusic(musicSeq)
      .then((response) => {
        console.log(response);
        // setNewMusicList([response.data]);
        // setShowNew(true);

        // setToastSuccess(true);

        if (location.pathname.includes("/playlist")) {
          navigate("/mymusic", {
            state: {
              success: true,
            },
          });
        } else {
          setToastSuccess(true);
          setReload((current) => !current);
          // window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((error) => {
        // console.log(error);
        setToastError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {!loading ? <IconBtn onClick={onClick} icon={ExtractIcon} iconName='Inst.' fontSize='15px'></IconBtn> : <CircularProgress size='1.8rem' sx={{ color: "rgb(209, 211, 212)" }} />}

      {toastInfo ? <CustomToast res='info' text='보컬 제거 중...' toggle={setToastInfo} time={10000} /> : null}
      {toastSuccess ? <CustomToast res='success' text='보컬 제거 성공' toggle={setToastSuccess} /> : null}
      {toastError ? <CustomToast res='error' text='보컬 제거 실패' toggle={setToastError} /> : null}
    </div>
  );
};

export default MusicExtractIcon;
