import * as React from "react";
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import NavigationDrawer from "../Shared/NavigationDrawer";
import { PrimaryColor } from "../../AppConstant";
import { BookingModel } from "../../models/BookingModels";
import { FlatGrid } from "react-native-super-grid";
import ServiceCard from "../CompanyServices/ServiceCard";
import { NavigationStackProp } from "react-navigation-stack";
import BookingAPi from "../../services/BookingApi";
import Icon from 'react-native-vector-icons/Feather'
import { Button } from "react-native-elements";
import BookingFooter from "./BookFooter";


interface IProps {
    navigation: NavigationStackProp
}

interface IState {
    isLoading: boolean,
    bookings: BookingModel[]
}

export default class BookingScreen extends React.Component<IProps, IState>{

    static navigationOptions = ({ navigation }: any) => ({
        title: 'Bookings',
        headerLeft: <NavigationDrawer navigation={navigation} />,
        drawerLabel: 'Services',
        headerStyle: {
            backgroundColor: PrimaryColor,
        },
        headerTintColor: 'white'
    });

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            bookings: []
        }
    }

    componentDidMount() {
        this.loadBookings();
    }

    loadBookings = () => {
        if (this.state.isLoading)
            return;
        BookingAPi.getAll()
            .then((result) => {
                this.setState({ bookings: result.data })
            })
            .catch((err) => {
                console.log('error fetch bookings : ' + err);
            })
            .finally(() => {
                this.setState({ isLoading: false })
            })
    };

    render() {
        const bookings = this.state.bookings;
        let content;
        if (this.state.isLoading)
            content = (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color={PrimaryColor} />
                </View>
            );
        else
            content = (
                <FlatGrid
                    itemDimension={190}
                    items={bookings}
                    style={styles.gridView}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() =>
                                this.loadBookings()
                            }
                        />
                    }
                    renderItem={({ item, index }) => (
                        <ServiceCard
                            additionRendering={
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Icon name='calendar' size={20} />
                                    <Text style={{ marginLeft: 2, fontSize: 14 }}>{item.date.split('T')[0]}</Text>
                                </View>
                            }
                            footer={
                                <BookingFooter
                                    bookingId={item.id}
                                    onDeletionCompleted={() => {
                                        this.loadBookings();
                                    }}
                                />
                            }
                            service={item.service}
                            navigation={this.props.navigation} />
                    )}
                />
            );
        return content;
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 25,
        flex: 1
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 130
    },
    itemName: {
        fontSize: 13,
        color: 'black',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 10,
        color: '#000',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
});