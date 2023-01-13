import React,{FC,useState,useRef} from 'react'
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

const MoveCredit : FC = ()=>{
    const navigation = useNavigation()
    const refRBSheet = useRef();
    const [wallet,setWallet] = useState('23')
    const [amount,setAmount] = useState(0.00)

    const openBottomsheetHandler = ()=>{
        refRBSheet.current.open()
    }

    const closeBottomsheetHandler = () =>{
        refRBSheet.current.close()
    }

    const amountChangeHandler = (newAmount:any) =>{
        setAmount(newAmount)
    }

    const moveHandler = () =>{

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
                    <View style={{marginTop : 40}}>
                        <Text style={styles.text}>{Strings.MOVE_TO}</Text>
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
                    <View style={styles.errorView}>
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
                    <PrimaryButton
                        // isLoading={isLoading}
                        // disabled = {!(wallet && amount)}
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
                    walletHandler={()=>{}}
                />
            </RBSheet>
        </View>
    )
}

export default MoveCredit
