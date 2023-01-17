import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
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
        backgroundColor : Colors.aubergine,
        padding : 35,
    },
    input: {
        height: 40,
        padding: 10,
        borderRadius : 10,
        marginTop : 6,
        backgroundColor : Colors.aubergine,
        color  : Colors.white,
        elevation : 5,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    btn : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    text : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 22,
        color : Colors.white,
    },
    placeholderText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    balanceText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '500',
        fontSize : 12,
        lineHeight : 18,
        color : Colors.Gray78,
        marginTop : 3
    },
    sendCreditView : {
        marginTop : 30,
        flex:1,
    },
    creditViaContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 20
    },
    item : {
        width : '30%',
        borderRadius : 10,
        backgroundColor : Colors.PineTree,
        justifyContent : 'flex-start',
        alignItems : 'center',
        paddingVertical : 10,
    },
    itemText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 18,
        color : Colors.white,
        marginTop  : 10
    },
    btnContainer : {
        position:'absolute',
        bottom : 20,
        width : '100%',
        alignSelf : 'center',
    }
});

export default styles;