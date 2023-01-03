import { GestureResponderEvent, ViewStyle } from "react-native"

export type CustomHeaderProps = {
    isIconVisible : boolean,
    name : string ,
    Icon : Function,
    headerStyle : ViewStyle,
    onPress  : ((event: GestureResponderEvent) => void) | undefined
}