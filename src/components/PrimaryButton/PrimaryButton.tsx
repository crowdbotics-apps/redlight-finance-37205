import React,{FC} from 'react'
import {View,Text,TouchableOpacity,ActivityIndicator,StyleSheet} from 'react-native'
import RadialGradient from 'react-native-radial-gradient';
import { Fonts } from '../../assets/fonts'
import {PrimaryButtonProps} from './PrimaryButtonProps'
// import styles from './styles'
import { Colors } from '../../theme/Colors'

const PrimaryButton : FC<PrimaryButtonProps> = props =>{
    const {isLoading,text,onPress} = props
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={()=>onPress()} style={styles.button}>
                { isLoading ? (
                      <ActivityIndicator color={'white'} />
                    ) : (
                        <View>
                            <Text style={styles.text}>{text}</Text>
                        </View>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default PrimaryButton

const styles = StyleSheet.create({
    container : {
        marginVertical  :20
    },
    button  : {
        alignItems: "center",
        backgroundColor: "#BC0016",
        padding: 13,
        borderRadius : 10,

    },
    text :{
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '600',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white
    }
})

