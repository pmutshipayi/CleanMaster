import {UserLoginViewModelError, UserViewModel} from "../models/UserModels";
import {action, decorate, observable} from "mobx";
import UserService from "../services/UserService";
import {AxiosError, AxiosResponse} from "axios";
import {AUTH_TOKEN_KEY} from "../services/ApiRequest";
import DataAccess from "../services/DataAccess";
import Utility from "../utils/Utility";
import {AsyncStorage} from "react-native";

export const USER_LOCAL_PROFILE_KEY = 'user-token';


class AuthStore {
    isLoading = false;
    isAuthenticated = false;
    email: string = '';
    password: string = '';
    errors: UserLoginViewModelError = {
        error: '',
        email: [],
        password: []
    };
    user?: UserViewModel = undefined;

    handleAuthAsync = async (response: any) => {
        const result = response as AxiosResponse<UserViewModel>;
        this.user = result.data;
        this.user.token = result.headers[AUTH_TOKEN_KEY];
        this.isLoading = false;
        this.isAuthenticated = true;

        // Persist data

        await DataAccess.save(USER_LOCAL_PROFILE_KEY, JSON.stringify(this.user));
    };

    setEmail(email: string) {
        this.email = email.trim();
    }

    setPassword(password: string) {
        this.password = password;
    }

    setUser(user: UserViewModel) {
        this.user = user;
    }

    setErrors(errors: UserLoginViewModelError){
        this.errors = errors;
    }

    setLoading(state: boolean) {
        this.isLoading = state;
    }

    /**
     * Save user on the local storage
     * @param user
     */
    async saveUserAsync(user: UserViewModel) {
        await DataAccess.save(USER_LOCAL_PROFILE_KEY, JSON.stringify(user));
        this.user = user;
    }

    validate() {
        this.errors = {
            error: '',
            email: [],
            password: []
        };
        if (!Utility.isValidEmail(this.email))
            this.errors.email.push('This is not a valid email address');
        if (!this.email) {
            this.errors.email.push('The email address is required')
        }
        if (!this.password) {
            this.errors.password.push('The password is required');
        }
    }

    login() {
        this.validate();
        if (this.errors.email.length > 0 ||
            this.errors.password.length > 0 ||
            this.errors.error)
            return;

        this.isLoading = true;
        return UserService.login({
            email: this.email,
            password: this.password
        });
    }

    logout() {
        UserService.logout()
            .then(action(async (response) => {
                await AsyncStorage.clear();
                this.isAuthenticated = false;
                this.user = undefined;
            }))
            .catch(action((err) => {

            }))
            .finally(action(() => {

            }))
    }
}

decorate(AuthStore, {
    isLoading: observable,
    isAuthenticated: observable,
    errors: observable,
    email: observable,
    password: observable,
    user: observable,
    login: action,
    validate: action,
    setEmail: action,
    setPassword: action,
    setUser: action,
    saveUserAsync: action,
    setErrors: action,
    setLoading: action
});
const authStore = new AuthStore();
export default authStore;