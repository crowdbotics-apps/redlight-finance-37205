import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    mainContainer : {
        flex:1,
        width  : '100%',
        paddingHorizontal: 30,
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        backgroundColor : Colors.aubergine
    },
    section1 : {
        alignItems : 'center',
        paddingTop : 35,
        paddingBottom : 40,
        borderBottomWidth : 1,
        borderBottomColor : Colors.MediumDarkGray,
    },
    text : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 22,
        color : Colors.white,
    },
    section2 : {
        paddingTop  : 20,
        flex:1
    },
    logo : {
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center'
    },
    img : {
        width : 100,
        height : 75,
        backgroundColor  : Colors.white,
        borderRadius : 10,
    },
    logoText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '500',
        fontSize : 20,
        lineHeight : 30,
        color : Colors.white,
    },
    logoSubText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.MediumDarkGray,
        marginTop : 2
    },
    textContainer : {
        marginStart : 20
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : 10
    },
    paraContainer : {
        marginTop  :10
    }
})

export default styles