import React,{FC,useState,useRef,useEffect} from 'react'
import {
    View,
    Text, 
    ImageBackground,
    StatusBar,
    Platform,
    TextInput,
    TouchableOpacity,} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import RBSheet from 'react-native-raw-bottom-sheet';
import { SvgXml } from 'react-native-svg';
import { Strings } from '../../util/Strings'
import Images from '../../assets/Images'
import { Colors } from '../../theme/Colors'
import Icons from '../../assets/Icons'
import styles from './styles'
import CustomHeader from '../../components/CustomHeader'
import PrimaryButton from '../../components/PrimaryButton';
import TokenWalletPopup from '../../components/TokenWalletPopup';
import {getAllWallets } from '../../services/homeServices';

const SendCredit : FC = ()=>{
    const navigation = useNavigation()
    const refRBSheet = useRef();
    const [wallet,setWallet] = useState('23')
    const [amount,setAmount] = useState(0.00)
    const [name,setName] = useState()

    useEffect(()=>{

    },[])

    const openBottomsheetHandler = ()=>{
        refRBSheet.current.open()
    }

    const closeBottomsheetHandler = () =>{
        refRBSheet.current.close()
    }

    const amountChangeHandler = (newAmount:any) =>{
        setAmount(newAmount)
    }

    const nameChangeHandler = (newName) =>{
        setName()
    }

    const sendHandler = () =>{

    }
    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name={Strings.SEND_CREDITS}
                    Icon = {<Icons.LeftArrow/>}
                    isIconVisible={true} 
                    onPress={()=>navigation.goBack()}
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                />
                <View style={styles.mainContainer}>
                    <View style={{marginTop : 10}}>
                        <Text style={styles.text}>{Strings.SELECT_FROM}</Text>
                        <TouchableOpacity 
                            style={[styles.input,styles.btn]}
                            onPress = {openBottomsheetHandler}
                        >
                           <Text style={styles.placeholderText}>First Wallet</Text>  
                           <SvgXml
                                xml={Icons.DownArrow}
                                width={10}
                                height={10}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.balanceText}>Balance:  235.00</Text>
                    <View style={{marginTop : 20}}>
                        <Text style={styles.text}>{Strings.AMOUNT}</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={amountChangeHandler}
                            value={amount}
                            placeholder={Strings.ENTER_AMOUNT}
                            placeholderTextColor={Colors.Gray78}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.sendCreditView}>
                        <Text style={styles.text}>{Strings.SEND_CREDITS_VIA}</Text>
                        <View style={styles.creditViaContainer}>
                            <TouchableOpacity style={styles.item}>
                                <SvgXml
                                    xml={Icons.MobileIcon}
                                    width={50}
                                    height={50}
                                />
                                <Text style={styles.itemText}>{Strings.MOBILE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <SvgXml
                                    xml={Icons.EmailIcon}
                                    width={50}
                                    height={50}
                                />
                                <Text style={styles.itemText}>{Strings.EMAIL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.item}>
                                <SvgXml
                                    xml={Icons.QrIcon}
                                    width={50}
                                    height={50}
                                />
                                <Text style={styles.itemText}>{Strings.QR_CODE}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop : 30,}}>
                            <Text style={styles.text}>{Strings.RECIPIENTS_NAME}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={nameChangeHandler}
                                value={name}
                                placeholder={Strings.RECIPIENTS_NAME}
                                placeholderTextColor={Colors.Gray78}
                            />
                        </View>
                    </View>   
                        <PrimaryButton
                            // isLoading={isLoading}
                            disabled = {!(wallet && amount)}
                            text = {Strings.SEND}
                            onPress = {sendHandler}
                            style={{position:'absolute',bottom : 20,width : '100%',alignSelf : 'center'}}
                        />
                </View>
            </ImageBackground>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={false}
                height = {300}
                customStyles={{
                wrapper: {
                //    backgroundColor  : "transparent"     
                },
                container : {
                    backgroundColor : Colors.aubergine,
                    borderTopLeftRadius : 20,
                    borderTopRightRadius : 20,
                    paddingHorizontal : 20,
                    paddingBottom : 30
                }
                }}
              >
                <TokenWalletPopup 
                    onPress={closeBottomsheetHandler} 
                    walletHandler={()=>{}}
                />
            </RBSheet>
        </View>
    )
}

export default SendCredit
