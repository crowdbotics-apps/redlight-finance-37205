import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: Colors.aubergine,
        borderRadius: 10,
        width: "100%",
    },
    Heading: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        color: Colors.white,
        textAlign: "center",
        paddingVertical: "10%"
    },
    Icon: {
        alignSelf: "flex-end",
        marginTop: "3%",
    },
    Text: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 21,
        color: Colors.white,
        textAlign: "center",
        padding: "8%"
    },
    ModalContent: {
        bottom: 0,
        position: 'absolute',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        marginLeft: 0,
        width: "100%",
        backgroundColor: Colors.aubergine,
        paddingHorizontal: "6%",
    },
})

export default styles