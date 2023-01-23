import React,{FC} from 'react'
import Svg, {Path,Rect} from "react-native-svg"

const tabViewTransaction : FC = () =>{
    return (
        <Svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M24.75 18.5625L28.875 22.6875L24.75 26.8125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M4.125 22.6875H28.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M8.25 14.4375L4.125 10.3125L8.25 6.1875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M28.875 10.3125H4.12501" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg> 
    )
}

export default tabViewTransaction
