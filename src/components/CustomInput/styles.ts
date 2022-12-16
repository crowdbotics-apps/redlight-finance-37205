import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    container : {
        marginVertical : 10,
    },
    label : {
        fontFamily  : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize  : 16 ,
        lineHeight : 24 ,
        color : Colors.Gray78,
    },
    inputView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        color: Colors.white,
        
        
    },
    input : {
        height : 40,
        borderBottomColor : Colors.MediumDarkGray,
        borderBottomWidth  : 1,
        color : Colors.white,
        marginTop: -29,
    }
})

export default styles;