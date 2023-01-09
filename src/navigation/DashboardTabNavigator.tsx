import React,{FC} from 'react'
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { SvgFromXml, SvgXml } from "react-native-svg"
import Home from '../screens/home';
import Profile from '../screens/profile';
import QRScanner from '../screens/QRScanner';
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
                component={Profile}
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
