import React, { useState } from "react";
import { Alert, ImageBackground, Text, View, Platform } from "react-native";
import Images from "../../assets/Images";
import styles from "./styles";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { changePassword } from "../../services/auth";
import { isValidPassword, removeItem, setItem } from "../../util";
import { useNavigation } from "@react-navigation/core";
import { Strings } from "../../util/Strings";
import Icons from "../../assets/Icons";
import CustomHeader from "../../components/CustomHeader";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState<any>();
    const [confirmPassword, setConfirmPassword] = useState<any>();
    const navigation = useNavigation();

    const updatePassword = () => {
        const data = { old_password: currentPassword, password1: newPassword, password2: confirmPassword }
        if (!isValidPassword(newPassword) || !isValidPassword(confirmPassword)) {
            Alert.alert("Weak Password")
            return
        }
        if (newPassword === confirmPassword) {
            changePassword(data).then((response) => {
                if (response?.status == 400) {
                    Alert.alert("Current Password is incorrect!")
                    return
                }
                setNewPassword("")
                setConfirmPassword("")
                Alert.alert("Password Changed successfully")
                removeItem("token")
                setItem("token", response?.token)
            }).catch(error => {
                console.log(error.response);
            })
        }
        else {
            Alert.alert("Password doesn't match")
            return
        }
    }
    const goBackHandler = () => {
        navigation.goBack()
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode='cover' style={styles.image}>
                <CustomHeader
                    name={Strings.CHANGE_PASSWORD}
                    Icon={<Icons.LeftArrow />}
                    isIconVisible={true}
                    headerStyle={{ marginTop: Platform.OS === 'ios' ? '12%' : 25 }}
                    onPress={goBackHandler}
                />
                <View style={styles.container}>
                    <View style={styles.children}>
                        <View style={styles.input}>
                            <CustomInput
                                label="Current Password"
                                placeholder="somestrongpasssword"
                                isRightIconVisible={true}
                                onChangeText={setCurrentPassword}
                                value={currentPassword}
                            />
                            <CustomInput
                                label="New Password"
                                placeholder="somestrong_passsword345"
                                isRightIconVisible={true}
                                onChangeText={setNewPassword}
                                value={newPassword}
                            />
                            <CustomInput
                                label="Confirm New Password"
                                placeholder="somestrong_passsword345"
                                isRightIconVisible={true}
                                onChangeText={setConfirmPassword}
                                value={confirmPassword}
                            />
                        </View>
                    </View>
                    <PrimaryButton
                        text="Update Password"
                        isLoading={false}
                        onPress={updatePassword}
                        btnStyle={styles.button} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default ChangePassword