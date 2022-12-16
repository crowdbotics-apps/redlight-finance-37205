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


const Signin = () => {

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [seePassword, setseePassword] = useState(true)

  const navigation = useNavigation();

  const loginHandler = () => {
    validate();
    console.log("Inside")
    const data = { username: username, password: password }
    login(data).then((response) => { console.log('res' ,response,'data',data) }).catch(error => {

      console.log(error.response);

    })
    setUsername("")
    setPassword("")
  }
  const validate  = () =>{
    if(username === undefined || username === "" || password === undefined || password === ""){
      Alert.alert("Please enter your valid Username and Password")
      
    }
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
            onChangeText={setUsername} />
          <Text style={styles.upperTabText}>Password</Text>
          <CustomInput
            label=""
            value={password}
            onChangeText={setPassword} isIconVisible={undefined} keyboardType={undefined} secureTextEntry={seePassword}
             />
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
