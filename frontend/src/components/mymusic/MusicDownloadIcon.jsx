import IconBtn from "./IconBtn";
import DownloadIcon from "assets/download.png";
import { downloadMusic } from "api/mymusic";
import CustomToast from "./CustomToast";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const MusicDownloadIcon = ({ musicSeq, musicName, musicUrl }) => {
  const [loading, setLoading] = useState(false);
  const [toastInfo, setToastInfo] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastSuccess, setToastSuccess] = useState(false);

  const onClick = () => {
    console.log(musicSeq, musicName, musicUrl);

    setLoading(true);
    setToastInfo(true);

    downloadMusic(musicSeq)
      .then((res) => {
        console.log(res);
        const blob = new Blob([res.data]);

        const fileUrl = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = fileUrl;
        link.style.display = "none";

        // const injectFilename = (res) => {
        //   const disposition = res.headers["content-disposition"];

        //   const fileName = decodeURI(
        //     disposition
        //       .match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/)[1]
        //       .replace(/['"]/g, "")
        //   );
        //   return fileName;
        // };
        // link.download = injectFilename(res);

        let title = musicName.includes(".") ? musicName.substr(0, musicName.lastIndexOf(".")) : musicName;
        let type = musicUrl.substring(musicUrl.lastIndexOf("."), musicUrl.length).toLowerCase();

        link.download = `${title}${type}`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setToastSuccess(true);
      })
      .catch((error) => {
        // console.log(error);
        setToastError(true);
      })
      .finally(() => {
        setLoading(false);
        // setToastInfo(false);
      });
  };

  return (
    <div>
      {!loading ? <IconBtn onClick={onClick} icon={DownloadIcon} iconName='DOWNLOAD' fontSize='11px' /> : <CircularProgress size='1.8rem' sx={{ color: "rgb(209, 211, 212)" }} />}

      {toastInfo ? <CustomToast res='info' text='다운로드 중...' toggle={setToastInfo} /> : null}
      {toastSuccess ? <CustomToast res='success' text='다운로드 성공' toggle={setToastSuccess} /> : null}
      {toastError ? <CustomToast res='error' text='다운로드 실패' toggle={setToastError} /> : null}
    </div>
  );
};

export default MusicDownloadIcon;
