import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import {Fonts} from '../../assets/fonts'

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center',
    },
    QRContainer : {
        width : '85%',
        // marginTop  : '20%',
        paddingHorizontal : 20,
        paddingVertical : 30,
        borderRadius : 10,
        alignItems : 'center',
        backgroundColor : Colors.aubergine,
    },
    QRView : {
        padding: 5,
        borderRadius : 10,
        backgroundColor : Colors.white,
    },
    walletText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 20,
        lineHeight : 30,
        color : Colors.white,
        textAlign  :'center',
        marginTop : 10,
        marginBottom  : 40
    },
    usernameText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
        textAlign  :'center',
        marginTop  : 25,
        marginBottom : 40
    },
    shareBtn : {
        width  : '90%',
        alignItems: "center",
        backgroundColor: Colors.RedBaron,
        borderRadius  :40,
        padding: 14
    },
    btnView : {
        flexDirection : 'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    btnText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
        textAlign  :'center',
        marginLeft : 14,
    },
    downloadBtn : {
        marginTop : 25,
        marginBottom : 15
    }
})

export default styles