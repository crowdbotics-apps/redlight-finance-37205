import React,{useRef} from 'react'
import {View,Text,ImageBackground,Platform,FlatList,StatusBar} from 'react-native'
import RBSheet from 'react-native-raw-bottom-sheet';
import { useNavigation } from '@react-navigation/native'
import CashOutPopupScreen from './CashOutPopupScreen';
import CustomHeader from '../../components/CustomHeader'
import CashOptions from '../../components/CashOptions'
import { Colors } from '../../theme/Colors';
import { Strings } from '../../util/Strings'
import Images from '../../assets/Images'
import Icons from '../../assets/Icons'
import styles from './styles'

const DATA = [1,1,1,1,1,1,1,1,1]

const ViewAllOnlineBankingWithdrawal = ()=>{
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
                                onPress = {openBottomsheetHandler}
                            />
                        }
                        style= {styles.list}
                        bounces = {false}
                        showsVerticalScrollIndicator = {false}
                    />
                </View>
            </View>
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
        </ImageBackground>
    </View>
    )
}

export default ViewAllOnlineBankingWithdrawal