import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import { GetUserInfoInterface, LoginInterface, SignUpPayload } from '../reducers/auth/interfaces';

import { LOGIN, GET_USER_INFO, LOG_OUT, SIGN_UP } from '../types/authType';

const { AUTH } = prefix;

interface LoginActionType {
    type: typeof LOGIN;
    payload: LoginInterface;
}

/**
 * @LOGIN
 */

const loginType = { prefix: AUTH, type: LOGIN }

export interface LoginPayload {
    email: string;
    password: string;
}

export const login = (payload: LoginPayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.AUTH.login();
    dispatch(isDispatchCalling(loginType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(loginType, response.data));
    else dispatch(isDispatchFailed(loginType, error));
}

interface GetUserInfoType {
    type: typeof GET_USER_INFO;
    payload: GetUserInfoInterface;
}

/**
 * @GET_USER_INFO
 */

const getUserInfoType = { prefix: AUTH, type: GET_USER_INFO };

export const getUserInfo = () => async (dispatch: Dispatch) => {
    const api = API_URLS.AUTH.userInfo();
    dispatch(isDispatchCalling(getUserInfoType));
    const { response, error } = await apiCall({ ...api });
    if (response) dispatch(isDispatchSuccess(getUserInfoType, response.data));
    else dispatch(isDispatchFailed(getUserInfoType, error));
}

interface LogoutType {
    type: typeof LOG_OUT;
    payload: undefined;
}

/**
 * @LOG_OUT
 */

const logoutType = { prefix: AUTH, type: LOG_OUT };

export const logOut = () => async (dispatch: Dispatch) => {
    const api = API_URLS.AUTH.logOut();
    dispatch(isDispatchCalling(logoutType));
    const { response } = await apiCall({ ...api });
    if (response) dispatch(isDispatchSuccess(logoutType));
    else dispatch(isDispatchFailed(logoutType));
}

interface SignUpType {
    type: typeof SIGN_UP;
    payload: undefined;
}

/**
 * @SIGN_UP
 */

const signUpType = { prefix: AUTH, type: SIGN_UP };

export const signUp = (payload: SignUpPayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.AUTH.signUp();
    dispatch(isDispatchCalling(signUpType));
    const { response, error } = await apiCall({ ...api, payload });
    if (response) dispatch(isDispatchSuccess(signUpType, response.data));
    else dispatch(isDispatchFailed(signUpType, error));
}

export type AuthActionTypes = LoginActionType | GetUserInfoType | LogoutType | SignUpType;