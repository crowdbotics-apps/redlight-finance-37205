import React,{FC} from 'react'
import {View,Text,TouchableOpacity,ActivityIndicator} from 'react-native'
import { Colors } from '../../theme/Colors'
import {PrimaryButtonProps} from './PrimaryButtonProps'
import styles from './styles'

const PrimaryButton : FC<PrimaryButtonProps> = props =>{
    const {isLoading = false,text,onPress,btnStyle,style,disabled=false} = props
    return (
        <View style={[style]}>
            <TouchableOpacity style={[
                    styles.button,
                    btnStyle,
                    {backgroundColor : (disabled || isLoading) ? Colors.Gray78 : Colors.RedBaron }
                ]} 
                onPress={()=>onPress()}
                disabled={disabled || isLoading}
            >
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


