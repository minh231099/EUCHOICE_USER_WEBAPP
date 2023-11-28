export interface UpdateUserInfoPayload {
    name: string;
    email: string;
}

export interface AccountState {
    isFetching: boolean,
    error: boolean,
    errorMessage: undefined | string,
    changePasswordError: boolean,
}

export interface ChangePasswordPayload {
    current_password: string,
    new_password: string,
    confirm_password: string,
}