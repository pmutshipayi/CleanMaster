import * as React from "react";
import {View, Text, ActivityIndicator, AsyncStorage} from "react-native";
import {PrimaryColor} from "../AppConstant";
import DataAccess from '../services/DataAccess'
import {USER_LOCAL_PROFILE_KEY} from '../stores/AuthStore';
import authStore from '../stores/AuthStore'
import {inject, observer} from "mobx-react";
import {UserViewModel} from "../models/UserModels";
import serverStore from "../services/ServerStore";

interface IProps{
    navigation: any,
    // @ts-ignore
    authStore: AuthStore
}

class LoadingScreen extends React.Component<IProps> {

    constructor(props: IProps){
        super(props)
    }

    componentDidMount(){
        serverStore.loadIpAddress();
        this._loadProfileAsync();
    }

    _loadProfileAsync = async () => {
       // await AsyncStorage.clear();
        const user = await DataAccess.get(USER_LOCAL_PROFILE_KEY);
        if (user){
            const convert = JSON.parse(user) as UserViewModel;
            this.props.authStore.setUser(convert);
        }
        this.props.navigation.navigate(user ? 'Home': 'Auth')
    };

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Loading...</Text>
                <ActivityIndicator size='large' color={PrimaryColor}/>
            </View>
        )
    }
}

export default inject('authStore')(observer(LoadingScreen));