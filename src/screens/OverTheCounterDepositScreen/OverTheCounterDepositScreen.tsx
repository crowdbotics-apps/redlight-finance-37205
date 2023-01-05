import React,{FC,useState} from 'react'
import {View,Text, ImageBackground,TextInput,FlatList,Platform,StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomHeader'
import PrimaryButton from '../../components/PrimaryButton'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'
import { Colors } from '../../theme/Colors'
import { Strings } from '../../util/Strings'
import {DATA} from '../../util/index'
import AmountButton from './AmountButton'
import styles from './styles'

const OverTheCounterDepositScreen  : FC = () =>{ 
    const [fees,setFees] = useState(25.00)
    const [amount,setAmount] = useState(0.00)
    const navigation = useNavigation()

    const textInputChangeHandler = (newAmount:any) =>{
        setAmount(newAmount)
    }

    const clickHandler = () =>{
        navigation.navigate('DepositConfirmationScreen')
    }

    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name={Strings.CASH_IN}
                    Icon = {<Icons.LeftArrow/>}
                    isIconVisible={true} 
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                    onPress={()=>navigation.goBack()}
                />
                <View style={styles.mainContainer}>
                    <View style={styles.section1}>
                        <Text style={styles.text}>{Strings.CURRENT_BALANCE}</Text>
                        <Text style={styles.headerSubText}>Php 256.43</Text>
                    </View>
                    <View style={styles.section2}>
                        <View style={styles.logo}>
                            <View style={styles.img}/>
                            <View style={styles.textContainer}>
                                <Text style={styles.logoText}>Match move</Text>
                                <Text style={styles.logoSubText}>via match move</Text>
                            </View>
                        </View>
                        <View style={{marginTop : 30,paddingHorizontal  :30}}>
                            <Text style={styles.text}>{Strings.AMOUNT}</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={textInputChangeHandler}
                                value={amount}
                                placeholder={Strings.AMOUNT}
                                placeholderTextColor={Colors.MediumDarkGray}
                                keyboardType="numeric"
                            />
                        </View>
                        <FlatList
                            data = {DATA}
                            renderItem = {({item})=> <AmountButton 
                                                        amount={item} 
                                                        selected = {amount}
                                                        onPress={textInputChangeHandler}
                                                    />}
                            numColumns= {3}
                            style={{marginHorizontal : 20}}
                        />
                        <View style={styles.line}/>
                    </View>
                    <View style={styles.section3}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{Strings.CASH_IN_AMOUNT}</Text>
                            <Text 
                                style={styles.text}
                            >  
                                {amount ? parseInt(amount).toFixed(2) : parseInt('0').toFixed(2)}
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>{Strings.FEES}</Text>
                            <Text style={styles.text}>{fees.toFixed(2)}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.totalText}>{Strings.TOTAL}</Text>
                            <Text 
                                style={styles.totalText}
                            >
                                { amount ? (parseInt(amount) + parseInt(fees)).toFixed(2) 
                                    : parseInt(fees).toFixed(2)
                                }
                            </Text>
                        </View>
                    </View>
                    <PrimaryButton
                        text = {Strings.NEXT}
                        onPress = {clickHandler}
                        style = {{marginBottom : Platform.OS === 'ios' ? 30 : 20 ,
                                    paddingHorizontal : 30}}
                        btnStyle = {{}}
                    />
                </View>
            </ImageBackground>
       </View>
    )
}

export default OverTheCounterDepositScreen

