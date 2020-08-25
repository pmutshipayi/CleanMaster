import React from "react";
import { CompanyModel } from "../../models/CompanyModels";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Utility from "../../utils/Utility";
import { Divider } from 'react-native-paper';
import { NavigationStackProp } from "react-navigation-stack";

interface IProps {
    navigation: NavigationStackProp,
    company: CompanyModel
}


export default class CompanyListCard extends React.Component<IProps>{

    render() {

        const company = this.props.company;

        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('CompanyDetail', {
                        company: company
                    })
                }}
            >
                <View style={styles.view}>
                    {Utility.getImage(
                        company.profilePicture,
                        50,
                        50,
                        {
                            borderRadius: 100,
                            borderColor: 'gray'
                        }
                    )}
                    <Text
                        style={styles.name}
                    >
                        {Utility.firstToUppercase(company.name)}
                    </Text>
                </View>
                <Divider style={{ borderWidth: 0.1 }} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        padding: 5,

    },
    name: {
        padding: 10,
        marginTop: 4
    }
})