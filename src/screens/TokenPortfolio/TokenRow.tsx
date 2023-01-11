import React,{FC} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts'

type TokenRowProps  =  {
    walletName : string,
    walletBalance : string,
    currency : string
}

const TokenRow : FC<TokenRowProps> = props => {
    const {walletName,walletBalance,currency} = props
    return (
        <View style={styles.container}>
            <View style={styles.imgView}/>
            <View style={styles.mainContainer}>
                <View style={styles.row}>
                    <Text style={styles.text}>{walletName}</Text>
                    <Text style={styles.text}>{parseInt(walletBalance)} USDT</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.subText}>{currency}</Text>
                    <Text style={styles.subText}>= 0.00 PHP</Text>
                </View>
            </View>
        </View>
    )
}

export default TokenRow

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        marginVertical : 15
    },
    imgView : {
        height : 45,
        width : 45,
        borderRadius : 10,
        backgroundColor : Colors.white
    },
    mainContainer : {
        flex:1,
        paddingStart : 15,
    },
    row : {
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems : 'center'
    },
    text : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
    },
    subText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
        marginTop  : 3
    }
})