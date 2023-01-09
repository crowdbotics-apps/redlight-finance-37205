import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";

const Cross: FC = () => {
    return (
        <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M17.1875 4.8125L4.8125 17.1875" stroke="#C7C7C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M17.1875 17.1875L4.8125 4.8125" stroke="#C7C7C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}
export default Cross