import IconBtn from "./IconBtn";
import PlayIcon from "assets/play.png";

const MusicPlayIcon = ({ onClick }) => {

  return <IconBtn onClick={onClick} icon={PlayIcon} iconName="PLAY"></IconBtn>;
};

export default MusicPlayIcon;
