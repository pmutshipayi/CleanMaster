import {UserUpdateViewModelError, UserViewModel} from "../models/UserModels";
import authStore from "./AuthStore";
import Utility from "../utils/Utility";
import UserService from "../services/UserService";
import {action, decorate, observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";

class UserStore {
    isLoading = false;
    operationSucceeded = false;
    form: UserViewModel = {
        id: 0,
        fullName: '',
        email: '',
        phone: '',
        token: '',
        password: ''
    };
    errors: UserUpdateViewModelError = {
        error: '',
        fullName: [],
        email: [],
        password: [],
        phone: []
    };

    initializeForm() {
        this.form = authStore.user!
    }

    setName(value: string) {
        this.form.fullName = value;
    }

    setEmail(value: string) {
        this.form.email = value.trim();
    }

    setPhone(value: string) {
        this.form.phone = value;
    }

    setPassword(value: string) {
        this.form.password = value;
    }

    isInvalid(): boolean {
        this.errors = {
            error: '',
            email: [],
            password: [],
            phone: [],
            fullName: []
        };
        if (!Utility.isValidEmail(this.form.email))
            this.errors.email.push('This is not a valid email address');
        if (!this.form.email) {
            this.errors.email.push('The email address is required')
        }
        if (!this.form.fullName) {
            this.errors.fullName.push('Your name is required')
        }
        if (this.form.phone && !Utility.isValidPhoneNumber(this.form.phone)) {
            this.errors.phone.push('This phone number is not valid');
        }
        return (
            this.errors.email.length > 0 ||
            this.errors.phone.length > 0 ||
            this.errors.fullName.length > 0
        );
    }

    update() {
        this.operationSucceeded = false;
        if (this.isInvalid())
            return;
        UserService.update(this.form)
            .then(action(async (response) => {
                const result = response as AxiosResponse<UserViewModel>;
                const user = result.data;
                user.token = authStore.user!.token;
                await authStore.saveUserAsync(user);
                this.operationSucceeded = true;
            }))
            .catch(action((err) => {
                const result = err as AxiosError<UserUpdateViewModelError>;
                this.errors = result.response!.data;
                console.log('error update user ' + err)
            }))
            .finally(action(() => {
                this.isLoading = false;
            }))
    }

    register() {
        this.operationSucceeded = false;
        if (this.isInvalid())
            return;

        // Validate the password

        if (!this.form.password) {
            this.errors.password.push('The password is required');
            return;
        }

        // Register

        this.isLoading = true;
        UserService.register(this.form)
            .then(action(async (response) => {
                await authStore.handleAuthAsync(response);
                this.operationSucceeded = true;
            }))
            .catch(action((err) => {
                const result = err as AxiosError<UserUpdateViewModelError>;
                this.errors = result.response!.data;
            }))
            .finally(action(() => {
                this.isLoading = false;
            }))
    }
}

decorate(UserStore, {
    isLoading: observable,
    form: observable,
    operationSucceeded: observable,
    errors: observable,
    initializeForm: action,
    setEmail: action,
    setName: action,
    setPhone: action,
    isInvalid: action,
    update: action
});
const userStore = new UserStore();
export default userStore;