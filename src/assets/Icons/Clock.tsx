import React, { FC } from "react";
import { Svg, Path } from "react-native-svg";

const Clock: FC = () => {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M16 10V16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M21.1962 19L16 16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M8.97913 12.4644H3.97913V7.46436" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M8.22183 23.7782C9.7602 25.3166 11.7202 26.3642 13.854 26.7886C15.9878 27.2131 18.1995 26.9952 20.2095 26.1627C22.2195 25.3301 23.9375 23.9202 25.1462 22.1113C26.3549 20.3023 27 18.1756 27 16C27 13.8244 26.3549 11.6977 25.1462 9.88873C23.9375 8.07979 22.2195 6.66989 20.2095 5.83733C18.1995 5.00477 15.9878 4.78693 13.854 5.21137C11.7202 5.6358 9.7602 6.68345 8.22183 8.22183L3.97919 12.4645" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </Svg>
    )
}

export default Clock