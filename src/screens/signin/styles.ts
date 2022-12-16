import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    body : {
        width  :'100%',
        paddingHorizontal : 30,
    },
    tabs :{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 7,
    },
    tabss :{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    tabText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.RedBaron,
    },
    tabsText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    upperTabText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
        marginBottom: -10,
    },
    footerView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    footerText  : { 
        fontFamily  :Fonts.PoppinsBold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.MediumDarkGray,
        marginHorizontal  : 25
    },
    hairline : {
        width:134,
        borderBottomColor : Colors.white,
        borderBottomWidth : 5,
        height: 5,
        borderRadius: 100,
        lineHeight:21,
        alignSelf: "center",
        marginTop:83,
    },
});

export default styles;