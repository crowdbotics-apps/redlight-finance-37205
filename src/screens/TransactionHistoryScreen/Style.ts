import { StyleSheet } from "react-native";
import { Fonts } from "../../assets/fonts";
import { Colors } from "../../theme/Colors";

const styles = StyleSheet.create({
    Image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    Container: {
        width: "99%",
        height: "90%",
        marginTop: "5%",
        backgroundColor: Colors.aubergine,
        borderRadius: 10
    },
    Heading: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        padding: "8%",
        color: Colors.white
    },
})

export default styles