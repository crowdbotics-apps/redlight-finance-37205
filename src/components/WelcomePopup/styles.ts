import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: "88%",
        justifyContent: 'center',
        marginLeft: "8.3%",
        backgroundColor: "black",
        maxHeight: "30%",
        borderRadius: 20,
        marginTop: "40%",

    },
    HeaderText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontWeight: "500",
        fontSize: 24,
        textAlign: 'center',
        lineHeight: 36,
        color: Colors.white,
        position: "absolute",
        marginLeft: 85,
        marginTop: "7%",
    },
    Text: {
        fontFamily: Fonts.PoppinsRegular,
        fontWeight: "400",
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 21,
        color: Colors.white,
        position: "absolute",
        marginLeft: 30,
        marginTop: "33%",

    },
    MiddleContainer: {
        marginTop: "55%",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-evenly"
    },
    LowerContainer: {
        marginTop: "12%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    TabContainer: {
        width: 97,
        height: 130,
        backgroundColor: Colors.TabBackground,
        borderRadius: 10,
    },
    TabHeader: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 18,
        fontWeight: "800",
        textAlign: 'center',
        lineHeight: 27,
        color: Colors.RedBaron,
        marginTop: "7%",
    },
    TabContent: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        textAlign: "center",
        color: Colors.white,
        marginTop: "17%"
    },
    ButtonOne: {
        width: 142,
        height: 47,
        borderRadius: 20,
        backgroundColor: Colors.TabButtonOne,
    },
    ButtonTwo: {
        width: 142,
        height: 47,
        borderRadius: 20,
        backgroundColor: Colors.RedBaron,
    },
    Image: {
        flex: 1,
    },
    ButtonText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 14,
        fontWeight: "600",
        textAlign: 'center',
        lineHeight: 21,
        color: Colors.white,
        marginTop: "8%"

    },
    ModalContent: {
        maxHeight: "55%",
        marginTop: "40%",
    }
})






export default styles;