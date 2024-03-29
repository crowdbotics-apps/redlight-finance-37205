import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";

const SignOut: FC = () => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M21.7514 10.75L27 16L21.7514 21.25" stroke="#E22540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M13 16H26.9963" stroke="#E22540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M13 27H6C5.73478 27 5.48043 26.8946 5.29289 26.7071C5.10536 26.5196 5 26.2652 5 26V6C5 5.73478 5.10536 5.48043 5.29289 5.29289C5.48043 5.10536 5.73478 5 6 5H13" stroke="#E22540" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default SignOut