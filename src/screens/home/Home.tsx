import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { myProfile } from "../../services/auth";

const HomeScreen = () => {

    const navigation = useNavigation()
    const profileScreen = () => {
        myProfile().then((response) => {
            navigation.navigate('MyProfileScreen', response)
        }).catch(error => {
            console.log(error.response)
        })
    }
    return (
        <View style={{ marginTop: "20%" }}>
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={profileScreen}>
                <Text>MyProfileScreen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen