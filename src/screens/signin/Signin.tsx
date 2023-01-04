import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../../assets/Images';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import styles from '../signin/styles';
import { login, myProfile } from '../../services/auth';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../assets/Icons'
import {setItem} from '../../util'
import { bool } from 'prop-types';
import WelcomePopup from '../../components/WelcomePopup/WelcomePopup';
import { ChangePassword } from '../changePassword';
import { Strings } from '../../util/Strings';


const Signin = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [seePassword, setseePassword] = useState(true)
  const [isModalVisible, setisModalVisible] = useState(false)

  const navigation = useNavigation();

  const loginHandler = () => {
    if (validate()){
      const data = { username: username, password: password }
      login(data).then((res) => {
        if(res?.status === 400){
          Alert.alert(res.data?.non_field_errors[0])
          return;
        }
        setItem("token", res.token)
        navigation.reset({
          index:0,
          routes:[{
              name:'DashboardNavigaton'
            }]
        })
      }).catch(error => {
        console.log(error.response);
      })
      setUsername("")
      setPassword("")
  }
  }
  const validate  = () =>{
    if(username && password){
      return true
    }
    else{
      Alert.alert(Strings.PLEASE_ENTER_YOUR_USERNAME_AND_PASSWORD)  
      return false
    }

  }
  const changeModalVisbile = () => {

    setisModalVisible(!isModalVisible)
  }
  return (
    <View>
      <ImageBackground source={Images.Rectangle} resizeMode="cover" style={styles.image}>
        <Image source={Images.Maskgroup} />
        <ScrollView style={styles.body}>
          <CustomInput
            label="Username"
            placeholder='Username'
            value={username}
            onChangeText={setUsername} containerStyle={undefined} isIconVisible={undefined} keyboardType={undefined} secureTextEntry={undefined} />
          <CustomInput
            label="Password"
            placeholder='Password'
            value={password}
            onChangeText={setPassword} 
            isRightIconVisible={true} 
            isleftIconVisible={true} 
            keyboardType={"default"} 
            secureTextEntry={true} 
           />
          <View style={styles.tabs}>
            <Text style={styles.tabText}>Switch account</Text>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.tabText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <PrimaryButton
            isLoading={false}
            text="Sign In"
            onPress={loginHandler} disabled={undefined} style={{marginTop: "12%"}} btnStyle={undefined}/>
          <View style={styles.tabss}>
            <Text style={styles.tabsText}>{Strings.NO_ACCOUNT}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.tabText}>{Strings.SIGN_UP}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Signin;
