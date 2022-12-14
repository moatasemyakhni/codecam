import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

const CameraIcon = () => (
  <Svg width={80} height={80} fill="none">
    <Rect width={77} height={77} x={1.5} y={1.5} fill="#21262d" rx={38.5} />
    <Path
      fill="#fff"
      d="m33.76 36.4 11.448-19.824A24.733 24.733 0 0 0 40 16c-5.76 0-11.04 2.04-15.168 5.4l8.784 15.24.144-.24zm29.136-3.6c-2.208-7.008-7.56-12.624-14.4-15.216L39.712 32.8h23.184zm.624 2.4H45.544l.696 1.2 11.424 19.8C61.6 51.928 64 46.264 64 40c0-1.656-.168-3.24-.48-4.8zM31.696 40l-9.36-16.2C18.424 28.072 16 33.736 16 40c0 1.656.168 3.24.48 4.8h17.976l-2.76-4.8zm-14.592 7.2c2.208 7.008 7.56 12.624 14.4 15.216L40.288 47.2H17.104zm27.048 0-9.36 16.224c1.68.36 3.408.576 5.208.576 5.76 0 11.04-2.04 15.168-5.4l-8.784-15.24-2.232 3.84z"
    />
    <Rect width={47} height={47} x={16.5} y={16.5} stroke="#fff" rx={23.5} />
    <Rect width={77} height={77} x={1.5} y={1.5} stroke="#000" rx={38.5} />
  </Svg>
)

export default CameraIcon
