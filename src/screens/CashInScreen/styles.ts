import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    mainContainer : {
        flex:1,
        width  : '100%',
        marginTop : '25%',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        backgroundColor : Colors.TabBackground
    },
    section : {
        paddingTop : 35,
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
    sectionheadingBtnText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.RedBaron,
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
        marginStart : 20
    }
})

export default styles