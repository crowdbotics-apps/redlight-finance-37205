import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    container : {
        paddingVertical : 20,
        paddingHorizontal : 10
    },
    headerView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom : 15
    },
    headerText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    mainContainer : {
        padding :20,
        borderRadius : 10,
        marginBottom : 15,
        backgroundColor : Colors.PineTree
    },
    logoContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom : 15
    },
    logo : {
        height : 40,
        width : 90,
        borderRadius : 10,
        backgroundColor : Colors.white
    },
    logoText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 15,
        lineHeight : 18,
        color : Colors.white,
    },
    line : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'flex-start',
    },
    lineText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 13,
        lineHeight : 18,
        color : Colors.white,
    },
    icon : {

    }
}) 

export default styles