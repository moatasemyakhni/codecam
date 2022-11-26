import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"

const DeleteWithBorderIcon = () => (
  <Svg width={52} height={52} fill="none">
    <Path
      fill="#8293EE"
      d="M19 34.167a2.34 2.34 0 0 0 2.333 2.333h9.334A2.34 2.34 0 0 0 33 34.167v-14H19v14zm15.167-17.5h-4.084L28.917 15.5h-5.834l-1.166 1.167h-4.084V19h16.334v-2.333z"
    />
    <Rect width={51} height={51} x={0.5} y={0.5} stroke="#FCFCFC" rx={25.5} />
  </Svg>
)

export default DeleteWithBorderIcon
