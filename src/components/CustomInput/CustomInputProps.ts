import { ImageStyle, KeyboardTypeOptions } from "react-native"

export type CustomInputProps = {
    label  : String ,
    onChangeText : Function,
    value : String | undefined,
    containerStyle : ImageStyle | {}
    isIconVisible : Boolean | undefined,
    keyboardType : KeyboardTypeOptions | undefined,
    secureTextEntry : Boolean,
}