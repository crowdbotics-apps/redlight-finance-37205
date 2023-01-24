import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    modal  :{
        width : '100%',
        alignSelf : 'center',
        backgroundColor : Colors.white,
        borderRadius : 10,
    },
    header  :{
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '700',
        fontSize : 18,
        lineHeight : 27,
        color : Colors.white,
        textAlign : 'center',
        backgroundColor : '#5cb85c',
        paddingVertical : 10,
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10
    },
    mainText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '700',
        fontSize : 18,
        lineHeight : 27,
        color : Colors.EerieBlack,
        textAlign : 'center',
        marginVertical : 20,
        paddingHorizontal : 20
    }
})

export default styles