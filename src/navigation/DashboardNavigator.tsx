import React,{FC} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DashboardTabNavigator from './DashboardTabNavigator';
import { CashIn as CashInScreen} from '../screens/CashInScreen';
import ViewAllOnlineBanking from '../screens/ViewAllOnlineBanking';
import ViewAllWallet from '../screens/ViewAllWallet';
import ViewAllOverTheCounter from '../screens/ViewAllOverTheCounter';
import QRCodeScreen from '../screens/QRCodeScreen';

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
        </DashboardStack.Navigator>
    )
}

export default DashboardNavigator