import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    Image: {
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
        marginTop: "15%",
        backgroundColor: Colors.phoneInputBackground,
        borderRadius: 10
    },
    Heading: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        paddingLeft: "8%",
        paddingTop: "5%",
        color: Colors.white
    },
    Tab: {
        flexDirection: "row",
        margin: "5%",
        justifyContent: "space-between",
        borderBottomColor: Colors.borderBottom,
        borderBottomWidth: 1,
        padding: "3%"
    },
    tabName: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 18,
        fontWeight: "400",
        lineHeight: 27,
        color: Colors.white,
    },
    deleteAccount: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 18,
        fontWeight: "500",
        lineHeight: 27,
        color: Colors.lightRed,
        textAlign: "center",
        marginTop: "30%"
    },
    deleteContainer: {
        width: "99%",
        height: "45%",
        marginTop: "20%",
        backgroundColor: Colors.RedBaron
    },
    deleteText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        color: Colors.white,
        textAlign: "center"
    },

})

export default styles