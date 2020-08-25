import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { CompanyModel } from "../../models/CompanyModels";
import { NavigationStackProp } from "react-navigation-stack";
import CompanyCard from "./CompanyCard";
import { PrimaryColor } from "../../AppConstant";
import Utility from "../../utils/Utility";
import ServiceList from "../CompanyServices/ServiceList";


interface IProps {
    navigation: NavigationStackProp
}


export default class CompanyDefaultScreen extends React.Component<IProps> {

    static navigationOptions = ({ navigation }: any) => ({
        title: Utility.firstToUppercase(navigation.getParam("company", "").name),
        headerStyle: {
            backgroundColor: PrimaryColor,
        },
        headerTintColor: 'white'
    });

    company: CompanyModel

    constructor(props: IProps) {
        super(props);
        this.company = this.props.navigation.getParam('company', '');
    }

    render() {
        return (
            <ScrollView>
                <CompanyCard
                    navigation={this.props.navigation}
                    company={this.company}
                />
                <View style={{ marginTop: 10, padding: 2 }}>
                    <Text style={{ fontSize: 21, fontWeight: 'bold' }}>
                        All services
                    </Text>
                </View>
                <Divider style={{marginTop: 10}} />
                <ServiceList
                    withoutCompanyInfo={true}
                    navigation={this.props.navigation}
                    searchModel={{ companyId: this.company.id }}
                />
            </ScrollView>
        )
    }
}