import React,{FC} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DashboardTabNavigator from './DashboardTabNavigator';
import { CashIn as CashInScreen} from '../screens/CashInScreen';
import ViewAllOnlineBanking from '../screens/ViewAllOnlineBanking';
import ViewAllWallet from '../screens/ViewAllWallet';
import ViewAllOverTheCounter from '../screens/ViewAllOverTheCounter';
import BankingDepositScreen from '../screens/BankingDepositScreen';
import DepositConfirmationScreen from '../screens/DepositConfirmationScreen';
import OverTheCounterDepositScreen from '../screens/OverTheCounterDepositScreen';
import ViewAllOnlineBankingWithdrawal from '../screens/ViewAllOnlineBankingWithdrawal';
import ViewAllWalletWithdrawal from '../screens/ViewAllWalletWithdrawal';
import CashOutDetailsScreen from '../screens/CashOutDetailsScreen';
import CashOut from '../screens/CashOutScreen';
import QRCodeScreen from '../screens/QRCodeScreen';
import { SetNewPassword as SetNewPasswordScreen } from "../screens/setnewpassword";
import { ChangePassword as ChangePasswordScreen } from "../screens/changePassword";
import { SettingScreen as SettingScreen } from "../screens/setting";
import SendCredit from '../screens/SendCredit';

const DashboardStack = createStackNavigator()

const DashboardNavigator : FC = () => {
    return (
        <DashboardStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <DashboardStack.Screen
                name="DashboardTabNavigation"
                component={DashboardTabNavigator}
            />
            <DashboardStack.Screen
                name="QRCode"
                component={QRCodeScreen}
            />
             <DashboardStack.Screen
                name="CashInScreen"
                component={CashInScreen}
            />
              <DashboardStack.Screen
                name="ViewAllOnlineBanking"
                component={ViewAllOnlineBanking}
            />
               <DashboardStack.Screen
                name="ViewAllWallet"
                component={ViewAllWallet}
            />
               <DashboardStack.Screen
                name="ViewAllOverTheCounter"
                component={ViewAllOverTheCounter}
            />
               <DashboardStack.Screen
                name="BankingDepositScreen"
                component={BankingDepositScreen}
            />
               <DashboardStack.Screen
                name="DepositConfirmationScreen"
                component={DepositConfirmationScreen}
            />
               <DashboardStack.Screen
                name="OverTheCounterDeposit"
                component={OverTheCounterDepositScreen}
            />
              <DashboardStack.Screen
                name="CashOutScreen"
                component={CashOut}
            />
               <DashboardStack.Screen
                name="ViewAllOnlineBankingWithdrawalScreen"
                component={ViewAllOnlineBankingWithdrawal}
            />
               <DashboardStack.Screen
                name="ViewAllWalletWithdrawalScreen"
                component={ViewAllWalletWithdrawal}
            />
               <DashboardStack.Screen
                name="CashOutDetailsScreen"
                component={CashOutDetailsScreen}
            />
               <DashboardStack.Screen
                name="SetNewPasswordScreen"
                component={SetNewPasswordScreen}
            />
               <DashboardStack.Screen
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
            />
               <DashboardStack.Screen
                name="SettingScreen"
                component={SettingScreen}
            />
               <DashboardStack.Screen
                name="SendCredit"
                component={SendCredit}
            />
        </DashboardStack.Navigator>
    )
}

export default DashboardNavigator