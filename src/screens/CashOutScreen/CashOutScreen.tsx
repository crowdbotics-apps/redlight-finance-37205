import React,{FC,useRef} from 'react'
import {View,Text,ImageBackground, TouchableOpacity,FlatList,Platform,StatusBar} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native'
import CashOutPopupScreen from '../../components/CashoutPopupScreen';
import CashComponent from '../../components/CashComponent'
import CustomHeader from '../../components/CustomHeader'
import Images from '../../assets/Images'
import { Strings } from '../../util/Strings'
import styles from './styles'
import Icons from '../../assets/Icons'
import { Colors } from '../../theme/Colors';

const DATA = [1,2,3,4,5,6]

const CashOut : FC = () =>{
    const navigation = useNavigation()
    const refRBSheet = useRef();

    const openBottomsheetHandler = ()=>{
        refRBSheet.current.open()
    }

    const closeBottomsheetHandler = () =>{
        refRBSheet.current.close()
    }

    const cashoutviaHandler = () =>{
        refRBSheet.current.close()
        navigation.navigate('CashOutDetailsScreen')
    }

    const matchmoveHandler = () => {
        openBottomsheetHandler()
    }

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
                            <Text style={styles.sectionHeadingText}>{Strings.ONLINE_BANKING}</Text>
                            <TouchableOpacity 
                                onPress={()=>navigation.navigate('ViewAllOnlineBankingWithdrawalScreen')}
                            >
                                <Text style={styles.sectionheadingBtnText}>{Strings.VIEW_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text 
                            style={styles.sectionSubheading}
                        >
                            {Strings.HASSLE_FREE_ONLINE_ANYTIME}
                        </Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent onPress={matchmoveHandler}/>}
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
                                 onPress={()=>navigation.navigate('ViewAllWalletWithdrawalScreen')}
                            >
                                <Text style={styles.sectionheadingBtnText}>{Strings.VIEW_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubheading}>{Strings.HASSLE_FREE_ONLINE_ANYTIME}</Text>
                        <FlatList
                            data = {DATA}
                            renderItem = {(item)=><CashComponent />}
                            showsHorizontalScrollIndicator = {false}
                            horizontal = {true}
                            style = {styles.list}
                            bounces = {false}
                        />
                    </View>

                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Text style={styles.sectionHeadingText}>{Strings.REMITTANCE}</Text>
                            <TouchableOpacity
                                 onPress={()=>navigation.navigate('ViewAllOverTheCounter')}
                            >
                                <Text style={styles.sectionheadingBtnText}>{Strings.VIEW_ALL}</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.sectionSubheading}>{Strings.PANDORAS_VAULT_MERCHANT}</Text>
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
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={false}
                closeOnPressMask={false}
                height = {500}
                customStyles={{
                wrapper: {
                //    backgroundColor  : "transparent"     
                },
                container : {
                    backgroundColor : Colors.aubergine,
                    borderTopLeftRadius : 20,
                    borderTopRightRadius : 20,
                    paddingHorizontal : 20,
                    paddingBottom : 30
                }
                }}
              >
               <CashOutPopupScreen 
                    onPress={closeBottomsheetHandler} 
                    cashoutviaHandler={cashoutviaHandler}
                />
            </RBSheet>
        </View>
    )
}

export default CashOut