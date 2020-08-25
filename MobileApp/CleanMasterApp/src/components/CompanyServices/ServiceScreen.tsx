import * as React from "react";
import { PrimaryColor } from "../../AppConstant";
import NavigationDrawer from "../Shared/NavigationDrawer";
import { NavigationStackProp } from "react-navigation-stack";
import ServiceList from "./ServiceList";

interface IProps {
    navigation: NavigationStackProp
}

export default class ServiceScreen extends React.Component<IProps> {

    static navigationOptions = ({ navigation }: any) => ({
        title: 'Services',
        headerLeft: <NavigationDrawer navigation={navigation} />,
        drawerLabel: 'Services',
        headerStyle: {
            backgroundColor: PrimaryColor,
        },
        headerTintColor: 'white'
    });

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return <ServiceList navigation={this.props.navigation} />;
    }
}

