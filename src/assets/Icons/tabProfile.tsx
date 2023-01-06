import React,{FC} from 'react'
import Svg, {Path,Rect} from "react-native-svg"

const tabProfile : FC = () =>{
    return (
        <Svg width="51" height="51" viewBox="0 0 51 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Rect width="51" height="51" rx="15" fill="#201D1E"/>
            <Path d="M25.5 37.875C32.3345 37.875 37.875 32.3345 37.875 25.5C37.875 18.6655 32.3345 13.125 25.5 13.125C18.6655 13.125 13.125 18.6655 13.125 25.5C13.125 32.3345 18.6655 37.875 25.5 37.875Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
            <Path d="M25.5 29.625C28.3477 29.625 30.6562 27.3165 30.6562 24.4688C30.6562 21.621 28.3477 19.3125 25.5 19.3125C22.6523 19.3125 20.3438 21.621 20.3438 24.4688C20.3438 27.3165 22.6523 29.625 25.5 29.625Z" stroke="white" stroke-width="2" stroke-miterlimit="10"/>
            <Path d="M17.2241 34.7006C18.0009 33.1733 19.1852 31.8908 20.6458 30.995C22.1065 30.0992 23.7865 29.625 25.5 29.625C27.2135 29.625 28.8935 30.0991 30.3542 30.9949C31.8148 31.8907 32.9991 33.1733 33.7759 34.7005" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
        
    )
}

export default tabProfile