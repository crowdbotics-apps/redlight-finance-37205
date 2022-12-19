import React,{FC} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { Fonts } from '../../assets/fonts';
import { Colors } from '../../theme/Colors'
import Circle  from '../../components/Circle'
import Images from '../../assets/Images'
import PrimaryButton from '../../components/PrimaryButton';

const BottomSheetContainer : FC = ({onPress})=>{
    return (
        <View style={styles.container}>
            <Circle sourceImage={Images.Successful} CircleStyle={styles.circle}/>
            <Text style={styles.text}>Your account is now active</Text>
            <Text style={styles.subText}
            > 
               Congratulations, your account is now active, 
               you can start using the application
            </Text>
            <PrimaryButton
                isLoading={false}
                disabled = {false}
                text = "Continue"
                onPress = {()=>onPress()}
                style={{marginBottom : 20}}
                btnStyle = {{}}
            />
        </View>
    )
}

export default BottomSheetContainer

const styles = StyleSheet.create({
    container : {
        marginTop : 25
    },
    text : {
        fontFamily : Fonts.PoppinsBold,
        fontWeight : '700',
        fontSize : 20,
        lineHeight : 30,
        textAlign : 'center',
        color : Colors.Gray78,
        marginVertical : 20
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
        alignSelf : 'center'
    },
})