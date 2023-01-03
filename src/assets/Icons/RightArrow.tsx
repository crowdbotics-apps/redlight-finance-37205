import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";

const RightArrow: FC = () => {
    return (
        <Svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M0.999999 1.5L8.5 9L1 16.5" stroke="#C7C7C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default RightArrow