import React,{useState} from 'react'
import {View,ScrollView,Text,ImageBackground, TouchableOpacity, KeyboardAvoidingView,Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import Images from '../../assets/Images'
import Header from '../../components/Header'
import Circle  from '../../components/Circle'
import CustomInput  from '../../components/CustomInput'
import PrimaryButton from '../../components/PrimaryButton'
import { Colors } from '../../theme/Colors'

const Signup = ()=>{
    const [mobileNumber,setMobileNumber] = useState<String>('')
    const [firstName,setFirstName] = useState<String>('')
    const [middleName,setMiddleName] = useState<String>('')
    const [lastName,setLastName] = useState<String>('')
    const [password,setPassword] = useState<String>('')
    const [confirmPassword,setConfirmPassword] = useState<String>('')
    const [selectedTab,setSelectedTab] = useState<Number>(1)

    const navigation = useNavigation();

    const tabChangeHandler = () =>{
        if(selectedTab === 1)
            setSelectedTab(2)
        else
            setSelectedTab(1)
    }
    
    return(
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <Header onPress={()=>navigation.goBack()}/>
                
                <ScrollView style={styles.body} >
                    <Circle sourceImage={Images.Laptop} CircleStyle={styles.circle}/>

                    <Text style={styles.headingText}>Register new account</Text>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity 
                            style={[styles.tab,
                                {borderTopStartRadius : 10,borderBottomLeftRadius : 10},
                                {backgroundColor : selectedTab === 1 ? Colors.RedBaron  : Colors.EerieBlack}]}
                            onPress = {selectedTab !== 1 ? tabChangeHandler : undefined}
                            >
                            <View>
                                <Text style={styles.tabText}>Phone number</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.tab,
                                {borderTopRightRadius : 10,borderBottomRightRadius : 10},
                                {backgroundColor : selectedTab === 2 ? Colors.RedBaron  : Colors.EerieBlack}]}
                            onPress = {selectedTab !== 2 ? tabChangeHandler : undefined}
                            >
                            <View>
                                <Text style={styles.tabText}>Email</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <CustomInput
                        label = "Mobile phone"
                        value={mobileNumber}
                        onChangeText = {setMobileNumber}
                        keyboardType = "number-pad"
                    />
                    <CustomInput
                        label = "First name"
                        value={firstName}
                        onChangeText = {setFirstName}
                    />
                    <CustomInput
                        label = "Middle name"
                        value={middleName}
                        onChangeText = {setMiddleName}
                    />
                    <CustomInput
                        label = "Last name"
                        value={lastName}
                        onChangeText = {setLastName}
                    />
                    <CustomInput
                        label = "Password"
                        value={password}
                        onChangeText = {setPassword}
                        isIconVisible = {true}
                        secureTextEntry = {true}
                    />
                    <CustomInput
                        label = "Confirm password"
                        value={confirmPassword}
                        onChangeText = {setConfirmPassword}
                        isIconVisible = {true}
                        secureTextEntry = {true}
                    />

                    <PrimaryButton
                        isLoading={false}
                        text = "Sign up"
                        onPress = {()=>{}}
                    />

                    <View style={styles.footerView}>
                        <View style={styles.hairline}/>
                        <Text style={styles.footerText}>or</Text>
                        <View style={styles.hairline}/>
                    </View>

                    <PrimaryButton
                        isLoading={false}
                        text = "Sign in"
                        onPress = {()=>{}}
                    />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default Signup
