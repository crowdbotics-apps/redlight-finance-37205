import React,{FC,useState,useEffect} from 'react'
import {
    View,
    Text,
    StatusBar,
    ImageBackground, 
    TouchableOpacity,
    Platform,
    Alert,
    PermissionsAndroid,
    ToastAndroid } from 'react-native'
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';
import RNFS from "react-native-fs";
import Share from 'react-native-share';
import moment from 'moment'
import styles from './styles'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'
import CustomHeader from '../../components/CustomHeader';
import {getWalletQR } from '../../services/homeServices';

const QRCodeScreen : FC = ({route})=>{
    const {walletId} = route.params
    const [walletName,setWalletName] = useState('')
    const [username,setUsername] = useState('')
    const [QRString,setQRString] = useState('')
    const [QRref,setQRref] = useState()
   
    const navigation = useNavigation()

    useEffect(()=>{
        getWalletQR(walletId).then(response=>{       
            setWalletName(response.subwallet_name)
            setUsername(response.user.username)
            setQRString(response.wallet_address.ethereum)
        })
        .catch(error=>{
            console.log(error.response); 
        })
    },[])

    const shareHandler = async()=>{
        if(QRref){
            QRref.toDataURL((data:any) => {
                let shareImageBase64 = {
                    title: 'React Native',
                    url: `data:image/png;base64,${data}`,
                    subject: 'Share Link', //  for email
                  };
                  Share.open(shareImageBase64).then(res=>{
                    console.log('QR shared succesfully!!');
                  })
                  .catch(error => 
                    console.log(error)
                );
            }
        )}
    }

    const saveQrToDisk = async() => {

        if (Platform.OS === "android" &&
         !(await hasAndroidPermission())) {
             return;
        }
        
        if(QRref){
        
            QRref.toDataURL((data:any) => {
                let mili = moment().millisecond();
                let filePath =  RNFS.CachesDirectoryPath+`/QR_${mili}.png`;
                RNFS.writeFile(filePath, data, 'base64')
                .then((success) => {
                    console.log('code reached here');
                    return CameraRoll.save(filePath,)
                })
                .then(() => {
                    {Platform.OS === 'ios' ? 
                        Alert.alert('QR saved successfully!!') : 
                        ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
                    }
                    });
                });
        }
    }

    const hasAndroidPermission = async() => {
        const permission=
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
        
          const hasPermission = 
        await PermissionsAndroid.check(permission);
          if (hasPermission) {
            return true;
          }
        
          const status = await PermissionsAndroid.request(permission);
          return status === 'granted';
    }
    
    return (
        <View>
            <ImageBackground source={Images.Rectangle} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name="Quick View" 
                    Icon = {<Icons.CrossIcon/>}
                    isIconVisible={true} 
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 30}}
                    onPress={()=>navigation.goBack()}
                />
                
                <View style={styles.QRContainer}>
                    <Text style={styles.walletText}>{walletName}</Text>

                    {QRString ? <View style={styles.QRView}>
                        <QRCode
                            size = {200}
                            value= {QRString}
                            getRef = {(c)=>setQRref(c)}
                        />
                    </View> : null
                    }
                    <Text style={styles.usernameText}>{username}</Text>

                    <TouchableOpacity style={styles.shareBtn} onPress={shareHandler}>
                        <View style={styles.btnView}>
                            <Icons.ShareIcon/>
                            <Text style={styles.btnText}>Share my QR Code</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.downloadBtn} onPress={saveQrToDisk}>
                        <View style={styles.btnView}>
                            <Icons.DownloadIcon/>
                            <Text style={styles.btnText}>Save to My Gallery</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    )
}

export default QRCodeScreen