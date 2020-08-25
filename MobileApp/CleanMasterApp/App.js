/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { createAppContainer, createSwitchNavigator, createDrawerNavigator } from 'react-navigation'
import HomeScreen from "./src/components/Home/HomeScreen";
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from "./src/components/accounts/LoginScreen";
import RegistrationScreen from "./src/components/accounts/RegistrationScreen";
import AccountScreen from "./src/components/accounts/AccountScreen";
import { Provider } from "mobx-react";
import ServiceScreen from "./src/components/CompanyServices/ServiceScreen";
import { CompanyScreen } from "./src/components/Companies/CompanyScreen";
import LoadingScreen from "./src/components/LoadingScreen";
import authStore from "./src/stores/AuthStore";
import userStore from "./src/stores/UserStore";
import { PrimaryColor } from "./src/AppConstant";
import BookingScreen from "./src/components/Bookings/BookingScreen";
import Icon from "react-native-vector-icons/Feather";
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome'
import { Text, View } from "react-native";
import { DrawerItems } from 'react-navigation'
import ServiceDetailScreen from './src/components/CompanyServices/ServiceDetailScreen'
import CompanyDetailScreen from './src/components/Companies/CompanyDetailScreen'
import ProfileScreen from './src/components/accounts/ProfileScreen'
import ServerConfig from './src/components/ServerConfig'
import LogoutScreen from './src/components/accounts/LogoutScreen'


const authNavigator = createStackNavigator({
    Login: LoginScreen,
    SignUp: RegistrationScreen,
    SConfig: ServerConfig
});

const serviceNavigator = createStackNavigator({
    Services: ServiceScreen,
    ServiceDetail: ServiceDetailScreen
});

const companyNavigator = createStackNavigator({
    Companies: CompanyScreen,
    CompanyDetail: CompanyDetailScreen
});

const bookingNavigator = createStackNavigator({
    Bookings: BookingScreen
});

const accountNavigator = createStackNavigator({
    Accounts: ProfileScreen,
    //Profile: ProfileScreen
});

const DrawerContent = (props) => (
    <View>
        <View
            style={{
                backgroundColor: PrimaryColor,
                height: 140,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text style={{ color: 'white', fontSize: 30 }}>
                CleanMasterApp
            </Text>
        </View>
        <DrawerItems {...props} />
    </View>
);

const drawerNavigator = createDrawerNavigator({
    Services: {
        screen: serviceNavigator,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Icon name='briefcase' color={tintColor} size={23} />
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Icon name='user' color={tintColor} size={23} />
        }
    },
    Companies: {
        screen: companyNavigator,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <FontAwesomeIcon name='university' color={tintColor} size={23} />
        }
    },
    Bookings: {
        screen: bookingNavigator,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Icon name='shopping-bag' color={tintColor} size={23} />
        }
    },
    Logout: {
        screen: LogoutScreen,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Icon name='log-out' color={tintColor} size={23} />
        }
    },
    Config: {
        screen: ServerConfig,
        navigationOptions: {
            drawerIcon: ({ tintColor }) => <Icon name='settings' color={tintColor} size={23} />
        }
    }
},
    {
        contentComponent: DrawerContent,
        contentOptions: {
            activeTintColor: PrimaryColor
        },
        overlayColor: 'rgba(0, 0, 0, 0.7)'
    });

const AppContainer = createAppContainer(
    createSwitchNavigator({
        Loading: LoadingScreen,
        Home: drawerNavigator,
        Auth: authNavigator
    })
);

class App extends React.Component {
    render() {
        return (
            <Provider
                authStore={authStore}
                userStore={userStore}
            >
                <AppContainer />
            </Provider>
        );
    }
}

export default App;
