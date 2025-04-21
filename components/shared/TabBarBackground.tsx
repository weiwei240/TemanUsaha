// components/TabBarBackground.tsx
import React from "react";
import Svg, { Path } from "react-native-svg";
import { View } from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const height = 60;
const circleRadius = 35;

const TabBarBackground = () => {
  const tabWidth = width;
  const curveWidth = circleRadius * 2 + 40;

  const left = (tabWidth - curveWidth) / 2;
  const right = left + curveWidth;

  return (
    <View style={{ position: "absolute", bottom: 0, backgroundColor: "red" }}>
      <Svg
        width={tabWidth}
        height={height + 30}
        viewBox={`0 0 ${tabWidth} ${height + 30}`}
      >
        <Path
          fill="green"
          d={`
            M0,0 
            H${left}
            C${left + 10},0 ${left + 15},30 ${left + 40},30
            A35,35 0 1,0 ${right - 40},30
            C${right - 15},30 ${right - 10},0 ${right},0
            H${tabWidth}
            V${height + 30}
            H0
            Z
          `}
        />
      </Svg>
    </View>
  );
};

export default TabBarBackground;
