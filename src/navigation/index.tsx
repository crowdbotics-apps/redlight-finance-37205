import { createStackNavigator } from "@react-navigation/stack";
import React,{FC} from 'react'
import {Splash as SplashScreen} from "../screens/splash";
import {Signup as SignupScreen} from '../screens/signup'

const RootStack = createStackNavigator();
const RootNavigator : FC = ()=>{
    return (
        <RootStack.Navigator 
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown : false
            }}
        >
            <RootStack.Screen 
                name="SplashScreen"
                component={SplashScreen}
            />
             <RootStack.Screen 
                name="SignupScreen"
                component={SignupScreen}
            />
        </RootStack.Navigator>
    )
}

export default RootNavigator