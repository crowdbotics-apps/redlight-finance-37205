import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    headingText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '700',
        fontSize : 20,
        lineHeight : 30,
        textAlign : 'center',
        color : Colors.Gray78,
        marginVertical : 20
    },
    circle : {
        alignSelf : 'center'
    },
    body : {
        width  :'100%',
        paddingHorizontal : 30,
    },
    text : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 13,
        lineHeight : 18,
        color : Colors.lightRed,
        textAlign : 'right'
    },
    agreementText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.lightRed,
        textDecorationLine : 'underline'
    },
    checkboxTextStyle : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.Gray78,
        marginTop : 15
    },
})

export default styles;