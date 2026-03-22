import Svg, { Circle, Path, Rect, Line } from "react-native-svg";

export const ClockIcon = ({
  opacity = 1,
  size = 24,
}: {
  opacity?: number;
  size?: number;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={opacity}
  >
    <Circle cx={12} cy={12} r={10} />
    <Path d="M12 6v6l4 2" />
  </Svg>
);

export const WalletIcon = ({
  opacity = 1,
  size = 24,
}: {
  opacity?: number;
  size?: number;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={opacity}
  >
    <Rect x={2} y={4} width={20} height={16} rx={2} />
    <Path d="M2 10h20" />
    <Circle cx={18} cy={15} r={1.5} />
  </Svg>
);

export const GlobeIcon = ({
  opacity = 1,
  size = 24,
}: {
  opacity?: number;
  size?: number;
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity={opacity}
  >
    <Circle cx={12} cy={12} r={10} />
    <Line x1={2} y1={12} x2={22} y2={12} />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Svg>
);
