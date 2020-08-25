import * as React from "react";
import {TouchableOpacity, View} from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import {NavigationStackProp} from "react-navigation-stack";

interface IProps{
    navigation: NavigationStackProp
}

export default class NavigationDrawer extends React.Component<IProps> {

    toggleDrawer = () => {
        this.props.navigation.toggleDrawer();
    };

    render() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donut Button Image */}
                    <Icon name='menu' color='white' size={25}/>
                </TouchableOpacity>
            </View>
        )
    }
}