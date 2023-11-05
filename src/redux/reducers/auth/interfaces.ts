export interface LoginInterface {
    token: string;
}

export interface AuthState {
    isFetching: boolean;
    error: boolean;
    token: string | null;
    userInfo: GetUserInfoInterface | null;
    logedOut: boolean;
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