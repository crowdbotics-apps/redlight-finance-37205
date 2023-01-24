import React,{useState,useEffect,FC} from 'react'
import {View,Text,ImageBackground,StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress'
import styles from './styles'
import Images from '../../assets/Images'
import { Colors } from '../../theme/Colors'
import { Strings } from '../../util/Strings';
import { getItem } from '../../util';

const Splash : FC = () =>  {
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const navigation = useNavigation();

    useEffect(()=>{
        setIsLoading(true)
        const timer = setTimeout(()=>{
            setIsLoading(false)
            getItem('token').then(token => {
              if (token) {
                navigation.navigate('DashboardNavigaton')          
              }
              else{
                navigation.navigate('SigninScreen')
              }
            })
        },3000)

        return ()=>{
            clearTimeout(timer)
        }
            
    },[])

    return (
        <ImageBackground source={Images.SplashBg} resizeMode="cover" style={styles.image}>
            <StatusBar barStyle='light-content'/>
            <View style={styles.mainView}>
                <Text style={styles.mainText}>{Strings.PANDORAS_VAULT}</Text>
            </View>

            {isLoading && 
                <Progress.Circle 
                    size={40} 
                    indeterminate={true} 
                    color={Colors.white} 
                    style={styles.loader} 
                    borderWidth={2}
                />
            }

            <View style={styles.footerView}>
                <Text style={styles.footerText}>
                   {Strings.LOREM_IPSUM}
                </Text>
            </View>
        </ImageBackground>
    )
} 

export default Splash;


