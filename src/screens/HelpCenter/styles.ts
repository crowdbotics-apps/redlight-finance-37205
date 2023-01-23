import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    mainContainer : {
        flex:1,
        width  : '100%',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        backgroundColor : Colors.aubergine
    },
    containerView : {
        marginTop  : 40,
        marginHorizontal : 30
    },
    headerText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white
    },
    text : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
        marginBottom : 12
    },
    row : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginVertical : 12
    },
    rowText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '600',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
        marginStart : 20,
        textDecorationLine : 'underline'
    }
})

export default styles