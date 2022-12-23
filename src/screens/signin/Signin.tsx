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
<<<<<<< HEAD
import {setItem} from '../../util'
=======
import { bool } from 'prop-types';
import WelcomePopup from '../../components/WelcomePopup/WelcomePopup';

>>>>>>> 9d64905afc2cf7fe7085a503f3ef1c7fda6aad52

const Signin = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [seePassword, setseePassword] = useState(true)
  const [isModalVisible, setisModalVisible] = useState(false)

  const navigation = useNavigation();

  const loginHandler = () => {
<<<<<<< HEAD
    if (validate()){
      console.log("Inside")
      const data = { username: username, password: password }
      login(data).then((res) => {
        if(res?.status === 400){
          console.log('hello');
          Alert.alert(res.data?.non_field_errors[0])
          return
        }
        setItem("token", res.token)
        navigation.reset({
          index:0,
          routes:[{
              name:'DashboardNavigaton'
            }]
        })
      }).catch(error => {
=======
    validate();
    console.log("Inside")
    const data = { username: username, password: password }
    login(data).then((response) => { console.log('res', response, 'data', data) }).catch(error => {
>>>>>>> 9d64905afc2cf7fe7085a503f3ef1c7fda6aad52

        console.log(error.response);
      })
      setUsername("")
      setPassword("")
  }
  }
<<<<<<< HEAD
  const validate  = () =>{
    if(username && password){
      return true
=======
  const validate = () => {
    if (username === undefined || username === "" || password === undefined || password === "") {
      Alert.alert("Please enter your valid Username and Password")

>>>>>>> 9d64905afc2cf7fe7085a503f3ef1c7fda6aad52
    }
    else{
      Alert.alert("Please enter your valid Username and Password")  
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
          <Text style={styles.upperTabText}>Username</Text>
          <CustomInput
            label=""
            value={username}
            onChangeText={setUsername} containerStyle={undefined} isIconVisible={undefined} keyboardType={undefined} secureTextEntry={undefined} />
          <Text style={styles.upperTabText}>Password</Text>
          <CustomInput
            label=""
            value={password}
            onChangeText={setPassword} isIconVisible={undefined} keyboardType={undefined} secureTextEntry={seePassword} containerStyle={undefined} />
          {/* <TouchableOpacity onPress={()=>{}}><Icons.EyeIcon/></TouchableOpacity> */}
          <View style={styles.tabs}>
            <Text style={styles.tabText}>Switch account</Text>
            <TouchableOpacity onPress={() => setseePassword(!seePassword)}>
              <Text style={styles.tabText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <PrimaryButton
            isLoading={false}
            text="Sign In"
            onPress={loginHandler}
    
          />
          <TouchableOpacity style ={styles.upperTabText} onPress={changeModalVisbile}>
            <Text>Open Modal</Text>
          </TouchableOpacity>
          <View style={styles.tabss}>
            <Text style={styles.tabsText}>No Account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.tabText}> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      <WelcomePopup isModalVisible={isModalVisible}/>
    </View>
  );
};

export default Signin;
