import React, {FC, useState ,useEffect,useRef} from 'react';
import { 
    View,
    Text,
    ImageBackground,
    StatusBar,
    Platform,
    TouchableOpacity,
    Alert,
    PermissionsAndroid,
    ToastAndroid} from 'react-native';
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import ImagePicker from 'react-native-image-crop-picker';
import RNQRGenerator from 'rn-qr-generator'
import RNFS from 'react-native-fs'
import Share from 'react-native-share';
import moment from 'moment'
import { useNavigation } from '@react-navigation/native';
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import {getAllWallets,getWalletQR } from '../../services/homeServices';
import CustomHeader from '../../components/CustomHeader';
import QrCode from '../../components/QrCode';
import { Colors } from '../../theme/Colors';
import Images from '../../assets/Images'
import Icons from '../../assets/Icons';
import styles from './styles';

const QRScanner : FC = () => {
    const navigation = useNavigation();

    const scanner  = useRef()
    const [data,setData] = useState('')
    const [QRref,setQRref] = useState()
    const [walletName,setWalletName] = useState('')
    const [username,setUsername] = useState('')
    const [QRString,setQRString] = useState('')
    const [selectedTab,setSelectedTab] = useState(1)

    useEffect(()=>{
        getAllWallets().then(wallets=>{
            const filteredWallet = wallets.filter(wallet => wallet.is_default === true)[0]
            
            getWalletQR(filteredWallet.id).then(response=>{       
                setWalletName(response.wallet_name)
                setUsername(response.user.username)
                setQRString(response.public_address)
            })
            .catch(error=>{
                console.log(error.response); 
            })
        })
        .catch(error=>{
            console.log('error',error);     
        })   
    },[])

    const tabChangeHandler = ()=>{
        if(selectedTab === 1){
            setSelectedTab(2)
        }
        else{
            setSelectedTab(1)
        }
    }

    const onSuccess = (e:any) => {
       setData(e.data)
       Alert.alert('scanned successfully!!'," ",
       [
           { text: "OK", onPress: () => {
            setData('')
            if(scanner) 
                scanner.current.reactivate()
           }}
       ]
        )
    };

    const uploadHandler  = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            RNFS.readFile(image.path, 'base64')
            .then(res =>{
                RNQRGenerator.detect({
                    base64 : res
                })
                .then(response => {
                   setData(response.values[0])
                })
                .catch(error => console.log('Cannot detect QR code in image', error)); 
                    });
           
        });
    }

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
                        Alert.alert('QR saved successfully!!') : 
                        ToastAndroid.show('QRCode saved to gallery', ToastAndroid.LONG);
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
                name="Pandoras Vault QR Code" 
                Icon = {<Icons.CrossIcon/>}
                isIconVisible={true} 
                headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 30}}
                onPress={()=>navigation.goBack()}
            />
            <View style={styles.tabContainer}>
                <TouchableOpacity 
                    style={[styles.tab,
                        {borderTopStartRadius : 10,borderBottomLeftRadius : 10},
                        {backgroundColor : selectedTab === 1 ? Colors.RedBaron  : Colors.EerieBlack}]}
                    onPress = {selectedTab !== 1 ? tabChangeHandler : undefined}
                >
                    <View>
                        <Text style={styles.btnText}>Scan</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.tab,
                        {borderTopRightRadius : 10,borderBottomRightRadius : 10},
                        {backgroundColor : selectedTab === 2 ? Colors.RedBaron  : Colors.EerieBlack}]}
                    onPress = {selectedTab !== 2 ? tabChangeHandler : undefined}
                >
                    <View>
                        <Text style={styles.btnText}>My QR Code</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {selectedTab === 1 ?
                <QRCodeScanner
                    onRead={onSuccess}
                    showMarker = {true}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    cameraStyle = {{width : '100%',height : '100%'}}
                    customMarker = {<View style={styles.marker}/>}
                    ref={scanner}
                    bottomContent = {
                        <View style={{position : 'absolute',bottom : 50}}>  
                            {data  ? <Text style={styles.bottomText}>{data}</Text> : null}
                            <Text style={styles.bottomText}>
                                Place your code inside of the box.
                            </Text>
                            <TouchableOpacity style={styles.btn} onPress = {uploadHandler}>
                                <View style={styles.btnView}>
                                    <Icons.UploadIcon/>
                                    <Text style={[
                                        styles.btnText,
                                        {marginStart : 15}]}
                                    >
                                        Upload from gallery
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    }
                />  : 
                <QrCode
                    wallet = {walletName}
                    user = {username}
                    qrString = {QRString}
                    setQRref = {setQRref}
                    shareQR = {shareHandler}
                    saveQR = {saveQrToDisk}
                />       
            }
            
        </ImageBackground>
    </View>
  )
};

export default QRScanner;


