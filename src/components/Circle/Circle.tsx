import React,{FC} from 'react'
import {View,Image} from 'react-native'
import FastImage from 'react-native-fast-image'
import styles from './styles'
import { CircleProps } from './CircleProps'

const Circle :FC<CircleProps> = props =>{
    const {sourceImage,CircleStyle}  = props
    return(
        <View style={[styles.container,CircleStyle]}>
            <Image source={sourceImage} style={styles.img} resizeMode = "contain"/>
            {/* <FastImage
                style={styles.img}
                source={sourceImage}
                resizeMode={FastImage.resizeMode.contain}
            /> */}
        </View>
    )
}

export default Circle


