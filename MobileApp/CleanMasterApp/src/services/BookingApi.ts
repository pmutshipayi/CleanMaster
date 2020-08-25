import { AxiosResponse } from "axios";
import { BookingModel } from "../models/BookingModels";
import ApiRequest from "./ApiRequest";
import authStore from "../stores/AuthStore";

export default class BookingAPi{
    static book(serviceId: number): Promise<AxiosResponse<BookingModel>>{
        return ApiRequest.post('api/ServiceBookings', {
            userId: authStore.user!.id,
            serviceId: serviceId
        }) 
    }

    static getAll(): Promise<AxiosResponse<BookingModel[]>>{
        return ApiRequest.get('api/ServiceBookings');
    }

    static delete(id: number){
        return ApiRequest.delete(`api/ServiceBookings/${id}`);
    }
}