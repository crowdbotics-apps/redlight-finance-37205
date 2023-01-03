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
import { bool } from 'prop-types';
import WelcomePopup from '../../components/WelcomePopup/WelcomePopup';
import { isValidPassword, isValidUsername, removeItem, setItem } from '../../util';
import { ChangePassword } from '../changePassword';


const Signin = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [seePassword, setseePassword] = useState(true)
  const [isModalVisible, setisModalVisible] = useState(false)

  const navigation = useNavigation();

  const loginHandler = () => {
    const data = { username: username, password: password }
    if(!isValidUsername(username) || !isValidPassword(password)){
      console.log(data)
      Alert.alert("Please enter your correct credentials")
      return
    }
    login(data).then((response) => { 
      console.log(response)
      if(response?.status === 400){
        console.log("error occurred")
        Alert.alert("please provide correct credentials")
        return
      }
      console.log('res', response, 'data', data) 
      setUsername("")
      setPassword("")
      setItem("token", response?.token)
      navigation.navigate('HomeScreen')
    })
      .catch(error => {
      console.log(error.response);

    })
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
            onChangeText={setUsername} 
            isleftIconVisible={true} 
           />
          
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
            <Text style={styles.tabsText}>No Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.tabText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Signin;
