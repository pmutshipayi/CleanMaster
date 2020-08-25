import * as React from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid, ActivityIndicator } from "react-native";
import { NavigationStackProp, NavigationStackOptions } from "react-navigation-stack";
import { ServiceModel } from "../../models/ServiceModels";
import { Divider, Button } from "react-native-elements";
import { PrimaryColor } from "../../AppConstant";
import CompanyCard from "../Companies/CompanyCard";
import BookingAPi from "../../services/BookingApi";


interface IProps {
    navigation: NavigationStackProp
}

interface IState {
    isBooking: boolean;
}

export default class ServiceDetailScreen extends React.Component<IProps, IState> {

    static navigationOptions: NavigationStackOptions = {
        headerStyle: {
            backgroundColor: PrimaryColor
        },
        headerTintColor: 'white'
    }

    service: ServiceModel;

    constructor(props: IProps) {
        super(props);
        this.service = this.props.navigation.getParam('service', '');
        this.state = {
            isBooking: false
        }
    }

    book = () => {
        if (this.state.isBooking) return;
        this.setState({ isBooking: true })
        BookingAPi.book(this.service.id)
            .then(() => {
                ToastAndroid.show('The booking was successfull', ToastAndroid.SHORT)
            })
            .catch((err) => {
                ToastAndroid.show("Something went wrong we couldn't make the booking", ToastAndroid.SHORT)
                console.log("fail book a service : " + err)
            })
            .finally(() => {
                this.setState({ isBooking: false });
            });
    };

    render() {
        const service = this.service;
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>{service.title}</Text>
                <View style={{ marginTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Description</Text>
                </View>
                <Divider style={{ marginTop: 10 }} />
                {service.description ?
                    <Text style={{ fontSize: 15, marginTop: 5 }}>
                        {this.service.description}
                    </Text> : <Text style={{ fontSize: 15, marginTop: 5, color: 'gray' }}>
                        No description
                        </Text>}

                <View style={{ flexDirection: 'row-reverse' }}>
                    <Button
                        buttonStyle={{ backgroundColor: PrimaryColor }}
                        onPress={this.book}
                        title='Book'
                    />
                    {this.state.isBooking ?
                        <ActivityIndicator
                            size={25}
                            color={PrimaryColor}
                        /> : null}
                </View>

                <Text style={{ fontWeight: 'bold', marginTop: 10, fontSize: 17 }}>Company information</Text>
                <View style={{ marginTop: 10, borderRadius: 1, elevation: 1, padding: 5 }}>
                    <CompanyCard
                        company={service.company}
                        navigation={this.props.navigation}
                    />
                </View>
            </View>
        )
    }
}