import { useNavigation } from "@react-navigation/native";
import React, { ReactNode, useState } from "react";
import { Alert, Image, ImageBackground, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconProps } from "react-native-vector-icons/Icon";
import Icons from "../../assets/Icons";
import Images from "../../assets/Images";
import Popup from "../../components/Popup";
import { signOut, signup } from "../../services/auth";
import { Colors } from "../../theme/Colors";
import { removeItem } from "../../util";
import { Strings } from "../../util/Strings";
import styles from './styles'

const MyProfile = ({ route }: any) => {
    const navigation = useNavigation();
    const [isPopupVisible, setIsPopupVisible] = useState(false)
    const { name, email, username, image } = route.params
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
                navigation.navigate('SigninScreen')
            }
        })
    }
    const signOutHandler = () => {
        setIsPopupVisible(true)
    }
    const OnMyWalletHandler = () => {
        navigation.navigate('')
    }
    const onSettingHandler = () => {
        navigation.navigate('SettingScreen')
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.Image}>
                <Text style={styles.HeaderText}>My Profile</Text>
                <Text style={styles.User}>{"Hello " + name + "!"}</Text>
                <View style={styles.imageVector}>
                    <Image source={image === null || image === undefined ? Images.UserImage : { uri: image.split('?')[0] }} style={styles.imageScreen} />
                </View>
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
                        onPressFunction={OnMyWalletHandler}
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
    )
}

export default MyProfile