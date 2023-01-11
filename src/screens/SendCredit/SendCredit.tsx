import React,{FC,useState} from 'react'
import {
    View,
    Text, 
    StyleSheet,
    ImageBackground,
    StatusBar,
    Platform,
    TextInput} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Dropdown } from 'react-native-element-dropdown';
import { Strings } from '../../util/Strings'
import Images from '../../assets/Images'
import { Colors } from '../../theme/Colors'
import Icons from '../../assets/Icons'
import { Fonts } from '../../assets/fonts';
import CustomHeader from '../../components/CustomHeader'

const SendCredit : FC = ()=>{
    const navigation = useNavigation()
    const [amount,setAmount] = useState(0.00)

    const textInputChangeHandler = (newAmount:any) =>{
        setAmount(newAmount)
    }
    return (
        <View style={{marginTop : -10}}>
            <ImageBackground source={Images.Background} resizeMode="cover" style={styles.image}>
                <StatusBar barStyle='light-content'/>
                <CustomHeader 
                    name={Strings.SEND_CREDITS}
                    Icon = {<Icons.LeftArrow/>}
                    isIconVisible={true} 
                    onPress={()=>navigation.goBack()}
                    headerStyle = {{marginTop : Platform.OS === 'ios' ? '12%' : 25}}
                />
                <View style={styles.mainContainer}>
                    <View style={{marginTop : 10}}>
                        <Text style={styles.text}>{Strings.SELECT_FROM}</Text>
                        <Dropdown
                            style={styles.input}
                            placeholderStyle={styles.placeholderStyle}
                            // selectedTextStyle={styles.selectedTextStyle}
                            // inputSearchStyle={styles.inputSearchStyle}
                            // iconStyle={styles.iconStyle}
                            // data={data}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={Strings.SELECT_FROM}
                            // searchPlaceholder="Search..."
                            // value={value}
                            // onFocus={() => setIsFocus(true)}
                            // onBlur={() => setIsFocus(false)}
                            // onChange={item => {
                            //     setValue(item.value);
                            //     setIsFocus(false);
                            // }}
                            // renderLeftIcon={() => (
                            //     <AntDesign
                            //     style={styles.icon}
                            //     color={isFocus ? 'blue' : 'black'}
                            //     name="Safety"
                            //     size={20}
                            //     />
                            // )}   
                        />
                    </View>
                    <View style={{marginTop : 20}}>
                        <Text style={styles.text}>{Strings.AMOUNT}</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={textInputChangeHandler}
                            value={amount}
                            placeholder={Strings.ENTER_AMOUNT}
                            placeholderTextColor={Colors.MediumDarkGray}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

export default SendCredit

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
    input: {
        height: 40,
        padding: 10,
        borderRadius : 10,
        marginTop : 6,
        backgroundColor : Colors.aubergine,
        color  : Colors.white,
        elevation : 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
    },
    placeholderStyle : {
        color : Colors.MediumDarkGray
    },
    text : {
        fontFamily : Fonts.PoppinsSemibold,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 22,
        color : Colors.white,
    },
})