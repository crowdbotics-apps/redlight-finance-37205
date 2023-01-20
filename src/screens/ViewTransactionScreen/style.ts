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
        borderRadius: 10,
        borderColor: Colors.MediumDarkGray,
    },
    Heading: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        padding: "8%",
        color: Colors.white
    },
    transactionAndDateContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: "8%",
    },
    transactionAndDateText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 18,
        color: Colors.white,
        marginTop: "12%"
    },
    cashInAndDateText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        color: Colors.white,
        marginTop: "5%"
    },
    gmailText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        color: Colors.white,
        marginTop: "5%",
        marginBottom: "1%",
        padding: "3%",
        margin: "5%",
        borderBottomColor: Colors.MediumDarkGray,
        borderBottomWidth: 2,
    },
    headingTexts: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 12,
        fontWeight: "400",
        lineHeight: 18,
        color: Colors.white,
        marginTop: "10%",
        paddingHorizontal: "8%"
    },
    contentText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        color: Colors.white,
        marginTop: "5%",
        paddingHorizontal: "8%"
    },
    statusAndAmount: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        color: Colors.white,
        marginTop: "8%",
        marginBottom: "1%",
        paddingHorizontal: "1%",
    },
    pendingText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        color: Colors.white,
        marginTop: -39,
        paddingHorizontal: "1%",
        marginLeft: "75%"
    },
    amount: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        color: Colors.white,
        paddingHorizontal: "4%",
        marginTop: "8%"
    }



})

export default styles