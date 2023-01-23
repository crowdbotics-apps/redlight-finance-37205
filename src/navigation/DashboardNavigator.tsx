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
import { ChangePassword as ChangePasswordScreen } from "../screens/changePassword";
import { SettingScreen as SettingScreen } from "../screens/setting";
import SendCredit from '../screens/SendCredit';
import MoveCredit from '../screens/MoveCredit';
import HelpCenter from '../screens/HelpCenter';
import EnterPin from '../screens/EnterPin';
import { Walletscreen as WalletScreen } from '../screens/WalletScreen';
import { AddSubWallet as AddSubWalletScreen } from '../screens/AddSubWallet';
import { EditSubWallet as EditSubWalletScreen } from '../screens/EditSubWallet';
import { SetPinScreen as SetPinScreen } from '../screens/SetPinScreen';
import { ConfirmPinScreen as ConfirmPinScreen } from '../screens/ConfirmPinScreen';
import { SetNewPassword as SetNewPasswordScreen } from "../screens/setnewpassword";
import { TransactionHistoryScreen as TransactionHistoryScreen } from '../screens/TransactionHistoryScreen'

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
              <DashboardStack.Screen
                name="MoveCredit"
                component={MoveCredit}
            />
             <DashboardStack.Screen
                name="HelpCenter"
                component={HelpCenter}
            />
            <DashboardStack.Screen
                name="EnterPinScreen"
                component={EnterPin}
            />
            <DashboardStack.Screen
                name="WalletScreen"
                component={WalletScreen}
            />
            <DashboardStack.Screen
                name="AddSubWalletScreen"
                component={AddSubWalletScreen}
            />
            <DashboardStack.Screen
                name="EditSubWalletScreen"
                component={EditSubWalletScreen}
            />
            <DashboardStack.Screen
                name="SetPinScreen"
                component={SetPinScreen}
            />
            <DashboardStack.Screen
                name="ConfirmPinScreen"
                component={ConfirmPinScreen}
            />
               <DashboardStack.Screen
                name="SetNewPasswordScreen"
                component={SetNewPasswordScreen}
            />
            <DashboardStack.Screen
                name="TransactionHistoryScreen"
                component={TransactionHistoryScreen}
            />
        </DashboardStack.Navigator>
    )
}

export default DashboardNavigator