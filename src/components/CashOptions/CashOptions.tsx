import React,{FC,} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,GestureResponderEvent} from 'react-native'
import { Fonts } from '../../assets/fonts'
import Icons from '../../assets/Icons'
import { Colors } from '../../theme/Colors'

type CashOptionsProps = {
    onPress  : ((event: GestureResponderEvent) => void) | undefined
}

const CashOptions : FC<CashOptionsProps> = props =>{
    const {onPress} = props
    return (
        <TouchableOpacity style={styles.btn} onPress = {onPress}>
            <View style={styles.image}></View>
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.mainText}>Match move</Text>
                    <Text style={styles.subText}>via match move</Text>
                </View>
                <Icons.RightArrow/>
            </View>
        </TouchableOpacity>
    )
}

export default CashOptions

const styles = StyleSheet.create({
    btn : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        marginVertical : 8,
    },
    image : {
        width : 70,
        height : 55,
        borderRadius : 10,
        backgroundColor : Colors.white
    },
    mainContainer : {
        flex:1,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingStart : 15,
    },
    mainText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
    },
    subText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 12,
        lineHeight : 18,
        color : Colors.MediumDarkGray,
    }
})