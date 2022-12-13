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
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center',
        marginTop: '15%',
        paddingHorizontal : 20,
    },
    touchable : {
        marginHorizontal : 20
    },
    title : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight :'700',
        fontSize : 22,
        lineHeight : 27,
        color : Colors.white,
        textAlign :'center',
        marginStart : 15
    }
})

export default styles;