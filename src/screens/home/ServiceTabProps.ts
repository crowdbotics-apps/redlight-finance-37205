import { GestureResponderEvent } from "react-native"

export type ServiceTabProps = {
    onPressFunction: ((event: GestureResponderEvent) => void) | undefined
    Heading: string,
    iconName: string
}