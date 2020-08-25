import {View, StyleSheet, Text, TextInput, ActivityIndicator, ScrollView} from "react-native";
import * as React from "react";
import userStore from "../../stores/UserStore";
import {PrimaryColor} from "../../AppConstant";
import {Button} from "react-native-elements";
import {inject, observer} from "mobx-react";

interface IProps{
    navigation: any,
    // @ts-ignore
    userStore: UserStore
}

class ProfileScreen extends React.Component<IProps> {

    componentDidMount(){
        this.props.userStore.initializeForm()
    }

    componentWillUnmount(){
        this.props.userStore.initializeForm();
    }

    update = () => {
        this.props.userStore.update();
        console.log('update called');
    };

    render() {
        const {errors, isUpdating, updateSuccess } = this.props.userStore;
        const store = this.props.userStore;
        return (
            <ScrollView>
                <View style={styles.mainView}>
                    {updateSuccess ? <Text>The update was successful.</Text> : null}
                    <View style={styles.rowView}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='Name'
                            value={store.form.fullName}
                            onChangeText={value => {
                                this.props.userStore.setName(value)
                            }}
                        />
                        {errors.fullName && errors.fullName.length > 0 ?
                            <Text style={styles.error}>
                                {errors.fullName[0]}
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
                        <Text style={styles.label}>Phone number</Text>
                        <TextInput
                            style={styles.textField}
                            placeholder='Password'
                            value={store.form.password}
                            onChangeText={value => {
                                this.props.userStore.setPassword(value)
                            }}
                        />
                        {errors.phone && errors.password.length > 0 ?
                            <Text style={styles.error}>
                                {errors.password[0]}
                            </Text> : null}
                    </View>


                    <View style={{flexDirection: 'row-reverse', marginTop: 20}}>
                        {store.isLoading ?
                            <ActivityIndicator size='large' color={PrimaryColor}/>
                            : null}
                        <Button
                            buttonStyle={{backgroundColor: PrimaryColor}}
                            onPress={this.update}
                            title='Update'/>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

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
export default inject('userStore')(observer(ProfileScreen))