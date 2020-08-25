import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import { USER_LOCAL_PROFILE_KEY } from "../../stores/AuthStore";

interface IProps {
    navigation: any
}

export default class LogoutScreen extends React.Component<IProps> {

    componentDidMount() {
        this.logout();
    }

    async logout() {
        await AsyncStorage.removeItem(USER_LOCAL_PROFILE_KEY);
        this.props.navigation.navigate('Login');
    }

    render() {
        return (
            <View>
                <Text>Logging out...</Text>
            </View>
        )
    }

}