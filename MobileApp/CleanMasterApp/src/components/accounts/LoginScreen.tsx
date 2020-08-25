import * as React from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator
} from "react-native";
import { inject, observer } from "mobx-react";
import { Button } from "react-native-elements";
import { PrimaryColor } from "../../AppConstant";
import authStore from '../../stores/AuthStore';
import { NavigationStackOptions } from "react-navigation-stack";
import { action } from "mobx";
import { AxiosError } from "axios";
import { UserLoginViewModelError } from "../../models/UserModels";

interface IProps {
    navigation: any,
    // @ts-ignore
    authStore: AuthStore
}


class LoginScreen extends React.Component<IProps> {

    static navigationOptions: NavigationStackOptions = {
        title: 'Login',
        headerStyle: {
            backgroundColor: PrimaryColor
        },
        headerTintColor: 'white'
    };

    constructor(props: IProps) {
        super(props);
    }

    componentWillUnmount() {
        this.props.authStore.setPassword('');
        this.props.authStore.setEmail('');
    }

    signIn = () => {
        const login = this.props.authStore.login();
        if (login === undefined) return;

        login.then(action(async (response: any) => {
            await authStore.handleAuthAsync(response);
            this.props.navigation.navigate("Home");
            console.log("login sucess : ")
        })).catch(action((err: any) => {
            const result = err as AxiosError<UserLoginViewModelError>;
            // this.errors = result.response!.data;
            this.props.authStore.setErrors(result.response!.data);
        })).finally(action(() => {
            // this.isLoading = false;
            this.props.authStore.setLoading(false);
        }));
    };

    render() {
        const { errors, isAuthenticated } = this.props.authStore;
        /* if (isAuthenticated)
            this.props.navigation.navigate('Home');*/

        return (
            <View style={styles.mainView}>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.textField}
                        placeholder='Your email address'
                        onChangeText={value => {
                            this.props.authStore.setEmail(value)
                        }}
                    />
                    {errors.email && errors.email.length > 0 ?
                        <Text style={styles.error}>
                            {this.props.authStore.errors.email[0]}
                        </Text> : null}
                </View>
                <View style={styles.rowView}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.textField}
                        secureTextEntry={true}
                        placeholder='Password'
                        onChangeText={value => {
                            this.props.authStore.setPassword(value);
                        }}
                    />
                    {errors.password && errors.password.length > 0 ?
                        <Text style={styles.error}>
                            {this.props.authStore.errors.password[0]}
                        </Text> : null}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Button
                        buttonStyle={{ backgroundColor: PrimaryColor }}
                        onPress={this.signIn}
                        title='Login' />
                    {authStore.isLoading ?
                        <ActivityIndicator size='large' color={PrimaryColor} />
                        : null}

                    <View
                        style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}
                    >
                        <Text style={styles.label}>Or </Text>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('SignUp')}
                        >
                            <Text style={{ textDecorationLine: 'underline' }}>Register</Text>
                        </TouchableOpacity>

                    </View>


                </View>


                <TouchableOpacity
                style={{marginTop: 10}}
                    onPress={() => {
                        this.props.navigation.push("SConfig", {});
                    }}
                >
                    <Text style={{ textDecorationLine: 'underline' }}>IP address</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

export default inject('authStore')(observer(LoginScreen));

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
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