import React,{FC} from 'react'
import {View,Text, ImageBackground,Platform,StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomHeader'
import PrimaryButton from '../../components/PrimaryButton'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'
import { Strings } from '../../util/Strings'
import styles from './styles'

const DepositConfirmationScreen  : FC = () =>{
    const navigation = useNavigation()

    const payHandler = () =>{
        navigation.navigate('OverTheCounterDeposit')
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
                        <View style={styles.logo}>
                            <View style={styles.img}/>
                            <View style={styles.textContainer}>
                                <Text style={styles.logoText}>Match move</Text>
                                <Text style={styles.logoSubText}>via match move</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.section2}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{Strings.ORDER_NUMBER}</Text>
                            <Text style={styles.text}>28HS837OS</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>{Strings.DEPOSIT_AMOUNT}</Text>
                            <Text style={styles.text}> 225.00</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.text}>{Strings.PAYMENT_DEADLINE}</Text>
                            <Text style={styles.text}>12/15/2022</Text>
                        </View>
                        <View style={styles.paraContainer}>
                            <Text style={[styles.text,{fontSize : 15}]}>
                                  Nunc viverra id et et id egestas est. Eleifend scelerisque sit 
                                  est augue feugiat mauris tellus gravida. Faucibus penatibus volutpat
                                  ultrices mi velit nunc.
                            </Text>
                        </View>
                    </View>
                    <PrimaryButton
                        text = {Strings.PAY_WITH_DRAGON_PAY}
                        onPress = {payHandler}
                        style = {{marginBottom : Platform.OS === 'ios' ? 30 : 20}}
                        btnStyle = {{}}
                    />
                </View>
            </ImageBackground>
       </View>
    )
}

export default DepositConfirmationScreen

