import React, { FC } from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import { Splash as SplashScreen } from "../screens/splash";
import { Signup as SignupScreen } from '../screens/signup'
import { CodeVerification as CodeVerificationScreen } from "../screens/codeVerification";
import { Signin as SigninScreen } from "../screens/signin";
import { ForgotPassword as ForgotPasswordScreen } from "../screens/forgotpassword";
import Home from "../screens/home"
import { Walletscreen as WalletScreen } from '../screens/WalletScreen';

import DashboardNavigator from "./DashboardNavigator";
import { AddSubWallet as AddSubWalletScreen } from '../screens/AddSubWallet';
import { EditSubWallet as EditSubWalletScreen } from '../screens/EditSubWallet';
import { SetPinScreen as SetPinScreen } from '../screens/SetPinScreen';
import { ConfirmPinScreen as ConfirmPinScreen } from '../screens/ConfirmPinScreen';

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
            <RootStack.Screen
                name="WalletScreen"
                component={WalletScreen}
            />
            <RootStack.Screen
                name="AddSubWalletScreen"
                component={AddSubWalletScreen}
            />
            <RootStack.Screen
                name="EditSubWalletScreen"
                component={EditSubWalletScreen}
            />
            <RootStack.Screen
                name="SetPinScreen"
                component={SetPinScreen}
            />
            <RootStack.Screen
                name="ConfirmPinScreen"
                component={ConfirmPinScreen}
            />
        </RootStack.Navigator>
    )
}

export default RootNavigator