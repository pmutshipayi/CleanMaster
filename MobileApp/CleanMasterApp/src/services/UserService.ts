import {UserLoginViewModel, UserUpdatePwdViewModel, UserViewModel} from "../models/UserModels";
import {AxiosResponse} from "axios";
import ApiRequest from "./ApiRequest";

export default class UserService{

    static login(user: UserLoginViewModel): Promise<AxiosResponse<UserLoginViewModel>>{
        return ApiRequest.post('api/users/auth', user);
    }

    static register(user: UserViewModel): Promise<AxiosResponse<UserViewModel>>{
        return ApiRequest.post('api/users', user);
    }

    static logout = () => ApiRequest.get('api/users/logout');

    static update(user: UserViewModel){
        return ApiRequest.put(`api/users/${user.id}`, user);
    }

    static updatePassword(model: UserUpdatePwdViewModel){
        return ApiRequest.put('api/users/set_password', model)
    }
}