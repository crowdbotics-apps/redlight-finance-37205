import React from "react";
import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    Image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    Container: {
        width: "100%",
        height: "90%",
        marginTop: "10%",
        backgroundColor: Colors.aubergine,
        borderRadius: 10

    },
    walletContainer: {
        width: "90%",
        marginTop: "15%",
        backgroundColor: Colors.RedBaron,
        height: "32%",
        borderRadius: 10,
        marginLeft: "5.5%",
    },
    buttonContainer: {
        marginTop: "12%",
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        width: 142,
        height: 47,
        borderRadius: 10,
        backgroundColor: Colors.PineTree,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    },
    buttonText: {
        textAlign: "center",
        color: Colors.white,
        fontFamily: Fonts.PoppinsRegular,
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 24,
    },
    qrCode: {
        alignSelf: "flex-end",
        paddingHorizontal: "10%",
        marginVertical: -60
    },
    Balance: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 32,
        fontWeight: "400",
        lineHeight: 48,
        color: Colors.white,
        textAlign: "center",
        marginTop: "35%"
    },
    leftArrowIcon: {
        marginRight: "auto",
        marginLeft: 0,
        alignSelf: "flex-start"
    },
    header: {
        display: "flex",
        flexDirection: "row",
        marginTop: "15%",
        width: "100%",
    },
    headingText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 27,
        color: Colors.white,
        marginLeft: "30%"
    },
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
    }
})

export default styles