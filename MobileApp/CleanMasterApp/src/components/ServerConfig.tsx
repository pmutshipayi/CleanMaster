import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from 'react-native-elements'
import serverStore from "../services/ServerStore";
import { PrimaryColor } from "../AppConstant";


interface IProps {

}

interface IState {
    ipAddress: string
}

export default class ServerComponent extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            ipAddress: serverStore.IPAddress
        }
    }

    changeIpAddress = (value: string) => {
        this.setState({ ipAddress: value })
    }

    render() {
        return (
            <View style={{ marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    CleanMasterApp 
                </Text>
                <Text style={{marginTop: 100}}>
                    Enter CleanMasterApp's Server IP Address
                </Text>
                <TextInput
                    style={{ borderWidth: 1, borderColor: 'gray', width: '60%', marginTop: 10 }}
                    value={this.state.ipAddress}
                    onChangeText={value => this.changeIpAddress(value)}
                />
                <View style={{ marginTop: 10 }}></View>
                <Button
                    title="Set IP Address"
                    buttonStyle={{backgroundColor: PrimaryColor}}
                    onPress={() => {
                        serverStore.setIPaddress(this.state.ipAddress)
                    }}
                />
            </View>
        )
    }

}