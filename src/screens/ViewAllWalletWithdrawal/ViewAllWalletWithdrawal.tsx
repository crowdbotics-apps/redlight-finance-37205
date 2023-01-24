import React from 'react'
import {View,Text,ImageBackground,Platform,FlatList,StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CustomHeader from '../../components/CustomHeader'
import CashOptions from '../../components/CashOptions'
import { Strings } from '../../util/Strings'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'
import styles from '../ViewAllOnlineBanking/styles'

const DATA = [1,1,1,1,1,1,1,1,1]

const ViewAllWalletWithdrawal = ()=>{
    const navigation = useNavigation()
    return (
        <View style={{marginTop : -10}}>
        <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
            <StatusBar barStyle='light-content'/>
            <CustomHeader 
                name={Strings.CASH_OUT}
                Icon = {<Icons.LeftArrow/>}
                isIconVisible={true} 
                headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                onPress={()=>navigation.goBack()}
            />
            <View style={styles.mainContainer}>
                <View style={styles.section}>
                    <View style={styles.sectionHeading}>
                        <Text style={styles.sectionHeadingText}>{Strings.E_WALLETS}</Text>
                    </View>
                    <Text 
                        style={styles.sectionSubheading}
                    >
                        {Strings.HASSLE_FREE_ONLINE_ANYTIME}
                    </Text>
                    <FlatList
                        data={DATA}
                        renderItem = {(item)=>
                            <CashOptions 
                                onPress = {()=>{}}
                            />
                        }
                        style= {styles.list}
                        bounces = {false}
                        showsVerticalScrollIndicator = {false}
                    />
                </View>
            </View>
        </ImageBackground>
    </View>
    )
}

export default ViewAllWalletWithdrawal