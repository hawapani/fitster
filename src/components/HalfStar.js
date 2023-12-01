import React from "react";
import Svg, { Path } from "react-native-svg";

const HalfStar = (props) => {
  return (
    <Svg width={24} height={22} viewBox="0 0 33 30" fill="none" {...props}>
      <Path
        d="M 16.5 0 l -4.849 9.826 l -10.843 1.575 l 7.846 7.648 l -1.852 10.8 l 9.698 -5.1 z"
        fill="#FFCC48"
      />
  </Svg>
  );
};

export default HalfStar;
