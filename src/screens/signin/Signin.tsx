import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, Button, TextInput, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Images from '../../assets/Images';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import styles from '../signin/styles';
import { login } from '../../services/auth';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../assets/Icons'
import { bool } from 'prop-types';
import WelcomePopup from '../../components/WelcomePopup/WelcomePopup';
import { isValidPassword, isValidUsername } from '../../util';


const Signin = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [seePassword, setseePassword] = useState(true)
  const [isModalVisible, setisModalVisible] = useState(false)

  const navigation = useNavigation();

  const loginHandler = () => {
    validate();
    const data = { username: username, password: password }
    login(data).then((response) => { console.log('res', response, 'data', data) }).catch(error => {

      console.log(error.response);

    })
    setUsername("")
    setPassword("")
  }
  const validate = () => {
    if (username === undefined || username === "" || password === undefined || password === ""|| !isValidUsername(username) || !isValidPassword(password)) {
      Alert.alert("Please enter your valid Username and Password")

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
            onChangeText={setUsername} 
            containerStyle={""} 
            isleftIconVisible={true} 
            keyboardType={undefined} 
             secureTextEntry={undefined} />
          
          <CustomInput
            label="Password"
            placeholder='Password'
            value={password}
            onChangeText={setPassword} isIconVisible={true} isRightIconVisible={true} isleftIconVisible={true} keyboardType={"default"} secureTextEntry={seePassword} containerStyle={undefined} />
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
