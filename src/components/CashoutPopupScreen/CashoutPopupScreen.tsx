import React,{FC} from 'react'
import {View,Text, TouchableOpacity,ScrollView,GestureResponderEvent} from 'react-native'
import { Strings } from '../../util/Strings'
import { Fonts } from '../../assets/fonts'
import { Colors } from '../../theme/Colors'
import Icon from 'react-native-vector-icons/Entypo'
import Icons from '../../assets/Icons'
import styles from './styles'

type CashOutPopupProps  = {
    onPress : ((event: GestureResponderEvent) => void) | undefined
    cashoutviaHandler : ((event: GestureResponderEvent) => void) | undefined
}

const CashOutPopupScreen : FC<CashOutPopupProps> = props =>{
    const {onPress,cashoutviaHandler} = props

    return(
        <ScrollView 
            style={styles.container}
            showsVerticalScrollIndicator = {false}
            contentContainerStyle = {{paddingBottom : 10}}
        >
            <View style={styles.headerView}>
                <Text style={styles.headerText}>{Strings.CASH_OUT_VIA}</Text>
                <TouchableOpacity onPress={onPress}>
                    <Icons.CrossIcon/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity 
                style={styles.mainContainer}
                onPress={cashoutviaHandler}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logo}/>
                    <Text style={styles.logoText}>Fees PHP 25.00</Text>
                </View>
                <View>
                    <View style={styles.line}>
                        <Icon name="dot-single" size={24} color={Colors.white} style={styles.icon}/> 
                        <Text style={styles.lineText}>Send to other local banks and e -wallets.</Text>
                    </View>
                    <View style={styles.line}>
                        <Icon name="dot-single" size={24} color={Colors.white}/> 
                        <Text 
                            style={styles.lineText}
                        > 
                            Transactions before 3:00PM cut-off are credited
                            on or before 11:00PM the same banking day.Transactions after cut-off, 
                            weekends or holidays, are credited on or before 11:00PM on the next
                            banking day.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity 
                style={styles.mainContainer}
                onPress = {cashoutviaHandler}
            >
                <View style={styles.logoContainer}>
                    <View style={styles.logo}/>
                    <Text style={styles.logoText}>Send instantly for PHP 25</Text>
                </View>
                <View>
                    <View style={styles.line}>
                        <Icon name="dot-single" size={24} color={Colors.white}/> 
                        <Text 
                            style={styles.lineText}
                        >
                            Send to other local banks and e -wallets. Receive instantly.
                        </Text>
                    </View>
                    <View style={styles.line}>
                        <Icon name="dot-single" size={24} color={Colors.white}/> 
                        <Text style={styles.lineText}>No cut-off.</Text>
                    </View>
                    <View style={styles.line}>
                        <Icon name="dot-single" size={24} color={Colors.white}/> 
                        <Text style={styles.lineText}>PHP 50,000 transaction limit.</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default CashOutPopupScreen

