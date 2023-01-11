import React,{useState,useEffect} from 'react'
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    ImageBackground,
    StatusBar,
    Platform,
    TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Images from '../../assets/Images'
import CustomHeader from '../../components/CustomHeader'
import { Strings } from '../../util/Strings'
import { Colors } from '../../theme/Colors'
import { Fonts } from '../../assets/fonts'
import Icons from '../../assets/Icons'
import TokenRow from './TokenRow'
import { getAllWallets } from '../../services/homeServices'

const TokenPortfolio = () =>{
    const [allwallets,setAllWallets] = useState([])
    const [wallet,setWallet] = useState()
    const navigation  = useNavigation()

    useEffect(()=>{
        getAllWallets().then(response=>{
            let walletList : any = []
            response.map(res=>{
                if(res.wallet_type === 1){
                    walletList.push(res)
                }
                else{
                    setWallet(res)
                }
            })
            setAllWallets(walletList)
        })
        .catch(error=>{
            console.log('error',error);     
        })
    },[])

    const sendCreditHandler = () =>{
        navigation.navigate('SendCredit')
    }
    
    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name={Strings.TOKEN_PROFILE}
                    isIconVisible={false} 
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                />
                <View style={styles.mainContainer}>
                    <View style={styles.balanceView}>
                        <View style={styles.banner}>
                            <Text style={styles.overviewBalance}>{Strings.OVERVIEW_BALANCE}</Text>
                            <Text 
                                style={styles.amount}
                                numberOfLines = {1}
                                ellipsizeMode = "tail"
                            >${(wallet?.wallet_balance)}</Text>
                            <Text style={styles.footerText}>As of December 04, 2022</Text>
                        </View>
                        <View style={styles.btnView}>
                            <TouchableOpacity 
                                style={styles.btn}
                                onPress = {sendCreditHandler}
                            >
                                <Icons.SendIcon/>
                                <Text style={styles.btnText}>{Strings.SEND}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Icons.MoveIcon/>
                                <Text style={styles.btnText}>{Strings.MOVE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView
                        contentContainerStyle ={{paddingBottom  : 20}}
                        showsVerticalScrollIndicator ={false}
                        bounces = {false}
                    >
                        { allwallets.map(wall=>
                                    <TokenRow key={wall.id}
                                        walletName = {wall.wallet_name}
                                        walletBalance = {wall.wallet_balance}
                                        currency = {wall.currency}
                                    />)
                        }
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )
}

export default TokenPortfolio

const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : '100%',
        alignItems : 'center'
    },
    overviewBalance : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight :'400',
        fontSize : 20,
        lineHeight : 30,
        color : Colors.white,
    },
    amount : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight :'400',
        fontSize : 36,
        lineHeight : 54,
        color : Colors.white,
        marginVertical : 24,
        textAlign : 'center'
    },
    footerText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight :'400',
        fontSize : 14,
        lineHeight : 21,
        color : Colors.white,
    },
    mainContainer : {
        flex:1,
        width  : '100%',
        borderTopLeftRadius : 30,
        borderTopRightRadius : 30,
        backgroundColor : Colors.aubergine,
        padding : 35,
    },
    balanceView : {
        paddingBottom : 30,
        borderBottomColor : Colors.MediumDarkGray,
        borderBottomWidth : 1,
    },
    banner : {
        height : 200,
        borderRadius : 15,
        backgroundColor : Colors.RedBaron,
        alignItems : 'center',
        paddingTop : 20,
        paddingHorizontal : 10
    },
    btnView : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        marginTop : 30,
    },
    btn : {
        width : '48%',
        flexDirection : 'row',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: Colors.PineTree,
        paddingVertical: 15,
        borderRadius : 10
    },
    btnText : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight :'400',
        fontSize : 16,
        lineHeight : 24,
        color : Colors.white,
        marginStart : 15
    }
})