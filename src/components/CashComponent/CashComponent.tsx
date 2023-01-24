import React,{FC} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,GestureResponderEvent} from 'react-native'
import { Fonts } from '../../assets/fonts'
import { Colors } from '../../theme/Colors'

type CashComponentProps  = {
    onPress :  ((event: GestureResponderEvent) => void) | undefined
}

const CashComponent : FC<CashComponentProps> = props =>{
    const {onPress} = props
    return (
     <TouchableOpacity 
        style={styles.container}
        onPress = {onPress}
    >
        <View style={styles.img}>
            <Text style={styles.imgText}>Match move</Text>
        </View>
        <Text style={styles.text}>Match move</Text>
      </TouchableOpacity>
    )
}

export default CashComponent

const styles = StyleSheet.create({
    container : {
        marginHorizontal : 8
    },
    img : {
        width  : 80,
        alignItems: "center",
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical : 20,
        borderColor : Colors.Gray78,
        borderRadius : 10
    },
    imgText : {
        textAlign  : 'center'
    },
    text : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 13,
        lineHeight : 18,
        color : Colors.white,
        marginTop : 10
    }
})