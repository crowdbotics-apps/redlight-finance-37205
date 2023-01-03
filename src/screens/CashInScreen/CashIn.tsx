import React,{FC} from 'react'
import {View,Text,ImageBackground, TouchableOpacity,FlatList,Platform} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import CashComponent from '../../components/CashComponent'
import CustomHeader from '../../components/CustomHeader'
import Images from '../../assets/Images'
import { Strings } from '../../util/Strings'
import styles from './styles'
import Icons from '../../assets/Icons'

const DATA = [1,2,3,4,5,6]

const CashIn : FC = () =>{
    const navigation = useNavigation()
    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <CustomHeader 
                    name={Strings.CASH_IN}
                    Icon = {<Icons.LeftArrow/>}
                    isIconVisible={true} 
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                    onPress={()=>navigation.goBack()}
                />
                <View style={styles.mainContainer}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>{Strings.ONLINE_BANKING}</Text>
                            <TouchableOpacity 
                                onPress={()=>navigation.navigate('ViewAllOnlineBanking')}
                            >
                                <Text style={styles.sectionheadingBtnText}>{Strings.VIEW_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text 
                            style={styles.sectionSubheading}
                        >
                            {Strings.MAKE_YOUR_TRANSACTIONS_QUICK_AND_EASY}
                        </Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent/>}
                            showsHorizontalScrollIndicator = {false}
                            horizontal = {true}
                            style = {styles.list}
                            bounces = {false}
                        />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>{Strings.E_WALLETS}</Text>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate('ViewAllWallet')}
                            >
                                <Text style={styles.sectionheadingBtnText}>{Strings.VIEW_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubheading}>{Strings.VIRTUAL_IS_THE_NEW_NORMAL}</Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent/>}
                            showsHorizontalScrollIndicator = {false}
                            horizontal = {true}
                            style = {styles.list}
                            bounces = {false}
                        />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>{Strings.ONER_THE_COUNTER}</Text>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate('ViewAllOverTheCounter')}
                            >
                                <Text style={styles.sectionheadingBtnText}>{Strings.VIEW_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubheading}>{Strings.CASH_IN_WITH_EASE}</Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent/>}
                            showsHorizontalScrollIndicator = {false}
                            horizontal = {true}
                            style = {styles.list}
                            bounces = {false}
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default CashIn