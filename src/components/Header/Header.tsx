import React,{FC} from 'react'
import {View,Text,ImageBackground,TouchableOpacity} from 'react-native'
import styles from './styles'
import { HeaderProps } from './HeaderProps'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'

const Header : FC<HeaderProps>  = props =>{
    const {onPress} = props;
    return (
        <View style={styles.container}>
            <ImageBackground source={Images.Header} resizeMode="cover" style = {styles.image}>
                <View style={styles.wrapper}>
                    <TouchableOpacity 
                        style={styles.touchable} 
                        onPress = {()=>onPress()}
                    >
                        <Icons.BackArrow/>
                    </TouchableOpacity>
                    <Text style={styles.title}>Pandoras Vault</Text>
                </View>
            </ImageBackground>
        </View>
    )
}

export default Header

