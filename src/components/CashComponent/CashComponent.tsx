import React,{FC} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { Fonts } from '../../assets/fonts'
import { Colors } from '../../theme/Colors'

const CashComponent : FC = () =>{
    return (
     <View style={styles.container}>
        <TouchableOpacity style={styles.btn}>
                <Text style={styles.btnText}>Match move</Text>
        </TouchableOpacity>
        <Text style={styles.text}>Match move</Text>
      </View>
    )
}

export default CashComponent

const styles = StyleSheet.create({
    container : {
        marginHorizontal : 8
    },
    btn : {
        width  : 80,
        alignItems: "center",
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical : 20,
        borderColor : Colors.Gray78,
        borderRadius : 10
    },
    btnText : {
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