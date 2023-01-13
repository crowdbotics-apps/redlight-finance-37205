import React,{FC,useState,useEffect} from 'react'
import {
    View,
    Text,
    StatusBar,
    ImageBackground, 
    Platform,
    Alert,
    PermissionsAndroid,
    ToastAndroid } from 'react-native'
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { useNavigation } from '@react-navigation/native';
import RNFS from "react-native-fs";
import Share from 'react-native-share';
import moment from 'moment'
import styles from './styles'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'
import { Strings } from '../../util/Strings';
import CustomHeader from '../../components/CustomHeader';
import QrCode from '../../components/QrCode';
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
            setWalletName(response.wallet_name)
            setUsername(response.user.username)
            setQRString(response.public_address)
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
                    console.log(Strings.QR_SHARED_SUCCESSFULLY);
                  })
                  .catch(error => 
                    console.log(error)
                );
            }
        )}
    }

    const saveQrToDisk = async() => {

        if (Platform.OS === "android"){
            const permission= PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
           
            const hasPermission = await PermissionsAndroid.check(permission);
             if (!hasPermission) {
               return false;
             }
             else{
                 const status = await PermissionsAndroid.request(permission);
                 if(status !== 'granted'){
                   return false
                 }
             }
        }
        
        if(QRref){
        
            QRref.toDataURL((data:any) => {
                let mili = moment().millisecond();
                let filePath =  RNFS.CachesDirectoryPath+`/QR_${mili}.png`;
                RNFS.writeFile(filePath, data, 'base64')
                .then((success) => {
                    return CameraRoll.save(filePath,)
                })
                .then(() => {
                    {Platform.OS === 'ios' ? 
                        Alert.alert(Strings.QR_SAVED_SUCCESSFULLY) : 
                        ToastAndroid.show(Strings.QR_SAVED_SUCCESSFULLY, ToastAndroid.LONG);
                    }
                    });
                });
        }
    }
    
    return (
        <View>
            <ImageBackground source={Images.Rectangle} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name={Strings.QUICK_VIEW}
                    Icon = {<Icons.CrossIcon/>}
                    isIconVisible={true} 
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 30}}
                    onPress={()=>navigation.goBack()}
                />
                
                <QrCode
                    wallet = {walletName}
                    user = {username}
                    qrString = {QRString}
                    setQRref = {setQRref}
                    shareQR = {shareHandler}
                    saveQR = {saveQrToDisk}
                />
            </ImageBackground>
        </View>
    )
}

export default QRCodeScreen