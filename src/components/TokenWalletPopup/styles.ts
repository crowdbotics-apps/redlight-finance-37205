import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import {Fonts} from '../../assets/fonts'

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
    walletView : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        backgroundColor : Colors.PineTree,
        borderRadius : 10,
        paddingVertical : 20,
        paddingHorizontal : 12,
        marginVertical : 8
    },
    logo : {
        height : 45,
        width : 45,
        borderRadius : 90,
        backgroundColor : Colors.white
    },
    mainContainer : {
        flex:1,
        marginStart : 15
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
    },
    mainText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '600',
        fontSize : 16,
        lineHeight : 21,
        color : Colors.white,
    },
    subText: {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 18,
        color : Colors.white,
    }
})

export default styles