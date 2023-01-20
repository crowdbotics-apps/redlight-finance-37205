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
        backgroundColor : Colors.aubergine,
        paddingHorizontal : 30
    },
    textInput : {
        width: 50,
        height: 80,
        padding: 15,
        fontSize: 32,
        borderRadius: 5,
        color: Colors.white,
        textAlign: 'center',
        fontFamily: Fonts.PoppinsRegular,
        backgroundColor: Colors.aubergine,
        borderColor: Colors.lightBlack,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    underlineStyleHighLighted: {
        borderColor : Colors.aubergine
    },
    name : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
        textAlign : 'center',
        marginTop : 30
    },
    subText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
        textAlign : 'center',
        marginTop : 30
    },
    inputContainer: {
        width: '100%',
        height: 150,
    }
})

export default styles