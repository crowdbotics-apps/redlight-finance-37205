import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    img : {
        width : '100%',
        height : 400,
    },
    container : {
        paddingHorizontal : 30,
        marginTop : 30
    },
    body : {
        width  :'100%',
    },
    tabs :{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -15,
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
        marginBottom: -16,
    },
});

export default styles;