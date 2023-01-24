import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    mainContainer : {
        flex:1,
        width  : '100%',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        backgroundColor : Colors.aubergine
    },
    section : {
        paddingTop : 35,
        flex:1,
    },
    sectionHeading : {
        flexDirection  : 'row',
        justifyContent : 'space-between',
        marginHorizontal : 30,
    },
    sectionHeadingText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
    },
    sectionSubheading : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 12,
        lineHeight : 18,
        color : Colors.white,
        marginTop : 4,
        marginBottom : 24,
        marginHorizontal : 30,
    },
    list : {
        marginHorizontal : 30
    }
})

export default styles