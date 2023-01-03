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
import {setItem} from '../../util'
import { bool } from 'prop-types';
import WelcomePopup from '../../components/WelcomePopup/WelcomePopup';
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
          <Text style={styles.upperTabText}>{Strings.USERNAME}</Text>
          <CustomInput
            label=""
            value={username}
            onChangeText={setUsername} containerStyle={undefined} isIconVisible={undefined} keyboardType={undefined} secureTextEntry={undefined} />
          <Text style={styles.upperTabText}>{Strings.PASSWORD}</Text>
          <CustomInput
            label=""
            value={password}
            onChangeText={setPassword} isIconVisible={undefined} keyboardType={undefined} secureTextEntry={seePassword} containerStyle={undefined} />
          {/* <TouchableOpacity onPress={()=>{}}><Icons.EyeIcon/></TouchableOpacity> */}
          <View style={styles.tabs}>
            <Text style={styles.tabText}>{Strings.SWITCH_ACCOUNT}</Text>
            <TouchableOpacity onPress={() => setseePassword(!seePassword)}>
              <Text style={styles.tabText}>{Strings.FORGOT_PASSOWRD}</Text>
            </TouchableOpacity>
          </View>
          <PrimaryButton
            isLoading={false}
            text={Strings.SIGN_IN}
            onPress={loginHandler}
    
          />
          <TouchableOpacity style ={styles.upperTabText} onPress={changeModalVisbile}>
            <Text>Open Modal</Text>
          </TouchableOpacity>
          <View style={styles.tabss}>
            <Text style={styles.tabsText}>{Strings.NO_ACCOUNT}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.tabText}>{Strings.SIGN_UP}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
      <WelcomePopup isModalVisible={isModalVisible}/>
    </View>
  );
};

export default Signin;
