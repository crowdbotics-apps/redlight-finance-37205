import React,{FC} from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import {Splash as SplashScreen} from "../screens/splash";
import {Signup as SignupScreen} from '../screens/signup'
import {CodeVerification as CodeVerificationScreen} from "../screens/codeVerification";
import { Signin as SigninScreen } from "../screens/signin";
import { ForgotPassword as ForgotPasswordScreen } from "../screens/forgotpassword";
import { SetNewPassword as SetNewPasswordScreen } from "../screens/setnewpassword";
import { ChangePassword as ChangePasswordScreen } from "../screens/changePassword";
import { Myprofile as MyProfileScreen } from "../screens/myProfile";
import { SettingScreen as SettingScreen } from "../screens/setting";
import Home from "../screens/home"
import { Walletscreen as WalletScreen } from '../screens/WalletScreen';

import DashboardNavigator from "./DashboardNavigator";
import { AddSubWallet as AddSubWalletScreen} from '../screens/AddSubWallet';
import { EditSubWallet  as EditSubWalletScreen} from '../screens/EditSubWallet';

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
                name="SetNewPasswordScreen"
                component={SetNewPasswordScreen}
            />
            <RootStack.Screen
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
            />
            <RootStack.Screen
                name="MyProfileScreen"
                component={MyProfileScreen}
            />
            <RootStack.Screen
                name="SettingScreen"
                component={SettingScreen}
            />
            <RootStack.Screen
                name="HomeScreen"
                component={Home}
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
        </RootStack.Navigator>
    )
}

export default RootNavigator