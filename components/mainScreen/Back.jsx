import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Back = ({props,color}) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={30}
    fill="none"
    {...props}
  >
    <Path
      fill={color}
      d="m6.8 15 10.4 10.4c.489.489.733 1.111.733 1.867 0 .755-.244 1.378-.733 1.866-.489.49-1.111.734-1.867.734-.755 0-1.377-.245-1.866-.734L1.2 16.867C.667 16.333.4 15.71.4 15c0-.711.267-1.333.8-1.867L13.467.867c.489-.49 1.11-.734 1.866-.734s1.378.245 1.867.734c.489.489.733 1.11.733 1.866S17.69 4.111 17.2 4.6L6.8 15Z"
    />
  </Svg>
)
export default Back;
