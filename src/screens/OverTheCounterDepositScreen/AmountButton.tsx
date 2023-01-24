import React,{FC} from 'react'
import {Text, TouchableOpacity,StyleSheet,GestureResponderEvent} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts'

type AmountButtonProps  = {
    amount : string,
    selected : string
    onPress : ((event: GestureResponderEvent) => void) | undefined
}

const AmountButton  : FC<AmountButtonProps> = props =>{
    const {amount,selected,onPress} = props

    const clickHandler = () =>{
        if(amount){
            onPress(amount)
        }
    }

    return (
        <TouchableOpacity 
            style={[styles.btn,{
                backgroundColor : amount === selected ? Colors.RedBaron : Colors.PineTree}
            ]} 
            onPress={clickHandler}
        >
            <Text style={styles.text}>{amount}</Text>
        </TouchableOpacity>
    )
}

export default AmountButton

const styles = StyleSheet.create({
    btn : {
        width  : '25%',
        alignItems: "center",
        backgroundColor: Colors.PineTree,
        padding : 20,
        borderRadius : 10,
        marginTop : 15,
        marginHorizontal : 12
    },
    text : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
    }
})