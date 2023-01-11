import React,{FC} from 'react'
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import QRScanner from '../screens/QRScanner';
import MyProfile from '../screens/myProfile/MyProfile';
import TokenPortfolio from '../screens/TokenPortfolio';
import { Colors } from '../theme/Colors';
import Icons from '../assets/Icons'

const tabIconSize = 26
const Tab = createBottomTabNavigator();

const DashboardTabNavigator : FC = () =>{
    return (
        <Tab.Navigator
            initialRouteName={"home"}
            screenOptions = {{
                headerShown : false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: Colors.RedBaron,
                tabBarInactiveTintColor: Colors.RedBaron,
                tabBarStyle : {
                    height : Platform.OS === 'ios' ? '10%' : '10%',
                    backgroundColor  : Colors.lightBlack,
                }
            }}
        >
            <Tab.Screen
                name="home"
                component={Home}
                options={{
                    tabBarIcon: ({focused }) => (
                        focused ? <Icons.tabHomeSelected />  : <Icons.tabHome/>
                    ),
                }}
            />
             <Tab.Screen
                name="Token"
                component={TokenPortfolio}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused ? <Icons.BitcoinTokenSelected />  : <Icons.BitcoinToken/>
                    ),
                }}
            />
             <Tab.Screen
                name="QrScanner"
                component={QRScanner}
                options={{
                    tabBarStyle : {display : 'none'},
                    tabBarIcon: ({ focused }) => (
                        focused ? <Icons.ScannerIcon/>: <Icons.ScannerIcon/>
                    ),
                }}
            />
            <Tab.Screen
                name="profile"
                component={MyProfile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        focused ? <Icons.tabProfileSelected />  : <Icons.tabProfile/>
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default DashboardTabNavigator
