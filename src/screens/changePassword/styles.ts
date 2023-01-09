import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    HeaderText: {
        fontFamily: Fonts.PoppinsBold,
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 27,
        color: Colors.white,
        marginTop: "15%"
    },
    children: {
        marginTop: "18%",
        marginBottom: "5%",
        marginLeft: "3%",
        padding: 5
    },
})

export default styles