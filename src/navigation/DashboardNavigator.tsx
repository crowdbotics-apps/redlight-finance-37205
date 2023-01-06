import React,{FC} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DashboardTabNavigator from './DashboardTabNavigator';
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
        </DashboardStack.Navigator>
    )
}

export default DashboardNavigator