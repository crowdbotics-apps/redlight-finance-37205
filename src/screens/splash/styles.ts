import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    image : {
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    mainView : {
        width : '40%',
    },
    mainText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight :'700',
        fontSize : 30,
        lineHeight : 45,
        color : Colors.white,
        textAlign :'center'
    },
    loader :{
        position : 'absolute',
        bottom : '30%'
    },
    footerView : {
        marginHorizontal : 25,
        paddingHorizontal : 5,
        position : 'absolute',
        bottom : 30
    },
    footerText : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight :'400',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
        textAlign :'center'
    }
})

export default styles;