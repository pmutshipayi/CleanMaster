import {
    View,
    ActivityIndicator,
    RefreshControl,
    StyleSheet,
    ScrollView
} from "react-native";
import * as React from "react";
import NavigationDrawer from "../Shared/NavigationDrawer";
import { PrimaryColor } from "../../AppConstant";
import { CompanyModel } from "../../models/CompanyModels";
import CompanyApi from "../../services/CompanyApi";
import { FlatGrid } from "react-native-super-grid";
import CompanyListCard from "./CompanyListCard";
import { NavigationStackProp } from "react-navigation-stack";

interface IProps {
    navigation: NavigationStackProp
}

interface IState {
    isLoading: boolean,
    companies: CompanyModel[]
}

export class CompanyScreen extends React.Component<IProps, IState> {

    static navigationOptions = ({ navigation }: any) => ({
        title: 'Companies',
        headerLeft: <NavigationDrawer navigation={navigation} />,
        drawerLabel: 'Services',
        headerStyle: {
            backgroundColor: PrimaryColor,
        },
        headerTintColor: 'white'
    });

    constructor(props: IProps) {
        super(props);
        this.state = {
            isLoading: false,
            companies: []
        }
    }

    componentDidMount() {
        this.loadCompanies();
    }

    loadCompanies = () => {

        if (this.state.isLoading)
            return;
        this.setState({ isLoading: true });
        CompanyApi.getAll()
            .then((result) => {
                this.setState({ companies: result.data })
            })
            .catch(() => {

            })
            .finally(() => {
                this.setState({ isLoading: false })
            })
    };


    render() {
        const companies = this.state.companies;
        let content;
        if (this.state.isLoading)
            content = (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size='large' color={PrimaryColor} />
                </View>
            );
        else
            content = <FlatGrid
                itemDimension={190}
                items={companies}
                style={styles.gridView}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={() =>
                            this.loadCompanies()
                        }
                    />
                }
                renderItem={({ item, index }) => (
                    <ScrollView>
                        <CompanyListCard
                            company={item} 
                            navigation={this.props.navigation}
                            />
                    </ScrollView>
                )}
            />


        return content;
    }
}

const styles = StyleSheet.create({
    gridView: {
        marginTop: 25,
        flex: 1
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 130
    },
    itemName: {
        fontSize: 13,
        color: 'black',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 10,
        color: '#000',
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    }
});