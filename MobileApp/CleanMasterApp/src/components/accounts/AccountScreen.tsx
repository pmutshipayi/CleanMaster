import {Text, View, AsyncStorage} from "react-native";
import React from "react";
import {ListItem} from "react-native-elements";
import {inject, observer} from "mobx-react";
import { USER_LOCAL_PROFILE_KEY } from "../../stores/AuthStore";

interface IProps {
    navigation: any,
    // @ts-ignore
    authStore: AuthStore
}

class AccountScreen extends React.Component<IProps> {

    constructor(props: IProps){
        super(props)
    }

    handlePress = async (title: string) => {
        switch (title) {
            case 'Update account':
                this.props.navigation.navigate('Profile');
                break;
            case 'Logout':
                this.props.authStore.logout();
                // await AsyncStorage.removeItem(USER_LOCAL_PROFILE_KEY);
                this.props.navigation.navigate('Login');
                break;
        }
    };

    render() {
        const list = [
            {
                title: 'Update account',
                icon: 'person'
            },
            {
               title: 'Delete my account',
               icon: 'remove'
            },
            {
                title: 'Logout',
                icon: 'exit-to-app'
            }
        ];

        return (
            <View>
                {
                    list.map((item, i) => (
                        <ListItem
                            key={i}
                            title={item.title}
                            leftIcon={{ name: item.icon }}
                            bottomDivider
                            chevron
                            onPress={(e) => {
                                this.handlePress(item.title)
                            }}
                        />
                    ))
                }
            </View>
        )
    }
}
export default inject('authStore')(observer(AccountScreen));