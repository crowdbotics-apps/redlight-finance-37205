import { StyleSheet } from "react-native";
import { Fonts } from "../../assets/fonts";
import { Colors } from "../../theme/Colors";

const styles = StyleSheet.create({
    walletHeading: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 24,
        fontWeight: "400",
        lineHeight: 36,
        color: Colors.white,
        padding: "10%"
    },
    walletDate: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        color: Colors.Gray78,
        marginTop: -30,
        paddingHorizontal: "10%"
    },
    qrCode: {
        alignSelf: "flex-end",
        paddingHorizontal: "10%",
        marginVertical: -60
    },
    Balance: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 22,
        fontWeight: "400",
        lineHeight: 48,
        color: Colors.white,
        textAlign: "center",
        marginTop: "35%"
    },
    walletContainer: {
        width: "100%",
        backgroundColor: Colors.RedBaron,
        height: "100%",
        borderRadius: 10,
        padding:"2%",

    },
})

export default styles