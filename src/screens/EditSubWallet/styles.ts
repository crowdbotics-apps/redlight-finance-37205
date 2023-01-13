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
        marginTop: "10%",
        backgroundColor: Colors.aubergine,
        borderRadius: 10
    },
    defaultText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "500",
        lineHeight: 21,
        color: Colors.Gray78,
        marginTop: -22,
        paddingHorizontal: "19%"
    },
    cancelText: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "600",
        lineHeight: 21,
        color: Colors.Gray78,
        textAlign: "center",
        marginTop: "9%"
    },
    checkBox: {
        marginTop: -35,
        paddingHorizontal: "10%",
        color: Colors.Gray78
    },
    Header: {
        display: "flex",
        flexDirection: "row",
        marginTop: "5%",
        justifyContent: "space-between",
        width: "100%",
        padding: "5%"
    },
    HeaderText: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 18,
        fontWeight: "700",
        lineHeight: 27,
        color: Colors.white
    },
    checkboxTextStyle : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.Gray78,
        marginTop : 5
    },

})

export default styles