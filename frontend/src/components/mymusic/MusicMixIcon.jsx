import IconBtn from "./IconBtn";
import MixIcon from "assets/mix.png";
import { useNavigate } from "react-router-dom";

const MusicMixIcon = ({ musicSeq, musicName, coverImage, musicianName }) => {
  const navigate = useNavigate();

  const onClick = () => {
    console.log(musicSeq, musicName, coverImage, musicianName);
    // navigate("/mix", {
    //   musicName: musicName,
    //   coverImage: coverImage,
    //   musicianName: musicianName,
    // });
    navigate("/mix", {
      state: {
        musicSeq: musicSeq,
        musicName: musicName,
        coverImage: coverImage,
        musicianName: musicianName,
      },
    });
  };

  return <IconBtn onClick={onClick} icon={MixIcon} iconName="MIX"></IconBtn>;
};

export default MusicMixIcon;
