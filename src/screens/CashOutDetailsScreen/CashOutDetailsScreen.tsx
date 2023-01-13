import React,{FC,useState} from 'react'
import {View,Text, ImageBackground,TextInput,Platform,StatusBar} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomHeader'
import PrimaryButton from '../../components/PrimaryButton'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'
import { Colors } from '../../theme/Colors'
import { Strings } from '../../util/Strings'
import styles from './styles'

const CashOutDetailsScreen  : FC = () =>{
    const [fees,setFees] = useState(25.00)
    const [amount,setAmount] = useState(0.00)
    const navigation = useNavigation()

    const textInputChangeHandler = (newAmount:any) =>{
        setAmount(newAmount)
    }

    const clickHandler = () =>{
        
    }

    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name={Strings.CASH_OUT}
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
                        <View style={{marginTop : 30}}>
                            <Text style={styles.text}>
                                    {Strings.CURRENT_BALANCE}
                                    <Text style={styles.smallText}>  Php 0.00</Text>
                            </Text>
                            <Dropdown
                                style={styles.input}
                                placeholderStyle={styles.placeholderStyle}
                                // selectedTextStyle={styles.selectedTextStyle}
                                // inputSearchStyle={styles.inputSearchStyle}
                                // iconStyle={styles.iconStyle}
                                // data={data}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder={Strings.SELECT_FROM}
                                // searchPlaceholder="Search..."
                                // value={value}
                                // onFocus={() => setIsFocus(true)}
                                // onBlur={() => setIsFocus(false)}
                                // onChange={item => {
                                //     setValue(item.value);
                                //     setIsFocus(false);
                                // }}
                                // renderLeftIcon={() => (
                                //     <AntDesign
                                //     style={styles.icon}
                                //     color={isFocus ? 'blue' : 'black'}
                                //     name="Safety"
                                //     size={20}
                                //     />
                                // )}
                            />
                        </View>
                        <View style={{marginTop : 20}}>
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
                    </View>
                    <View style={styles.section2}>
                        <View style={styles.row}>
                            <Text style={styles.text}>{Strings.METHOD}</Text>
                            <Text style={styles.text}>Match move</Text>
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
                    <View style= {styles.footer}>
                        <Text style={styles.footerText}>
                            PESONet has applied a two-batch settlement proccess for each banking 
                            day. Batch 1: Cash outs created before  3:00PM cut-off are credited 
                            on or before 11:00PM the same banking day. PESONet cash outs created 
                            after cut-off, weekends or holidays, are credited on or before 11:00PM 
                            on the next banking day.
                        </Text>
                    </View>
                    <PrimaryButton
                        text = {Strings.NEXT}
                        onPress = {clickHandler}
                        style = {{marginBottom : Platform.OS === 'ios' ? 30 : 20}}
                        btnStyle = {{}}
                    />
                </View>
            </ImageBackground>
       </View>
    )
}

export default CashOutDetailsScreen

