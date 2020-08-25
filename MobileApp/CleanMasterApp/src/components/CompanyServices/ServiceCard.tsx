import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import * as React from "react";
import Utility from "../../utils/Utility";
import { NavigationStackProp } from "react-navigation-stack";
import { ServiceModel } from "../../models/ServiceModels";
import { Divider } from "react-native-elements";
import { default as FontAwesomeIcon } from 'react-native-vector-icons/FontAwesome'

interface IProps {
    service: ServiceModel,
    navigation: NavigationStackProp,
    additionRendering?: React.ReactNode
    footer?: React.ReactNode,
    withoutCompanyInfo?: boolean
}

export default class ServiceCard extends React.Component<IProps>{
    render() {
        const service = this.props.service;

        return (
            <View style={styles.itemContainer}>
                <TouchableOpacity

                    onPress={() => {
                        this.props.navigation.navigate('ServiceDetail', {
                            service: this.props.service
                        })
                    }}>
                    {!this.props.withoutCompanyInfo ?
                        <View style={{ marginTop: 4 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <FontAwesomeIcon color='gray' name='university' size={13} />
                                <Text style={[[styles.itemCode], { marginLeft: 4 }]}>{Utility.firstToUppercase(service.company.name)}</Text>
                            </View>
                            {Utility.getImage(this.props.service.company.profilePicture)}
                        </View> : null}

                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.itemName}>{Utility.firstToUppercase(this.props.service.title)}</Text>
                    </View>

                    {this.props.additionRendering}

                   
                    <View style={{ marginTop: 10 }}>
                        {service.description ?
                            <Text style={styles.itemCode}>
                                {this.props.service.description}
                            </Text>
                            : <Text style={{ color: 'gray' }}>No description</Text>}
                    </View>

                    {this.props.footer}

                    <Divider style={{ marginTop: 15 }} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: 1,
        width: '85%',
        marginTop: 10,
        marginLeft: 10,
        padding: 10,
        elevation: 1
    },
    itemName: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 14,
        color: '#000',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
});