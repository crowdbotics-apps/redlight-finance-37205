import React,{FC} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    } from 'react-native'
import QRCode from 'react-native-qrcode-svg';
import { QrCodeProps } from './QrCodeProps';
import Icons from '../../assets/Icons'
import styles from './styles'
import { Strings } from '../../util/Strings';

const QrCode : FC<QrCodeProps> = props =>{
    const {wallet,user,qrString,setQRref,shareQR,saveQR} = props
    return (
        <View style={styles.QRContainer}>
            <Text style={styles.walletText}>{wallet}</Text>

            {qrString ? <View style={styles.QRView}>
                <QRCode
                    size = {200}
                    value= {qrString}
                    getRef = {(c)=>setQRref(c)}
                />
                </View> 
                : null        
            }
            <Text style={styles.usernameText}>{user}</Text>

            <TouchableOpacity style={styles.shareBtn} onPress={shareQR}>
                <View style={styles.btnView}>
                    <Icons.ShareIcon/>
                    <Text style={styles.btnText}>{Strings.SHARE_MY_QR_CODE}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.downloadBtn} onPress={saveQR}>
                <View style={styles.btnView}>
                    <Icons.DownloadIcon/>
                        <Text style={styles.btnText}>{Strings.SAVE_TO_MY_GALLERY}</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

export default QrCode