import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    container : {
        height : 150,
        width : '100%',
    },
    image : {
        height : '100%',
        width : '100%'
    },
    wrapper : {
        height : 40,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop: '14%',
        marginHorizontal : 20,
    },
    touchable : {

    },
    title : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight :'700',
        fontSize : 22,
        lineHeight : 27,
        color : Colors.white,
        textAlign :'center',
    }
})

export default styles;