import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    body : {
        width  :'100%',
        paddingHorizontal : 30,
    },
    circle : {
        alignSelf : 'center'
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
    upperText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
        marginTop : "4%"
    },
})

export default styles;