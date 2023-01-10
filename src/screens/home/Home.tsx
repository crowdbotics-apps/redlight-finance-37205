import React,{FC,useState,useEffect} from 'react'
import {View,Text,TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import styles from './styles'
import { getAllWallets } from '../../services/homeServices'
import { myProfile } from '../../services/auth'

const Home : FC = ()=>{
    const [allWallets,setAllWallets] = useState([])
    const navigation = useNavigation()
    const profileScreen = () => {
        myProfile().then((response) => {
            navigation.navigate('MyProfileScreen', response)
        }).catch(error => {
            console.log(error.response)
        })
    }

    useEffect(()=>{
        getAllWallets().then(response=>{
            setAllWallets(response)
        })
        .catch(error=>{
            console.log('error',error);     
        })
    },[])

    return (
        <View style={styles.container}>
            <Text> Home screen is coming soon</Text>
            <TouchableOpacity 
                style={styles.btn} 
                onPress={()=>navigation.navigate('QRCode',{
                    walletId : allWallets[0].id
                })}
            >
                <Text>Move to QR code screen</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={profileScreen}>
                <Text>MyProfileScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.btn,{marginTop : 10}]} 
                onPress={()=>navigation.navigate('CashInScreen')}
            >
                <Text>Move to Cashin screen</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.btn,{marginTop : 10}]} 
                onPress={()=>navigation.navigate('CashOutScreen')}
            >
                <Text>Move to Cashout screen</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home
