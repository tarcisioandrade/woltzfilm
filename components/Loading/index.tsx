import ReactLoading from "react-loading";

type Props = {
  type:
    | "balls"
    | "bars"
    | "bubbles"
    | "cubes"
    | "cylon"
    | "spin"
    | "spinningBubbles"
    | "spokes";
  color: string;
  width: string | number;
  height: string | number;
};
const Loading = ({ type, color, width, height }: Props) => {
  return (
    <ReactLoading type={type} color={color} height={width} width={height} />
  );
};

export default Loading;
