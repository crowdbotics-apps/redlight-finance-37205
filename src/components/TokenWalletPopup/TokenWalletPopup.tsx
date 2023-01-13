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
    walletHandler : ((event: GestureResponderEvent) => void) | undefined
}

const TokenWalletPopup : FC<TokenWalletPopupProps> = props =>{
    const {onPress,walletHandler} = props
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
            <TouchableOpacity style={styles.walletView}>
                <View style={styles.logo}/>
                <View style={styles.mainContainer}>
                    <View style={styles.row}>
                        <Text style={styles.mainText}>First Wallet</Text>
                        <Text style={styles.subText}>235.00 PHP</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subText}>Default</Text>
                        <Text style={styles.subText}>Balance</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.walletView}>
                <View style={styles.logo}/>
                <View style={styles.mainContainer}>
                    <View style={styles.row}>
                        <Text style={styles.mainText}>First Wallet</Text>
                        <Text style={styles.subText}>235.00 PHP</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.subText}>Default</Text>
                        <Text style={styles.subText}>Balance</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default TokenWalletPopup

