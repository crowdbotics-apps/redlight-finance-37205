import React,{useState,useEffect,FC} from 'react'
import {View,Text,ImageBackground,StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress'
import styles from './styles'
import Images from '../../assets/Images'
import { Colors } from '../../theme/Colors'

const Splash : FC = () =>  {
    const [isLoading,setIsLoading] = useState<Boolean>(false);
    const navigation = useNavigation();

    useEffect(()=>{
        setIsLoading(true)
        const timer = setTimeout(()=>{
            setIsLoading(false)
            navigation.navigate('SigninScreen')
        },3000)

        return ()=>{
            clearTimeout(timer)
        }
            
    },[])

    return (
        <ImageBackground source={Images.SplashBg} resizeMode="cover" style={styles.image}>
            <StatusBar barStyle='light-content'/>
            <View style={styles.mainView}>
                <Text style={styles.mainText}>Pandoras Vault</Text>
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    In pulvinar ac justo vel molestie. Vivamus in mollis dolor. 
                    Mauris dapibus, justo sed consequat congue
                </Text>
            </View>
        </ImageBackground>
    )
} 

export default Splash;


