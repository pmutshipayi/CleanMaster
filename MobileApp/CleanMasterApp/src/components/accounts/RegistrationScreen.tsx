import * as React from "react";
import {TextInput, Text, View, StyleSheet, ScrollView, ActivityIndicator} from "react-native";
import {inject, observer} from "mobx-react";
import UserStore from '../../stores/UserStore'
import {Button} from "react-native-elements";
import {PrimaryColor} from "../../AppConstant";
import {NavigationStackOptions} from "react-navigation-stack";

interface IProps {
    // @ts-ignore
    userStore: UserStore,
    navigation: any
}

class RegistrationScreen extends React.Component<IProps> {

    static navigationOptions: NavigationStackOptions = {
        title: 'Join CleanMasterApp',
        headerStyle: {
            backgroundColor: PrimaryColor
        },
        headerTintColor: 'white'
    };

    constructor(props: IProps) {
        super(props);
    }

    register = () => {
        this.props.userStore.register()
    };

    render() {
        const {errors, operationSucceeded} = this.props.userStore;
        const store = this.props.userStore;
        if (operationSucceeded) {
            // Go home page

            this.props.navigation.navigate('Home');
        }
        return (
            <ScrollView>
                <View style={styles.mainView}>
                    <View style={styles.rowView}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder="Your name"
                            value={store.form.firstName}
                            onChangeText={value => {
                                this.props.userStore.setName(value)
                            }}
                        />
                        {errors.firstName && errors.firstName.length > 0 ?
                            <Text style={styles.error}>
                                {errors.firstName[0]}
                            </Text> : null}
                    </View>

                    <View>
                        <Text style={styles.label}>Email address</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='Email address'
                            value={store.form.email}
                            onChangeText={value => {
                                this.props.userStore.setEmail(value)
                            }}
                        />
                        {errors.email && errors.email.length > 0 ?
                            <Text style={styles.error}>
                                {errors.email[0]}
                            </Text> : null}
                    </View>

                    <View>
                        <Text style={styles.label}>Phone number</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='Phone number'
                            value={store.form.phone}
                            onChangeText={value => {
                                this.props.userStore.setPhone(value)
                            }}
                        />
                        {errors.phone && errors.phone.length > 0 ?
                            <Text style={styles.error}>
                                {errors.phone[0]}
                            </Text> : null}
                    </View>

                    <View>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='Password'
                            secureTextEntry={true}
                            value={store.form.password}
                            onChangeText={value => {
                                this.props.userStore.setPassword(value)
                            }}
                        />
                        {errors.password && errors.password.length > 0 ?
                            <Text style={styles.error}>
                                {errors.password[0]}
                            </Text> : null}
                    </View>

                    <View style={{flexDirection: 'row-reverse', marginTop: 20}}>
                        {store.isLoading ?
                            <ActivityIndicator size='large' color={PrimaryColor}/>
                            : null}
                        <Button
                            disabled={store.isLoading}
                            buttonStyle={{backgroundColor: PrimaryColor}}
                            onPress={this.register}
                            title='Register'/>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

export default inject('userStore')(observer(RegistrationScreen))
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginTop: 10,
        padding: 10,
        marginLeft: 5
    },
    textField: {
        width: 250,
        borderColor: '#d6d7da',
        borderWidth: 1,
        marginTop: 10
    },
    rowView: {
        padding: 3
    },
    label: {
        fontWeight: 'bold',
        fontSize: 15
    },
    error: {
        color: 'red'
    }
});