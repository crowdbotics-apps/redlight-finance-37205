import React,{FC,useState} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    ImageBackground,
    StatusBar,
    Platform,
    TextInput,
    TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import { Strings } from '../../util/Strings'
import Images from '../../assets/Images'
import { Colors } from '../../theme/Colors'
import Icons from '../../assets/Icons'
import { Fonts } from '../../assets/fonts';
import CustomHeader from '../../components/CustomHeader'
import PrimaryButton from '../../components/PrimaryButton';
import { SvgXml } from 'react-native-svg';

const SendCredit : FC = ()=>{
    const navigation = useNavigation()
    const [amount,setAmount] = useState(0.00)
    const [name,setName] = useState()

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
                        <TouchableOpacity style={[styles.input,styles.btn]}>
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
                            <View style={styles.item}>

                            </View>
                            <View style={styles.item}>

                            </View>
                            <View style={styles.item}>

                            </View>
                        </View>
                        <View style={{marginTop : 30}}>
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
                   <View>
                    {/* <PrimaryButton
                            
                    /> */}
                </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SendCredit

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    mainContainer : {
        flex:1,
        width  : '100%',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        backgroundColor : Colors.aubergine,
        padding : 35,
    },
    input: {
        height: 40,
        padding: 10,
        borderRadius : 10,
        marginTop : 6,
        backgroundColor : Colors.aubergine,
        color  : Colors.white,
        elevation : 5,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
    },
    btn : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    text : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 22,
        color : Colors.white,
    },
    placeholderText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    balanceText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '500',
        fontSize : 12,
        lineHeight : 18,
        color : Colors.Gray78,
        marginTop : 3
    },
    sendCreditView : {
        marginTop : 30,
        flex:1,
    },
    creditViaContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 20
    },
    item : {
        width : '30%',
        height : 80,
        borderRadius : 10,
        backgroundColor : Colors.PineTree
    }
})