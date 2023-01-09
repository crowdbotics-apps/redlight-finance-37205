import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center',
    },
    tabContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        paddingHorizontal : 30,
        marginBottom : 30
    },
    tab : {
        flex:1,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 15,
    },
    btnText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    marker : {
        width  : 230,
        height : 230,
        borderRadius : 30,
        borderWidth : 1,
        borderColor : Colors.Gray78,
        position : 'absolute',
        top : '20%'
    },
    bottomText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
        marginVertical : 30,
        textAlign : 'center'
    },
    btn : {
        alignItems: "center",
        backgroundColor: Colors.RedBaron,
        borderRadius : 40,
        paddingHorizontal : 40,
        paddingVertical : 15
    },
    btnView : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    
});

export default styles;