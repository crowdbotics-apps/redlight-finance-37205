import React,{FC} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Fonts } from '../../assets/fonts';
import { Colors } from '../../theme/Colors'
import Circle  from '../../components/Circle'
import Images from '../../assets/Images'
import PrimaryButton from '../../components/PrimaryButton';
import { Strings } from '../../util/Strings';

const PasswordSuccessfullPopup : FC = ({onPress})=>{
    return (
        <View style={styles.container}>
            <Circle sourceImage={Images.Laptop} CircleStyle={styles.circle}/>
            <Text style={styles.text}>{Strings.PASSWORD_WAS_SUCCESSFULLY_UPDATED}</Text>
            <PrimaryButton
                isLoading={false}
                disabled = {false}
                text = "OK"
                onPress = {()=>onPress()}
                style={{marginBottom : 20}}
                btnStyle = {{}}
            />
        </View>
    )
}

export default PasswordSuccessfullPopup

const styles = StyleSheet.create({
    container : {
        marginTop : 25
    },
    text : {
        width  :'90%',
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '700',
        fontSize : 20,
        lineHeight : 30,
        textAlign : 'center',
        color : Colors.Gray78,
        marginVertical : 20,
        paddingVertical : 20,
        alignSelf : 'center'
    },
    subText : {
        fontFamily : Fonts.PoppinsRegular,
        fontWeight : '400',
        fontSize : 16,
        lineHeight : 24,
        textAlign : 'center',
        color : Colors.Gray78,
        marginBottom : 30
    },
    circle : {
        alignSelf : 'center',
        marginBottom : 30
    },
})