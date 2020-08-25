import React from "react";
import { View } from "react-native";
import { BookingModel } from "../../models/BookingModels";
import { NavigationStackProp } from "react-navigation-stack";
import ServiceCard from "../CompanyServices/ServiceCard";

interface IProps {
    booking: BookingModel,
    navigation: NavigationStackProp
}

export default class BookingCard extends React.Component<IProps>{
    render() {
        return (
            <View>
                <ServiceCard
                    service={this.props.booking.service}
                    navigation={this.props.navigation} />
            </View>
        )
    }
}