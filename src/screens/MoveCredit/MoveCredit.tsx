import React,{FC,useState,useEffect,useRef} from 'react'
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
import { getAllWallets, getFiatWallets } from '../../services/homeServices';
import { moveCredit } from '../../services/creditServices';

const MoveCredit : FC = ()=>{
    const navigation = useNavigation()
    const refRBSheet = useRef();
    const [allWallets,setAllWallets] = useState([])
    const [toBeSelectedWallet,setToBeSelectedWallet] = useState()
    const [selectFromWallet,setSelectedFromWallet] = useState()
    const [moveToWallet,setMoveToWallet] = useState()
    const [isLoading,setIsLoading]  = useState(false)
    const [amount,setAmount] = useState(0.00)

    useEffect(()=>{
        getFiatWallets().then(response=>{
            setAllWallets(response)
        })
        .catch(error=>{
            console.log('error',error);     
        })
    },[])

    const openBottomsheetHandler = (wallet)=>{
        setToBeSelectedWallet(wallet)
        refRBSheet.current.open()
    }

    const closeBottomsheetHandler = () =>{
        refRBSheet.current.close()
    }

    const walletHandler = (walletId) =>{
        const filteredWallet = allWallets.filter(wallet=>wallet.id === walletId)
        if(toBeSelectedWallet === 1){
            setSelectedFromWallet(filteredWallet[0])
        }
        else{
            setMoveToWallet(filteredWallet[0])
        }
        closeBottomsheetHandler()
    }

    const amountChangeHandler = (newAmount:any) =>{
        setAmount(newAmount)
    }

    const moveHandler = () =>{
        setIsLoading(true)
        const data = {
            send_wallet_id : selectFromWallet.id,
            receive_wallet_id : moveToWallet.id,
            transaction_amount : parseInt(amount)
        }
        moveCredit(data).then(response=>{
            if(response.status === 400){
                setIsLoading()
                Alert.alert(response?.data?.non_field_errors[0],)
                return
            }
            setIsLoading(false)
            Alert.alert('Credit moved successfully!!','',
            )       
        })
        .catch(error=>{
            setIsLoading(false)
            console.log('error',error);     
        })
    }

    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name={Strings.MOVE_CREDITS}
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
                            onPress = {() => openBottomsheetHandler(1)}
                        >
                            <Text 
                                style={styles.placeholderText}
                            >
                                {selectFromWallet?selectFromWallet?.wallet_name : "Select Wallet"}
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
                        Balance:  {selectFromWallet?parseInt(selectFromWallet?.wallet_balance).toFixed(2) : "0.00"}
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
                    <View style={{marginTop : 40}}>
                        <Text style={styles.text}>{Strings.MOVE_TO}</Text>
                        <TouchableOpacity 
                            style={[styles.input,styles.btn]}
                            onPress = {() => openBottomsheetHandler(2)}
                        >
                             <Text 
                                style={styles.placeholderText}
                            >
                                {moveToWallet?moveToWallet?.wallet_name : "Select Wallet"}
                            </Text> 
                           <SvgXml
                                xml={Icons.DownArrow}
                                width={10}
                                height={10}
                            />
                        </TouchableOpacity>
                    </View>
                    {(selectFromWallet?.id === moveToWallet?.id) && <View style={styles.errorView}>
                        <SvgXml
                            xml={Icons.InfoIcon}
                            width={20}
                            height={20}
                        />
                        <Text 
                            style={styles.errorText}
                        >
                            {Strings.YOU_CANT_MOVE_CREDITS_IN_SAME_WALLET}
                        </Text>
                    </View>
                    }
                    <PrimaryButton
                        isLoading={isLoading}
                        disabled = {!(
                            selectFromWallet && 
                            amount && 
                            moveToWallet && 
                            selectFromWallet.id !== moveToWallet.id
                        )}
                        text = {Strings.MOVE}
                        onPress = {moveHandler}
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

export default MoveCredit
