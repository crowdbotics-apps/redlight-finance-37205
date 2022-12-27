import { GestureResponderEvent } from "react-native"

export type QrCodeProps = {
    wallet :string,
    user : string,
    qrString : string,
    setQRref : Function,
    shareQR : ((event: GestureResponderEvent) => void) | undefined
    saveQR : ((event: GestureResponderEvent) => void) | undefined
}