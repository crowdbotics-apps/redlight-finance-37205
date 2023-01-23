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
import FastImage from 'react-native-fast-image';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorModal from '../../components/ErrorModal';


const Signin = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isLoading,setIsLoading] = useState(false)
  const [error,setError] = useState('')

  const navigation = useNavigation();

  const loginHandler = () => {
    if (validate()){
      const data = { username: username, password: password }
      setIsLoading(true)
      login(data).then((res) => {
        setIsLoading(false)
        if(res?.status === 400){
          let errorText = res.data?.non_field_errors[0] + Strings.PLEASE_ENTER_CORRECT_USERNAME_OR_PASSWORD
          setError(errorText)
          toggleModalHandler()
          return;
        }
        setItem("token", res.token)
        setUsername("")
        setPassword("")
        navigation.reset({
          index:0,
          routes:[{
              name:'DashboardNavigaton'
            }]
        })
      }).catch(error => {
        setIsLoading(false)
        console.log(error.response);
      })
  }
  }
  const validate  = () =>{
    if(username && password){
      return true
    }
    else{
      setError(Strings.PLEASE_ENTER_YOUR_USERNAME_AND_PASSWORD)
      toggleModalHandler()
      // Alert.alert(Strings.PLEASE_ENTER_YOUR_USERNAME_AND_PASSWORD)  
      return false
    }

  }
  
  const toggleModalHandler = () =>{
    setIsModalVisible(isModalVisible => !isModalVisible)
  }
  return (
    <View>
      <ImageBackground source={Images.Rectangle} resizeMode="cover" style={styles.image}>
        <KeyboardAwareScrollView 
          showsVerticalScrollIndicator ={false}
          style={styles.body} 
          bounces={false}
        >
          <FastImage 
            source={Images.Maskgroup} 
            style={styles.img} 
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.container}>
            <CustomInput
              label="Username"
              placeholder='Username'
              value={username}
              onChangeText={setUsername} 
              isleftIconVisible={true} 
              leftIcon = {<Icons.UserIcon/>}
            />
            <CustomInput
              label="Password"
              placeholder='Password'
              value={password}
              onChangeText={setPassword} 
              isRightIconVisible={true} 
              isleftIconVisible={true} 
              leftIcon = {<Icons.LockIcon/>}
            />
            <View style={styles.tabs}>
              <Text style={styles.tabText}>Switch account</Text>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.tabText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <PrimaryButton
              isLoading={isLoading}
              text="Sign In"
              onPress={loginHandler} disabled={undefined} style={{marginTop: "12%"}} btnStyle={undefined}/>
            <View style={styles.tabss}>
              <Text style={styles.tabsText}>{Strings.NO_ACCOUNT}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                <Text style={styles.tabText}>{Strings.SIGN_UP}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
      <ErrorModal 
        isModalVisible={isModalVisible} 
        onToggleModal={toggleModalHandler}
        errorText = {error}
      />
    </View>
  );
};

export default Signin;
