import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    container : {
        width  : '85%',
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginVertical  :30,
        paddingVertical : 2,
    },
    headerText : {
        flex:1,
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '700',
        fontSize : 18,
        lineHeight : 27,
        color : Colors.white,
        textAlign : 'center'
    },
    rightView : {
        width : 40,
    }
})

export default styles