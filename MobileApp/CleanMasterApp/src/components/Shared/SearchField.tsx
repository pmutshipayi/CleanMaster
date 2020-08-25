import React from "react";
import { View, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from "react-native-gesture-handler";

interface IProps {
    onTextChange(text: string): void
}

interface IState {
    display: 'none' | 'flex'
}


export default class SearchField extends React.Component<IProps, IState> {

    isOpen: boolean
    display: string = 'none'

    constructor(props: IProps) {
        super(props);
        this.state = {
            display: 'none'
        }
    }

    handlerClick = () => {
        this.isOpen ? this.setState({ display: 'none' }) : this.setState({ display: 'flex' });
        this.isOpen = !this.isOpen;
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={this.handlerClick}
                >
                    <Icon name='search' size={25} color='white' />
                </TouchableOpacity>
                <TextInput
                    style={{
                        display: this.state.display,
                        fontSize: 18,
                        color: 'white',
                        padding: 10,
                        width: 150,
                        borderColor: '#d6d7da',
                        borderWidth: 1,
                    }}
                    placeholder='Search'
                    onChangeText={value => this.props.onTextChange(value)}
                />
            </View>
        )
    }
}