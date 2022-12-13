import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
    container : {
      width  : 180,
      height : 180,
      borderRadius : 90,
      backgroundColor : Colors.EerieBlack,
      justifyContent : 'center',
      alignItems : 'center'
    },
    img : {
        width  : 120,
        height : 125
    }
})

export default styles;