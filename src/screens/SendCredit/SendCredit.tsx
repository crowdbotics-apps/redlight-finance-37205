import React,{FC,useState,useRef,useEffect} from 'react'
import {
    View,
    Text, 
    ImageBackground,
    StatusBar,
    Platform,
    TextInput,
    TouchableOpacity,
    Alert} from 'react-native'
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
import { getUserDetailsByPhone,
         getUserDetailsByEmail,
         getUserDetailsByPublicAddress,
         sendCredit } from '../../services/creditServices';
import { isValidEmail } from '../../util';

const SendCredit : FC = ()=>{
    const navigation = useNavigation()
    const refRBSheet = useRef();
    const [allWallets,setAllWallets] = useState([])
    const [selectedWallet,setSelectedWallet] = useState()
    const [sendCreditMode,setSendCreditMode] = useState()
    const [receiverAddress,setReceiverAddress] = useState()
    const [phoneNumber,setPhoneNumber] = useState()
    const [email,setEmail] = useState()
    const [amount,setAmount] = useState(0.00)
    const [name,setName] = useState()
    const [isLoading,setIsLoading] = useState(false)

    useEffect(()=>{
        getAllWallets().then(response=>{
            setAllWallets(response)
        })
        .catch(error=>{
            console.log('error',error);     
        })
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

    const phoneChangeHandler = (newPhone) =>{
        setPhoneNumber(newPhone)
    }

    const emailChangeHandler = (newEmail) =>{
        setEmail(newEmail)
        // if(isValidEmail(email)){
        //     setEmail(newEmail)
        //     return
        // }
        // Alert.alert("Email is not Valid")
    }

    const nameChangeHandler = (newName) =>{
        setName(newName)
    }

    const sendCreditModeHandler = (newMode) =>{
        setSendCreditMode(newMode)
    }

    const walletHandler = (walletId) =>{
        const filteredWallet = allWallets.filter(wallet=>wallet.id === walletId)
        setSelectedWallet(filteredWallet[0])
        closeBottomsheetHandler()
    }

    const sendCreditHandler = () =>{
        const data = {
            wallet_id : selectedWallet.id,
            receiver_address : receiverAddress,
            transaction_amount : parseInt(amount),
            wallet_type : selectedWallet.wallet_type,

        }
        sendCredit(data).then(response=>{
            if(response.status === 400){
                Alert.alert(response.data.non_field_errors[0])
                return
            }
            setIsLoading(false)
            setAmount()
            setPhoneNumber()
            setEmail()
            setReceiverAddress()
            console.log('q',response)
        })
        .catch(error=>{
            setIsLoading(false)
            console.log('error',error);     
        })
    }

    const sendHandler = () =>{
        setIsLoading(true)
        if(sendCreditMode === 1){
            const phone = phoneNumber;
            console.log(phone)
            getUserDetailsByPhone(phone).then(response=>{
                setReceiverAddress(response.public_address.ethereum)
                setIsLoading(false)
                Alert.alert(`You are sending credit to ${response.username}.`,'Are you Okay?',
                    [
                    {
                        text: 'OK',
                        onPress: sendCreditHandler,
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                    },
                ]
            )})
            .catch(error=>{
                console.log('error',error);     
            })
        }
        else if( sendCreditMode === 2){
            getUserDetailsByEmail(email).then(response=>{
                setIsLoading(false)
                setReceiverAddress(response.public_address.ethereum)
                Alert.alert(`You are sending credit to ${response.username}.`,'Are you Okay?',
                    [
                    {
                        text: 'OK',
                        onPress: sendCreditHandler,
                    },
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                    },
                ]
            )
            })
            .catch(error=>{
                console.log('error',error);     
            })
        }
        else{
            getUserDetailsByPublicAddress(receiverAddress).then(response=>{
                setIsLoading(false)
            })
            .catch(error=>{
                console.log('error',error);     
            })
        }
      
    }
    console.log('receiverAddress',receiverAddress)
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
                           <Text 
                                style={styles.placeholderText}
                            >
                                {selectedWallet?selectedWallet?.wallet_name : "Select from"}
                            </Text>  
                           <SvgXml
                                xml={Icons.DownArrow}
                                width={10}
                                height={10}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text 
                        style={styles.balanceText}
                    >
                     Balance:  {selectedWallet?parseInt(selectedWallet?.wallet_balance).toFixed(2) : "0.00"}
                    </Text>
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
                            <TouchableOpacity 
                                style={[styles.item,
                                    {backgroundColor : sendCreditMode === 1 ? 
                                        Colors.RedBaron : 
                                        Colors.PineTree}
                                ]}
                                onPress = {() => sendCreditModeHandler(1)}
                            >
                                <Icons.MobileIcon color={sendCreditMode === 1 ? Colors.white : 
                                                            Colors.RedBaron}
                                />
                                <Text style={styles.itemText}>{Strings.MOBILE}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                 style={[styles.item,
                                    {backgroundColor : sendCreditMode === 2 ? 
                                        Colors.RedBaron : 
                                        Colors.PineTree}
                                ]}
                                onPress = {() => sendCreditModeHandler(2)}
                            >
                                 <Icons.EmailIcon color={sendCreditMode === 2 ? Colors.white : 
                                                                Colors.RedBaron}
                                  />
                                <Text style={styles.itemText}>{Strings.EMAIL}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                 style={[styles.item,
                                    {backgroundColor : sendCreditMode === 3 ? 
                                        Colors.RedBaron : 
                                        Colors.PineTree}
                                ]}
                                onPress = {() => sendCreditModeHandler(3)}
                            >
                                 <Icons.QrIcon color={sendCreditMode === 3 ? Colors.white : 
                                                        Colors.RedBaron}
                                 />
                                <Text style={styles.itemText}>{Strings.QR_CODE}</Text>
                            </TouchableOpacity>
                        </View>
                        {sendCreditMode === 1 && <View style={{marginTop : 30}}>
                            <Text style={styles.text}>{Strings.MOBILE_PHONE}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={phoneChangeHandler}
                                value={phoneNumber}
                                placeholder={Strings.MOBILE}
                                placeholderTextColor={Colors.Gray78}
                                keyboardType  = "numeric"
                            />
                        </View>
                        }
                        {sendCreditMode === 2 && <View style={{marginTop : 30}}>
                            <Text style={styles.text}>{Strings.EMAIL}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={emailChangeHandler}
                                value={email}
                                placeholder={Strings.EMAIL}
                                placeholderTextColor={Colors.Gray78}
                                keyboardType = "email-address"
                            />
                        </View>
                        }
                        {sendCreditMode === 3 && <View style={{marginTop : 30}}>
                            <Text style={styles.text}>{Strings.RECIPIENTS_NAME}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={nameChangeHandler}
                                value={name}
                                placeholder={Strings.RECIPIENTS_NAME}
                                placeholderTextColor={Colors.Gray78}
                            />
                        </View>
                        }
                    </View>   
                        <PrimaryButton
                            isLoading={isLoading}
                            disabled = {!(selectedWallet && 
                                            amount && 
                                            sendCreditMode &&
                                            (email|| phoneNumber|| receiverAddress)
                                        )}
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
                    walletList = {allWallets}
                    onWalletHandle={walletHandler}
                />
            </RBSheet>
        </View>
    )
}

export default SendCredit
