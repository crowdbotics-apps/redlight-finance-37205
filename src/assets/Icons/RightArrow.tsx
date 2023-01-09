import React,{FC} from 'react'
import Svg, {Path} from "react-native-svg"

const RightArrow : FC = () =>{
    return (
        <Svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M1.5 1.75L7.75 8L1.5 14.25" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>      
    )
}

export default RightArrow