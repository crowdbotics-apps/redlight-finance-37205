import React,{FC} from 'react'
import {View,Text, TouchableOpacity} from 'react-native'
import { CustomHeaderProps } from './CustomHeaderProps'
import styles from './styles'      

const CustomHeader : FC<CustomHeaderProps> = props=>{
    const {isIconVisible,Icon,name,headerStyle,onPress} = props
    return (
        <View style={[styles.container,headerStyle]}>
            {(isIconVisible && Icon ) && <TouchableOpacity onPress={onPress}>
                {Icon}
            </TouchableOpacity>}
            <Text style={[
                styles.headerText,
                {marginLeft : (isIconVisible && Icon) ? 0 : 20}]}
            >
                {name}
            </Text>
            <View style={styles.rightView}/>
        </View>
    )
}

export default CustomHeader