export interface UserViewModel{
    id: number,
    fullName: string,
    email: string,
    phone: string,
    password: string,
    //address: string,
    token: string
}

export interface UserLoginViewModel {
    email: string,
    password: string
}

export interface UserLoginViewModelError {
    error: string;
    email: string[],
    password: string[]
}

export interface UserUpdateViewModelError extends UserLoginViewModelError{
    phone: string[],
    fullName: string[]
}


export interface UserUpdatePwdViewModel {
    currentPassword: string,
    newPassword: string
}