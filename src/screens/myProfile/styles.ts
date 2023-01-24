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
        textAlign: 'center',
        color: Colors.white,
        marginTop: "15%"
    },
    User: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 24,
        fontWeight: "400",
        lineHeight: 36,
        textAlign: "right",
        color: Colors.white,
        marginTop: "9%",
        marginRight: "27%"
    },
    UserName: {
        fontFamily: Fonts.PoppinsSemibold,
        fontSize: 16,
        fontWeight: "400",
        lineHeight: 24,
        color: Colors.white,
        marginTop: -60,
        marginRight: "15%"
    },
    Email: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        color: Colors.Gray78,
        marginLeft: "28%"
    },
    Tabs: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 18,
        fontWeight: "400",
        lineHeight: 27,
        color: Colors.white,
        paddingLeft: "8%"
    },
    Tabss: {
        fontFamily: Fonts.PoppinsRegular,
        fontSize: 18,
        fontWeight: "400",
        lineHeight: 27,
        color: Colors.RedBaron,
        paddingLeft: "8%"

    },
    Row: {
        justifyContent: "space-evenly",
    },
    imageVector: {
        marginTop: "5%",
        marginRight: "60%",
        // paddingHorizontal: "15%",
        height : 84,
        width  :84,
        borderRadius : 40,
    },
    imageSize: {
        width: "2%",
        height: "2%"
    },
    Container: {
        flexDirection: "row",
        paddingHorizontal: "5%",
        margin: "5%",
        justifyContent: "space-between",
    },
    imageScreen: {
        width: 84,
        height: 84,
        borderRadius: 84 / 2,
    },
    secondContainer: {
        width: "99%",
        height: "90%",
        marginTop: "15%",
        backgroundColor: Colors.aubergine,
        borderRadius: 10
    }

})

export default styles