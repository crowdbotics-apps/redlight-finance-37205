import { useNavigation } from "@react-navigation/native";
import React, {useEffect, useState } from "react";
import { Alert, ImageBackground, Modal, Text, TouchableOpacity, View,Platform } from "react-native";
import Icons from "../../assets/Icons";
import Images from "../../assets/Images";
import DeleteModal from "../../components/DeleteModal";
import Popup from "../../components/Popup";
import { deleteAccount } from "../../services/auth";
import { removeItem } from "../../util";
import { Strings } from "../../util/Strings";
import styles from './styles'
import CustomHeader from "../../components/CustomHeader";

const Setting = ({route} : any) => {
    const {pinPopUp} = route.params
    const [isPopupVisible, setIsPopUpVisible] = useState(false)
    const [password, setPassword] = useState<string>("")
    const [pinPopUpVisible, setPinPopUpVisible] = useState(false)
    const navigation = useNavigation();
    useEffect(()=>{
        setPinPopUpVisible(pinPopUp)
    },[route])
    const ChangePassword = () => {
        navigation.navigate('ChangePasswordScreen')
    }
    const CreditLimits = () => {
        navigation.navigate('')
    }
    const SetPinCode = () => {
        navigation.navigate("SetPinScreen")
    }
    const DeleteAccount = () => {
        setIsPopUpVisible(true)
    }
    const onDeleteAccountHandler = () => {
        const data = { "password": password }
        console.log(password, data)
        deleteAccount(data).then((response) => {
            console.log(response)
            if (response?.status == 400) {
                console.log("error occured")
                Alert.alert(Strings.incorrectPassword)
                return
            }
            console.log('res', response, 'data', data)
            setPassword("")
            removeItem("token")
            navigation.navigate("SigninScreen")
        })
    }
    const doneButtonHandler = () => {
        setPinPopUpVisible(false)
    }
    const RowContainer = ({ tabName, onPressFunction }: any) => {
        return (
            <View style={styles.Tab}>
                <TouchableOpacity onPress={onPressFunction}>
                    <Text style={styles.tabName}>{tabName}</Text>
                </TouchableOpacity>
                <View>
                    <Icons.RightArrow />
                </View>
            </View>
        )
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.Image}>
                <CustomHeader 
                    name={Strings.SETTINGS}
                    Icon = {<Icons.LeftArrow/>}
                    isIconVisible={true} 
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                    onPress={()=>navigation.goBack()}
                />
                <View style={styles.Container}>
                    <Text style={styles.Heading}>Account</Text>
                    <RowContainer
                        tabName="Change Password"
                        onPressFunction={ChangePassword} />
                    <RowContainer
                        tabName="Credit Limits"
                        onPressFunction={CreditLimits} />
                    <Text style={styles.Heading}>Security</Text>
                    <RowContainer
                        tabName="Set PIN code"
                        onPressFunction={SetPinCode} />
                    {/* <RowContainer
                        tabName="Enable Biometrics"
                        onPressFunction={ChangePassword} /> */}
                    <TouchableOpacity onPress={DeleteAccount}>
                        <Text style={styles.deleteAccount}>Delete Account</Text>
                    </TouchableOpacity>
                    <DeleteModal
                        isPopupVisible={isPopupVisible}
                        Heading={Strings.deleteMsg}
                        buttonLabel="Delete Account"
                        setIsPopupVisible={setIsPopUpVisible}
                        password={password}
                        setPassword={setPassword}
                        onPressFunction={onDeleteAccountHandler} 
                    />
                    {true && (<Popup
                        isCustomInputVisible={false}
                        isPopupVisible={pinPopUpVisible}
                        Heading={Strings.PIN_CREATED_SUCCESSFULLY}
                        buttonLabel="Done"
                        onPressFunction={doneButtonHandler}
                        setIsPopupVisible = {setPinPopUpVisible}
                    />)}
                    
                </View>
            </ImageBackground>
        </View>
    )
}

export default Setting