import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { CompanyModel } from "../../models/CompanyModels";
import Utility from "../../utils/Utility";
import Icon from 'react-native-vector-icons/Feather'
import { NavigationStackProp } from "react-navigation-stack";


interface IProps {
    navigation: NavigationStackProp,
    company: CompanyModel
}

export default class CompanyCard extends React.Component<IProps>{

    render() {
        const company = this.props.company;
        let emails;
        let phones;
        let address;
        if (company.email) {
            emails = <View>
                <View style={styles.infoTitleView}>
                    <Icon name='mail' size={20} />
                    <Text style={styles.infoTitle}>Email</Text>
                </View>
                <View style={styles.infoContent}>
                    <Text>{company.email}</Text>
                </View>
            </View>
        }
        if (company.phone) {
            phones = <View>
                <View style={styles.infoTitleView}>
                    <Icon name='phone' size={20} />
                    <Text style={styles.infoTitle}>Phones</Text>
                </View>
                <View style={styles.infoContent}>
                    <Text>{company.phone}</Text>
                </View>
            </View>
        }
        if (company.address) {
            address = <View>
                <View style={styles.infoTitleView}>
                    <Icon name='map-pin' size={20} />
                    <Text style={styles.infoTitle}>Address</Text>
                </View>
                <View style={styles.infoContent}>
                    <Text>{company.address}</Text>
                </View>
            </View>
        }
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('CompanyDetail', {
                        company: company
                    })
                }}
            >
                <View style={{ flexDirection: 'row' }}>
                        {Utility.getImage(company.profilePicture, '40%', '98%', styles.image)}
                        <View style={{ padding: 5, marginLeft: 10 }}>
                            <Text
                                style={{ fontSize: 18, fontWeight: 'bold' }}>
                                {Utility.firstToUppercase(company.name)}
                            </Text>
                            <View style={{ marginTop: 10 }}>
                                {emails}
                                {phones}
                                {address}
                            </View>
                        </View>
                    </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    mainView: {
        borderRadius: 1,
        padding: 5,
        flex: 1
    },
    infoTitleView: {
        marginLeft: 10,
        marginTop: 10,
        flexDirection: 'row',
    },
    infoTitle: {
        marginLeft: 5,
        fontWeight: 'bold'
    },
    infoContent: {
        marginLeft: 35,
        marginTop: 2,
        width: '80%'
    },
    image: {
        padding: 2,
        marginTop: 5,
        marginLeft: 4
    }
});