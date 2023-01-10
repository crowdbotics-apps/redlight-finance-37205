import React from 'react'
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

const TokenPortfolio = () =>{
    const navigation  = useNavigation()
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
                        <View style={styles.banner}/>
                        <View style={styles.btnView}>
                            <TouchableOpacity style={styles.btn}>
                                <Icons.SendIcon/>
                                <Text style={styles.btnText}>{Strings.SEND}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Icons.MoveIcon/>
                                <Text style={styles.btnText}>{Strings.MOVE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView>

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
        backgroundColor : Colors.RedBaron
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