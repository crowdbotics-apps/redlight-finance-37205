import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Platform, ScrollView, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import LeftArrow from "../../assets/Icons/LeftArrow";
import Images from "../../assets/Images";
import CustomHeader from "../../components/CustomHeader";
import TransactionTab from "../home/TransactionTab";
import styles from "./Style";
import TransactionData from "./TransactionData";

const TransactionHistory = () => {
    const navigation = useNavigation()
    const goBackIconHandler = () => {
        navigation.goBack()
    }
    const viewTransactionHistory = () => {
        navigation.navigate("ViewTransactionScreen")
    }
    return (
        <View>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.Image}>
                <CustomHeader
                    isIconVisible={true}
                    name="Transaction History"
                    Icon={<LeftArrow />}
                    headerStyle={{ marginTop: Platform.OS === 'ios' ? '12%' : 25 }}
                    onPress={goBackIconHandler}
                />
                <ScrollView style={styles.Container}>
                    <Text style={styles.Heading}>Recent Trsanctions</Text>
                    <View style={{ paddingHorizontal: "5%", marginTop: -15 }}>
                        {TransactionData.map((Data: any) => {
                            return (
                                <TouchableOpacity onPress={viewTransactionHistory}>
                                    <TransactionTab
                                        typeOfPayment={Data.typeOfPayment}
                                        Timing={Data.timing}
                                        cost={Data.cost}
                                        paymentMethod={Data.paymentMethod}
                                    />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default TransactionHistory