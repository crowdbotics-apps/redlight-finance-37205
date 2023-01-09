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
    text : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 22,
        color : Colors.white,
    },
    smallText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 12,
        lineHeight : 18,
        color : Colors.white,
        marginLeft : 10
    },
    headerSubText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '600',
        fontSize : 20,
        lineHeight : 30,
        color : Colors.white,
        marginTop : 6
    },
    section1 : {
        paddingTop  : 35,
        paddingBottom : 30,
        borderBottomWidth : 1,
        borderBottomColor : Colors.MediumDarkGray,
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
    input: {
        height: 40,
        padding: 10,
        borderRadius : 10,
        marginTop : 6,
        backgroundColor : Colors.aubergine,
        color  : Colors.white,
        elevation : 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    section2 : {
        paddingTop : 15,
        paddingBottom  : 20,
        borderBottomWidth : 1,
        borderBottomColor : Colors.MediumDarkGray,
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginVertical : 10
    },
    totalText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '600',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
    },
    footer : {
        flex:1,
        marginTop : 24,
    },
    footerText : { 
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 11,
        lineHeight : 15,
        color : Colors.white
    },
    placeholderStyle : {
        color : Colors.MediumDarkGray
    }
})

export default styles