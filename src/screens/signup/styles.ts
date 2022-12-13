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
    tabContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom : 30
    },
    tab : {
        flex:1,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 15,
    },
    tabText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    body : {
        width  :'100%',
        paddingHorizontal : 30,
    },
    footerView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    footerText  : { 
        fontFamily  :Fonts.PoppinsBold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.MediumDarkGray,
        marginHorizontal  : 25
    },
    hairline : {
        flex: 1,
        borderBottomColor : Colors.MediumDarkGray,
        borderBottomWidth : 1,
    },
    circle : {
        alignSelf : 'center'
    }
})

export default styles;