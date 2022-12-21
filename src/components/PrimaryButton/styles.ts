import {StyleSheet} from 'react-native'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts';

const styles = StyleSheet.create({
  button  : {
      alignItems: "center",
      backgroundColor: Colors.RedBaron,
      padding: 13,
      borderRadius : 10,
  },
  text :{
      fontFamily : Fonts.PoppinsBold,
      fontWeight : '600',
      fontSize : 14,
      lineHeight : 21,
      color : Colors.white,
  },
  disabledButton : {
    backgroundColor  : Colors.Gray78
  }
})

export default styles;