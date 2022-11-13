import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HistoryIcon = () => (
  <Svg width={34} height={34} fill="none">
    <Path
      fill="#FCFCFC"
      d="M9.917 7.083h14.166v2.834h2.834V4.25a2.83 2.83 0 0 0-2.834-2.82L9.917 1.418A2.842 2.842 0 0 0 7.083 4.25v5.667h2.834V7.083zm11.914 16.42L28.333 17l-6.502-6.502-1.998 2.011L24.324 17l-4.49 4.49 1.997 2.013zm-7.664-2.012L9.676 17l4.49-4.49-1.997-2.012L5.667 17l6.502 6.503 1.998-2.012zm9.916 5.426H9.917v-2.834H7.083v5.667a2.842 2.842 0 0 0 2.834 2.833h14.166a2.842 2.842 0 0 0 2.834-2.833v-5.667h-2.834v2.834z"
    />
  </Svg>
)

export default HistoryIcon
