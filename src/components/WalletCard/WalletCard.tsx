import { useNavigation } from "@react-navigation/native";
import React, { FC, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgXml } from "react-native-svg";
import { navigators } from "../../../modules";
import Icons from "../../assets/Icons";
import styles from './styles'
import { WalletCardProps } from "./WalletCardProps";

const WalletCard = ({ item, index }: any) => {
    const navigation = useNavigation()
    const getQRCodeByWalletId = () => {
        navigation.navigate("QRCode", { walletId: item.id })
    }
    const addSubWalletHandler = () => {
        navigation.navigate("AddSubWalletScreen")
    }
    return (
        <View>
            {item.wallet_name ?
                <View style={styles.walletContainer}>
                    <Text style={styles.walletHeading}>{item.wallet_name}</Text>
                    <Text style={styles.walletDate}>As of December 04, 2022</Text>
                    <View style={styles.qrCode}>
                        <TouchableOpacity onPress={getQRCodeByWalletId}>
                            <SvgXml
                                xml={Icons.QRCode}
                                width={32}
                                height={32}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.Balance}>{item.wallet_balance}</Text>
                </View>

                : <View style={styles.walletContainer}>
                    <TouchableOpacity onPress={addSubWalletHandler}>
                        <SvgXml
                            xml={Icons.AddWallet}
                            width={60}
                            height={60}
                            style={{ alignSelf: "center", marginTop : "20%" }}
                        />
                        <Text style={styles.addWalletText}>+ Add Sub Wallet</Text>
                    </TouchableOpacity>
                </View>}
        </View>
    )
}

export default WalletCard