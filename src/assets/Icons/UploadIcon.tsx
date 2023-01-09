import React,{FC} from 'react'
import Svg, {Path,Rect,G,ClipPath,Defs} from "react-native-svg"

const UploadIcon : FC = () =>{
    return (
        <Svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path d="M7.72656 7.3662L11.5 3.59375L15.2734 7.3662" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M11.5 13.6563V3.59644" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <Path d="M19.4062 13.6562V18.6875C19.4062 18.8781 19.3305 19.0609 19.1957 19.1957C19.0609 19.3305 18.8781 19.4062 18.6875 19.4062H4.3125C4.12188 19.4062 3.93906 19.3305 3.80427 19.1957C3.66948 19.0609 3.59375 18.8781 3.59375 18.6875V13.6562" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>   
    )
}

export default UploadIcon



