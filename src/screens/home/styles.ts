import { StyleSheet } from "react-native";
import { Fonts } from "../../assets/fonts";
import { Colors } from "../../theme/Colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 27,
        color: Colors.white,
        textAlign: "center",
        padding: "10%",
        marginTop : "5%"
    },
    mainContainer: {
        width: "100%",
    },
    contentText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
        color: Colors.white,
        alignSelf: "flex-start",
        paddingHorizontal: "5%",
        marginTop: "3%"
    },
    tab: {
        width: "28%",
        backgroundColor: Colors.aubergine,
        borderRadius: 10,
        marginBottom: "2%",
        padding: "2%"
    },
    tabText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 12,
        fontWeight: "500",
        lineHeight: 18,
        color: Colors.white,
        textAlign: "center"
    },
    verificationTabText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 20,
        fontWeight: "500",
        lineHeight: 30,
        color: Colors.white,
        marginTop: "5%",
        paddingHorizontal: "2%"
    },
    verificationTabContent: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 15,
        color: Colors.white,
        marginTop: "1%",
        flexWrap: "wrap",
        flex: 1,
        paddingHorizontal: "2%"
    },
    thirdContainer: {
        backgroundColor: Colors.aubergine,
        marginTop: "2%",
        borderRadius: 10,
        paddingHorizontal: "6%",
        margin: "5%",
        alignSelf: "stretch"
    },
    thirdeContainerTab: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 18,
        color: Colors.white,
        textAlign: "left",
        padding: "2%"
    },
    thirdContainerTabText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        color: Colors.white,
        textAlign: "left",
        paddingHorizontal: "2%"
    },
    button: {
        width: "40%",
        backgroundColor: Colors.RedBaron,
        borderRadius: 15,
        marginBottom: "3%",
        paddingHorizontal: "5%"
    },
    buttonText: {
        fontFamily: Fonts.PoppinsBold,
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 21,
        color: Colors.white,
        textAlign: "center",
        padding: "3%"
    },
    thirdContainerTabTextPrice: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        color: Colors.lightRed,
        textAlign: "left",
        paddingHorizontal: "2%"
    },
    transactionHistoryTab: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0.6%"
    },
    transactionHistoryTabContent: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 10,
        fontWeight: "400",
        lineHeight: 15,
        textAlign: "right",
        color: Colors.Gray78,
        padding: "2%"
    },
    servicesContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        padding: "1%"
    }
})

export default styles
