import ApiRequest from "./ApiRequest";
import {AxiosResponse} from "axios";
import {ServiceModel} from "../models/ServiceModels";

export default class ServiceApi{
    static getAll(params?: {}): Promise<AxiosResponse<ServiceModel[]>>{
        return ApiRequest.get('api/services', params)
    }

    static getAllForCompany(companyId: number): Promise<AxiosResponse<ServiceModel[]>>{
        return ApiRequest.get('api/services', {
            companyId: companyId
        })
    }
}