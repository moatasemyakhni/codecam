import * as React from "react"
import Svg, { Path, G } from "react-native-svg"

const NoCodeIcon = () => (
  <Svg width={180} height={180} fill="none">
    <Path
      stroke="#8293EE"
      d="M90 165c41.421 0 75-33.579 75-75s-33.579-75-75-75-75 33.579-75 75 33.579 75 75 75zM36.975 36.975l106.05 106.05"
    />
    <G stroke="#8293EE">
      <Path d="m115.893 115 37.5-25-37.5-25M65 65 27.5 90 65 115M76.549 143.505l21-104" />
    </G>
  </Svg>
)

export default NoCodeIcon
