import React,{FC} from 'react'
import Svg, {Path,Rect} from "react-native-svg"

const tabViewTransactionSelected : FC = () =>{
    return (
        <Svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="51" height="51" rx="15" fill="#BC0016"/>
            <Path d="M33.75 27.5625L37.875 31.6875L33.75 35.8125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M13.125 31.6875H37.875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M17.25 23.4375L13.125 19.3125L17.25 15.1875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M37.875 19.3125H13.125" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
         
    )
}

export default tabViewTransactionSelected
