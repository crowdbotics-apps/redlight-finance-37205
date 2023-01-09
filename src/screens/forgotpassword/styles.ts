import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    container : {
    
    },
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    body : {
        width  :'100%',
        paddingHorizontal : 30,
    },
    circle : {
        alignSelf : 'center'
    },
    headingText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '700',
        fontSize : 20,
        lineHeight : 30,
        textAlign : 'center',
        color : Colors.Gray78,
        marginVertical : 20
    },
    tabContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginBottom : 30
    },
    tab : {
        flex:1,
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 15,
    },
    tabText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    upperText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
})

export default styles;