import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    container : {
        marginBottom : 20 
    },
    labelView : {
        marginBottom : 6
    },
    label : {
        fontFamily  : Fonts.PoppinsRegular,
        fontWeight : '500',
        fontSize  : 16 ,
        lineHeight : 21 ,
        color : Colors.white,
    },
    searchView : {
        flexDirection : 'row',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    textInputContainer : {
        flex:1,
    },
    input : {
        height: 40,
        borderTopLeftRadius  :10,
        borderBottomLeftRadius : 10,
        color : Colors.white,
        paddingHorizontal : 20,
        backgroundColor : Colors.aubergine,
        fontSize : 14,
    },
    rightIconView : {
        height : 40,
        backgroundColor : Colors.aubergine,
        borderTopRightRadius  :10,
        borderBottomRightRadius : 10,
        justifyContent : 'center',
        paddingEnd : 20
    },
    rightView :{
        
    }
})

export default styles;