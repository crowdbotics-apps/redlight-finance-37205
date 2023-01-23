import React, { FC } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { Splash as SplashScreen } from "../screens/splash";
import { Signup as SignupScreen } from '../screens/signup'
import { CodeVerification as CodeVerificationScreen } from "../screens/codeVerification";
import { Signin as SigninScreen } from "../screens/signin";
import { ForgotPassword as ForgotPasswordScreen } from "../screens/forgotpassword";
import DashboardNavigator from "./DashboardNavigator";

const RootStack = createStackNavigator();
const RootNavigator: FC = () => {
    return (
        <RootStack.Navigator
            initialRouteName="SplashScreen"
            screenOptions={{
                headerShown: false
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
            <RootStack.Screen
                name="CodeVerificationScreen"
                component={CodeVerificationScreen}
            />
            <RootStack.Screen
                name="SigninScreen"
                component={SigninScreen}
            />
            <RootStack.Screen
                name="ForgotPasswordScreen"
                component={ForgotPasswordScreen}
            />
            <RootStack.Screen
                name="DashboardNavigaton"
                component={DashboardNavigator}
            />
            
        </RootStack.Navigator>
    )
}

export default RootNavigator