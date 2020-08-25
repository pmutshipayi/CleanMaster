import { ServiceModel } from "./ServiceModels";

export interface BookingModel{
    id: number,
    date: string,
    service: ServiceModel
}