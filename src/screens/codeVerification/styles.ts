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
    subText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 17,
        lineHeight : 24,
        textAlign : 'center',
        color : Colors.Gray78,
    },
    body : {
        width  :'100%',
        paddingHorizontal : 30,
    },
    circle : {
        alignSelf : 'center'
    },
    textInput : {
        width  : 50,
        height: 80,
        padding: 10,
        fontSize : 32,
        borderRadius : 10,
        color : Colors.white,
        textAlign : 'center',
        fontFamily : Fonts.PoppinsRegular,
        backgroundColor  : Colors.aubergine,
        borderColor : Colors.aubergine,
        shadowColor: Colors.aubergine,
        shadowOffset: { width: 0,height: 2},
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation : 5,
    },
    text : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        textAlign : 'center',
        color : Colors.white
    },
    resendContainer : {

    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
      underlineStyleHighLighted: {
        borderColor : Colors.aubergine
    },
    underlineStyleHighLighted: {
        borderColor: "#03DAC6",
    },
})

export default styles;