import React,{FC} from 'react'
import Svg, {Path} from "react-native-svg"

const CrossIcon : FC = () =>{
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M25 7L7 25" stroke="#C7C7C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M25 25L7 7" stroke="#C7C7C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
    )
}

export default CrossIcon