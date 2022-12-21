import {  KeyboardTypeOptions, ViewStyle ,GestureResponderEvent} from "react-native"

export type CustomInputProps = {
    label  : String ,
    placeholder: string,
    onChangeText : Function,
    value : string | undefined,
    containerStyle : ViewStyle | {}
    inputStyle  : ViewStyle | {}
    leftIcon : any,
    isleftIconVisible : Boolean | undefined,
    isRightIconVisible : Boolean | undefined,
    keyboardType : KeyboardTypeOptions | undefined,
}