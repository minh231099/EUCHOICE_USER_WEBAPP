import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import {
    GET_USER_INFO,
    LOGIN,
    LOG_OUT
} from '../../types/authType';
import {
    AuthState,
} from './interfaces';
import { AuthActionTypes } from '../../actions/authAction';

const initalState: AuthState = {
    isFetching: false,
    error: false,
    token: null,
    userInfo: null,
    logedOut: false,
}

const authReducer = (state = initalState, action: AuthActionTypes) => {
    switch (action.type) {
        case LOGIN:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    logedOut: false,
                    token: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const { token } = action.payload;
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    logedOut: false,
                    token: token,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    logedOut: false,
                    token: null,
                }
            }
            break;
        case LOG_OUT:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    logedOut: false,
                    error: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    logedOut: true,
                    error: false,
                    token: null,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    logedOut: false,
                    error: true,
                }
            }
            break;
        case GET_USER_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const user = action.payload;
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    userInfo: user,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                }
            }
            break;
        default:
            return state;
    }
}

export default authReducer;