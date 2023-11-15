export interface LoginInterface {
    token: string;
}

export interface AuthState {
    isFetching: boolean;
    error: boolean;
    token: string | null;
    userInfo: GetUserInfoInterface | null;
    logedOut: boolean;
    signUpError: boolean;
}

export interface GetUserInfoInterface {
    delete: boolean;
    hide: boolean;
    _id: string;
    email: string;
    role: string;
    name: string;
    phonenumer: string;
}

export interface SignUpPayload {
    email: string;
    phone_number: string;
    password: string;
    repassword: string;
    name: string;
}