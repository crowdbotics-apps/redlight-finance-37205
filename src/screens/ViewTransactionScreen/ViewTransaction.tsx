import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Platform, Text, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LeftArrow from "../../assets/Icons/LeftArrow";
import Images from "../../assets/Images";
import CustomHeader from "../../components/CustomHeader";
import styles from "./style";

const ViewTransaction = () => {
    const navigation = useNavigation()
    const goBackIconHandler = () => {
        navigation.goBack()
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.Image}>
                <CustomHeader
                    isIconVisible={true}
                    name="Transaction"
                    Icon={<LeftArrow />}
                    headerStyle={{ marginTop: Platform.OS === 'ios' ? '12%' : 25 }}
                    onPress={goBackIconHandler}
                />
                <View style={styles.Container}>
                    <View style={styles.transactionAndDateContainer}>
                        <Text style={styles.transactionAndDateText}>Transaction Type</Text>
                        <Text style={styles.transactionAndDateText}>Date and Time</Text>
                    </View>
                    <View style={styles.transactionAndDateContainer}>
                        <Text style={styles.cashInAndDateText}>Cash In</Text>
                        <Text style={styles.cashInAndDateText}>12/12/2022</Text>
                    </View>
                    <Text style={styles.headingTexts}>Service Type</Text>
                    <Text style={styles.contentText}>Online</Text>
                    <Text style={styles.headingTexts}>Order Number</Text>
                    <Text style={styles.contentText}>23BH384</Text>
                    <Text style={styles.headingTexts}>Contact</Text>
                    <Text style={styles.gmailText}>jacksonwilliams@gmail.com</Text>
                    <Text style={styles.gmailText}>Status</Text>
                    <Text style={styles.pendingText}>Pending</Text>
                    <View style={styles.transactionAndDateContainer}>
                        <Text style={styles.statusAndAmount}>Amount</Text>
                        <Text style={styles.amount}>200.00</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default ViewTransaction