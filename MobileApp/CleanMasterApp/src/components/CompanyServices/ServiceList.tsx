import React from "react"
import { ActivityIndicator, ScrollView, View } from "react-native";
import { ServiceModel, ServiceSearchModel } from "../../models/ServiceModels";
import ServiceApi from "../../services/ServiceApi";
import { PrimaryColor } from "../../AppConstant";
import ServiceCard from "./ServiceCard";
import { NavigationStackProp } from "react-navigation-stack";

interface IProps {
    navigation: NavigationStackProp,
    searchModel?: ServiceSearchModel,
    withoutCompanyInfo?: boolean
}

interface IState {
    isLoading: boolean,
    services: ServiceModel[]
}

export default class ServiceList extends React.Component<IProps, IState>{

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: false,
            services: []
        }
    }

    componentDidMount() {
        this.loadServices();
    }

    loadServices = () => {
        if (this.state.isLoading)
            return;
        this.setState({ isLoading: true });
        ServiceApi.getAll(this.props.searchModel)
            .then((result) => {
                this.setState({ services: result.data });
            })
            .catch((err) => {
            })
            .finally(() => {
                this.setState({ isLoading: false })
            })
    }

    render() {

        const { isLoading, services } = this.state;
        return isLoading ? <ActivityIndicator size={30} color={PrimaryColor} />
            : (
                <ScrollView>
                   {services.map((item) => (
                        <ServiceCard
                            withoutCompanyInfo={this.props.withoutCompanyInfo}
                            service={item}
                            navigation={this.props.navigation} />
                    ))}   
                </ScrollView>
            );
    }
}