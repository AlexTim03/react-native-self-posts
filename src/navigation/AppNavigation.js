import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen';
import { PostScreen } from '../screens/PostScreen';
import { BookedScreen } from '../screens/BookedScreen';
import { AboutScreen } from '../screens/AboutScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { THEME } from '../theme';


const screenOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR
}

const Stack = createStackNavigator()

const PostNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name="Main"
                component={MainScreen}
            />
            <Stack.Screen
                name="Post"
                component={PostScreen}
            />
        </Stack.Navigator>
    )
}

const BookedNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name="Booked"
                component={BookedScreen}
            />
            <Stack.Screen
                name="Post"
                component={PostScreen}
            />
        </Stack.Navigator>
    )
}

let Tab
let tabOptions

if (Platform.OS === 'android') {
    Tab = createMaterialBottomTabNavigator()
    tabOptions = {
        shifting: true,
        barStyle: {
            backgroundColor: THEME.MAIN_COLOR
        }
    }
} else {
    Tab = createBottomTabNavigator()
    tabOptions = {
        tabBarOptions: {
            activeTintColor: THEME.MAIN_COLOR,
            inactiveTintColor: '#cecece'
        }
    }
}

const BottomNavigator = () => (
    <Tab.Navigator
        {...tabOptions}
    >
        <Tab.Screen
            name="Post"
            component={PostNavigator}
            options={{
                title: 'Все',
                tabBarIcon: p => <Ionicons name='ios-albums' size={25} color={p.color} />
            }}
        />
        <Tab.Screen
            name="Booked"
            component={BookedNavigator}
            options={{
                title: 'Избранное',
                tabBarIcon: p => <Ionicons name='ios-star' size={25} color={p.color} />
            }}
        />
    </Tab.Navigator>
)

const AboutNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name="About"
                component={AboutScreen}
            />
        </Stack.Navigator>
    )
}

const CreateNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={screenOptions}
        >
            <Stack.Screen
                name="Create"
                component={CreateScreen}
            />
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
    <Drawer.Navigator
        drawerContentOptions={{
            activeTintColor: THEME.MAIN_COLOR,
            labelStyle: {
                fontFamily: 'open-bold'
            }
        }}
    >
        <Drawer.Screen
            name="PostTabs"
            component={BottomNavigator}
            options={{
                title: 'Главная',
                //drawerIcon: p => <Ionicons name='ios-star' size={25} color={p.color} />
            }}
        />
        <Drawer.Screen
            name="About"
            component={AboutNavigator}
            options={{
                title: 'О приложении'
            }}
        />
        <Drawer.Screen
            name="Create"
            component={CreateNavigator}
            options={{
                title: 'Новый пост'
            }}
        />
    </Drawer.Navigator>
)

export const AppNavigation = () => (
    <NavigationContainer>
        <DrawerNavigator />
    </NavigationContainer>
)
