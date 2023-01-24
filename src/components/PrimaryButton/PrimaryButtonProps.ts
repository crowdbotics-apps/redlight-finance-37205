import { ViewStyle } from "react-native";

export type PrimaryButtonProps = {
    isLoading : boolean |undefined,
    text : String
    onPress: Function,
    style  : ViewStyle,
    btnStyle : ViewStyle,
    disabled : boolean | undefined
}