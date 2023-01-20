import React,{useState} from 'react'
import {
    View,
    Text,
    ImageBackground,
    Platform,
    StatusBar} from 'react-native'
import CustomHeader from '../../components/CustomHeader'
import PrimaryButton from '../../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import Images from '../../assets/Images'
import { Strings } from '../../util/Strings'
import Icons from '../../assets/Icons'
import styles from './styles'

const HelpCenter = () =>{
    const navigation = useNavigation()
    const [code,setCode] = useState()

    const loginHandler = () =>{
        
    }
    return  (
        <View style={{marginTop : -10}}>
        <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
            <StatusBar barStyle='light-content'/>
            <CustomHeader 
                name={Strings.ENTER_PIN}
                Icon = {<Icons.LeftArrow/>}
                isIconVisible={true} 
                headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                onPress={()=>navigation.goBack()}
            />
            <View style={styles.mainContainer}>
                <Text style={styles.name}>Jackson889</Text>
                <Text style={styles.subText}>{Strings.PLEASE_ENTER_YOUR_PIN_IN_ORDER_TO_LOG_IN}</Text>
                <OTPInputView
                        style={styles.inputContainer}
                        pinCount={6}
                        code={code}
                        onCodeChanged={setCode}
                        autoFocusOnLoad
                        codeInputFieldStyle={styles.textInput}
                        codeInputHighlightStyle={styles.underlineStyleHighLighted}
                    />
                <PrimaryButton
                    // isLoading={isLoading}
                    // disabled = {!isCheckboxChecked}
                    text = {Strings.LOG_IN}
                    onPress = {loginHandler}
                    style={{position:'absolute',bottom : 30,width : '100%',alignSelf : 'center'}}
                />
            </View>
        </ImageBackground>
        </View>
    )
}

export default HelpCenter