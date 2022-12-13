import React,{FC} from 'react'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'
import styles from './styles'
import Icons from '../../assets/Icons'
import { Colors } from '../../theme/Colors'
import { CustomInputProps } from './CustomInputProps'

const CustomInput :FC<CustomInputProps> = props =>{
    const { 
        label,
        onChangeText,
        value,
        containerStyle,
        isIconVisible,
        keyboardType,
        secureTextEntry } = props;
    return(
        <View style={[styles.container,containerStyle]}>
            <View style={styles.inputView}>
                <Text style={styles.label}>{label}</Text>
                {isIconVisible && <TouchableOpacity>
                    <Icons.EyeIcon/>
                </TouchableOpacity>
                }
            </View>
            <TextInput
                value = {value}
                onChangeText = {(newText)=>onChangeText(newText)}
                style = {[styles.input]}
                selectionColor = {Colors.white}
                keyboardType = {keyboardType}
                //secureTextEntry = {secureTextEntry}
            />
        </View>
    )
}

export default CustomInput

