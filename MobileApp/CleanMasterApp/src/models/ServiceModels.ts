import {CompanyModel} from "./CompanyModels";

export interface ServiceModel{
    id: number,
    title: string,
    description: string,
    company: CompanyModel
}

export interface ServiceSearchModel{
    name?: string,
    companyId?: number
}