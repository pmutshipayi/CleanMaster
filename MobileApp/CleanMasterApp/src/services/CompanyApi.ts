import { AxiosResponse } from "axios";
import { CompanyModel } from "../models/CompanyModels";
import ApiRequest from "./ApiRequest";

export default class CompanyApi{
    static getAll(): Promise<AxiosResponse<CompanyModel[]>>{
        return ApiRequest.get('api/companies');
    }
}