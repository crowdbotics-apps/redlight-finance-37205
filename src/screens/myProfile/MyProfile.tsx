import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Alert, Image, ImageBackground, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs'
import { IconProps } from "react-native-vector-icons/Icon";
import Icons from "../../assets/Icons";
import Images from "../../assets/Images";
import Popup from "../../components/Popup";
import { getAllFIATWallets, signOut, signup } from "../../services/auth";
import { Colors } from "../../theme/Colors";
import { removeItem } from "../../util";
import { Strings } from "../../util/Strings";
import styles from './styles'
import { myProfile } from '../../services/auth'
import { uploadPhoto } from "../../services/profileServices";

const MyProfile = () => {
    const navigation = useNavigation();
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const RowContainer = ({ iconName, OptionText, onPressFunction, textStyle }) => {
        return (
            <View style={styles.Container}>
                <TouchableOpacity onPress={onPressFunction}>
                    <View style={{ display: "flex", flexDirection: "row", }}>
                        {iconName}
                        <Text style={textStyle}>{OptionText}</Text>
                    </View>
                </TouchableOpacity>
                <View >
                    <Icons.RightArrow />
                </View>
            </View>
        )
    }
    const onLogOutPressed = () => {
        signOut().then((response) => {
            if (response.status == 200) {
                removeItem("token")
                Alert.alert("Logged out!")
                setIsPopupVisible(false)
                navigation.navigate('SigninScreen')
            }
        })
    }
    const signOutHandler = () => {
        setIsPopupVisible(true)
    }
    const OnMyWalletHandler = () => {
        getAllFIATWallets().then((response) => {
            navigation.navigate('WalletScreen')
        }).catch(error => {
            console.log(error.response)
        })
    }
    const onSettingHandler = () => {
        navigation.navigate('SettingScreen', { pinPopUp: false })
    }
    useEffect(() => {
        myProfile().then((response) => {
            setName(response.name)
            setEmail(response.email)
            setUsername(response.username)
            setImage(response.image.split('?')[0])
        }).catch(error => {
            console.log(error.response)
        })
    }, [])

    const moveToHelpCenter = () =>{
        navigation.navigate('HelpCenter')
    }

    const changeProfilePictureHandler = () =>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(img => {   
            uploadPhoto(img.path).then(response=>{
                setImage(img.path)
            })
            .catch(error => {
                console.log(error.response)
            })
          });
    }

    return (
        <ScrollView>
            <View>
                <ImageBackground source={Images.Background} resizeMode="cover" style={styles.Image}>
                    <Text style={styles.HeaderText}>My Profile</Text>
                    <Text style={styles.User}>{"Hello " + name + "!"}</Text>
                    <TouchableOpacity 
                        style={styles.imageVector}
                        onPress = {changeProfilePictureHandler}
                    >
                        <Image 
                            style={styles.imageScreen} 
                            source={image === null || image === undefined ? 
                                    Images.UserImage : 
                                    { uri: image}
                                    // { uri: image.split('?')[0] }
                                } 
                        />
                    </TouchableOpacity>
                    <Text style={styles.UserName}>{username}</Text>
                    <Text style={styles.Email}>{email}</Text>
                    <View style={styles.secondContainer}>
                        <RowContainer
                            iconName={<Icons.Wallet />}
                            OptionText="My Wallet"
                            onPressFunction={OnMyWalletHandler}
                            textStyle={styles.Tabs}
                        />
                        <RowContainer
                            iconName={<Icons.BitcoinToken />}
                            OptionText="Token Portfolio"
                            onPressFunction={OnMyWalletHandler}
                            textStyle={styles.Tabs}
                        />
                        <RowContainer
                            iconName={<Icons.Settings />}
                            OptionText="Settings"
                            onPressFunction={onSettingHandler}
                            textStyle={styles.Tabs}
                        />
                        <RowContainer
                            iconName={<Icons.Clock />}
                            OptionText="Transaction History"
                            onPressFunction={OnMyWalletHandler}
                            textStyle={styles.Tabs}
                        />
                        <RowContainer
                            iconName={<Icons.Headset />}
                            OptionText="Help Center"
                            onPressFunction={moveToHelpCenter}
                            textStyle={styles.Tabs}
                        />
                        <RowContainer
                            iconName={<Icons.SignOut />}
                            OptionText="Sign Out"
                            onPressFunction={signOutHandler}
                            textStyle={styles.Tabss}
                        />
                        {isPopupVisible && (<Popup
                            isCustomInputVisible={false}
                            isPopupVisible={isPopupVisible}
                            Heading={Strings.signOutMsg}
                            buttonLabel="Log Out"
                            onPressFunction={onLogOutPressed}
                            setIsPopupVisible={setIsPopupVisible} />)}
                    </View>
                </ImageBackground>
            </View>
        </ScrollView>
    )
}

export default MyProfile