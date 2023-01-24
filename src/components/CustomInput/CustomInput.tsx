import React,{FC,useState} from 'react'
import {View,Text,TextInput,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import Icons from '../../assets/Icons'
import { Colors } from '../../theme/Colors'
import { CustomInputProps } from './CustomInputProps'

const CustomInput :FC<CustomInputProps> = props =>{
    const { 
        label,
        placeholder,
        onChangeText,
        value,      
        containerStyle,
        isleftIconVisible  = false,
        leftIcon,
        isRightIconVisible = false ,
        inputStyle,
        keyboardType,         
        secureTextEntry = false,
        } = props;

        const [isSecureText, setIsSecureText] = useState(secureTextEntry)
    const toggleIconHandler = ()=>{
        setIsSecureText(!isSecureText)
    }

    return(
        <View style={[styles.container,containerStyle]}>
            <View style={styles.labelView}>
                <Text style={styles.label}>{label}</Text>
            </View>
            <View style={[styles.searchView]}>
                {isleftIconVisible && leftIcon && <View style={styles.leftView}>
                    {leftIcon}
                </View>}
                <View style={styles.textInputContainer}>
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={Colors.Gray78}
                        value = {value}
                        onChangeText = {(newText)=>onChangeText(newText)}
                        style = {[
                            styles.input,
                            inputStyle,
                            { borderRadius : !isRightIconVisible ? 10 : 0},
                            {
                                borderTopLeftRadius : (leftIcon && isleftIconVisible) ? 0 : 10,
                                borderBottomLeftRadius : (leftIcon && isleftIconVisible) ? 0 :10
                            }
                        ]}
                        selectionColor = {Colors.white}
                        keyboardType = {keyboardType}
                        secureTextEntry = {isSecureText}
                    />
                </View>
                {isRightIconVisible ?
                    <TouchableOpacity style={styles.rightIconView} onPress = {toggleIconHandler}>
                        {isSecureText ?  
                        <Icon name="eye-off-outline" size={24} color={Colors.white}/> 
                        : <Icons.EyeIcon/>
                        }
                    </TouchableOpacity>  
                    :  
                    <View style={styles.rightView}/>
                }
            </View>
        </View>
    )
}

export default CustomInput

