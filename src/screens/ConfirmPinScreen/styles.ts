import { StyleSheet } from "react-native";
import { Fonts } from "../../assets/fonts";
import { Colors } from "../../theme/Colors";

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    HeaderText: {
        fontFamily: Fonts.PoppinsBold,
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 27,
        textAlign: "center",
        color: Colors.white,
        marginTop: "15%"
    },
    Container: {
        width: "99%",
        height: "90%",
        marginTop: "6%",
        backgroundColor: Colors.aubergine,
        borderRadius: 20
    },
    contentText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        color: Colors.Gray78,
        textAlign: "center",
        padding: "6%",
        marginTop: "8%"
    },
    textInput: {
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
        borderColor: Colors.lightBlack
    },
    inputContainer: {
        width: '100%',
        height: 150,
        padding: "5%"
    }
})

export default styles
