import React from "react";
import { View, ActivityIndicator, ToastAndroid } from "react-native";
import { Button } from "react-native-elements";
import { PrimaryColor } from "../../AppConstant";
import BookingAPi from "../../services/BookingApi";

interface IProps {
    bookingId: number,
    onDeletionCompleted(): void
}

interface IState {
    isDeleting: boolean
}

export default class BookingFooter extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);
        this.state = {
            isDeleting: false
        }
    }

    delete = () => {
        if (this.state.isDeleting)
            return;
        BookingAPi.delete(this.props.bookingId)
            .then(() => {
                ToastAndroid.show('The action was sucessfull', ToastAndroid.SHORT);
                this.props.onDeletionCompleted()
            })
            .catch(() => {
                ToastAndroid.show('Fail to remove the booking', ToastAndroid.SHORT);
            })
            .finally(() => {
                this.setState({isDeleting: false})
            })
    };

    render() {
        return (
            <View style={{ marginTop: 10, flexDirection: 'row' }}>
                {this.state.isDeleting ?
                    <ActivityIndicator
                        size={25}
                        color={PrimaryColor}
                    /> : null}
                <Button
                    buttonStyle={{
                        backgroundColor: 'red',
                    }}
                    title='Remove'
                    onPress={this.delete}
                />
            </View>
        )
    }
}