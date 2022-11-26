import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

const CheckIcon = () => (
  <Svg width={52} height={52} fill="none">
    <Path
      fill="#8293EE"
      stroke="#000"
      d="m19.28 33.589.343.32.341-.32 20.73-19.404 2.075 1.944-23.146 21.686-10.39-9.735 2.091-1.946 7.957 7.455z"
    />
    <Rect width={51} height={51} x={0.5} y={0.5} stroke="#FCFCFC" rx={25.5} />
  </Svg>
)

export default CheckIcon
