import { StyleSheet } from "react-native";
import { Colors } from "../../theme/Colors";
import { Fonts } from "../../assets/fonts";

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
    },
    HeaderText: {
        fontFamily: Fonts.PoppinsBold,
        fontWeight: "700",
        fontSize: 18,
        lineHeight: 27,
        color: Colors.white,
        marginTop: "15%"
    },
    children: {
        marginTop: "18%",
        marginBottom: "5%",
        marginLeft: "3%",
        padding: 5
    },
    input : {
        borderRadius : 10,
        backgroundColor : Colors.aubergine,
        color  : Colors.white,
        elevation : 5,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    container : {
        width: "98%", 
        height: "90%", 
        marginTop: "5%", 
        backgroundColor: Colors.aubergine, 
        borderRadius: 10
    },
    button : {
        marginTop: "54%", 
        width: "88%", 
        alignSelf: 'center'
    }
})

export default styles