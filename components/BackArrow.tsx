import Svg, { Path } from "react-native-svg";

type BackArrowProps = {
  size?: number;
  color?: string;
};

export const BackArrow = ({ size = 24, color = "white" }: BackArrowProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 5.5 9.5" fill="none">
      <Path
        d="M4.75 0.75L0.75 4.75L4.75 8.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
