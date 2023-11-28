import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import { ChangePasswordPayload, UpdateUserInfoPayload } from '../reducers/account/interfaces';

import {
    UPDATE_USER_INFO,
    CHANGE_PASSWORD,
} from '../types/accountType';

const { ACCOUNT } = prefix;

interface UpdateUserInfoActionType {
    type: typeof UPDATE_USER_INFO;
    payload: undefined;
}

/**
 * @UPDATE_USER_INFO
 */

const updateUserInfoType = { prefix: ACCOUNT, type: UPDATE_USER_INFO }

export const updateUserInfo = (payload: UpdateUserInfoPayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.ACCOUNT.updateUserInfo();
    dispatch(isDispatchCalling(updateUserInfoType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(updateUserInfoType, response.data));
    else dispatch(isDispatchFailed(updateUserInfoType, error));
}

/**
 * @CHANGE_PASSWORD
 */

interface ChangePasswordActionType {
    type: typeof CHANGE_PASSWORD;
    payload: any;
}

const changePasswordType = { prefix: ACCOUNT, type: CHANGE_PASSWORD };

export const changePassword = (payload: ChangePasswordPayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.ACCOUNT.changePassword();
    dispatch(isDispatchCalling(changePasswordType));
    const { response, error } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(changePasswordType));
    else dispatch(isDispatchFailed(changePasswordType, error));
}

export type AccountActionType = UpdateUserInfoActionType | ChangePasswordActionType;