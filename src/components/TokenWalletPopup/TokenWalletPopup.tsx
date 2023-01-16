import React,{FC} from "react";
import {View,
    Text,
    ScrollView,
    TouchableOpacity,
    GestureResponderEvent} from 'react-native'
import Icons from "../../assets/Icons";
import { Strings } from "../../util/Strings";
import styles from './styles'

type TokenWalletPopupProps  = {
    onPress : ((event: GestureResponderEvent) => void) | undefined
    walletList : [],
    onWalletHandle : ((event: GestureResponderEvent) => void) | undefined
}

const TokenWalletPopup : FC<TokenWalletPopupProps> = props =>{
    const {onPress,walletList,onWalletHandle} = props

    const onWalletSelect = (walletId) =>{
        onWalletHandle(walletId)
    }

    return (
        <ScrollView 
            style={styles.container}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{paddingBottom : 10}}
        >
             <View style={styles.headerView}>
                <Text style={styles.headerText}>{Strings.SELECT_WALLET}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Icons.CrossIcon/>
                </TouchableOpacity>
            </View>
            {walletList.map(wallet => (
            <TouchableOpacity 
                style={styles.walletView} 
                key={wallet.id}
                onPress = {()=>onWalletSelect(wallet?.id)}
            >
                <View style={styles.logo}/>
                <View style={styles.mainContainer}>
                    <View style={styles.row}>
                        <Text style={styles.mainText}>{wallet?.wallet_name}</Text>
                        <Text 
                            style={styles.subText}
                        >
                            {parseFloat(wallet?.wallet_balance).toFixed(2)} PHP
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subText}>{wallet?.is_subwallet?"Sub-wallet":"Wallet"}</Text>
                        <Text style={styles.subText}>Balance</Text>
                    </View>
                </View>
            </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default TokenWalletPopup

