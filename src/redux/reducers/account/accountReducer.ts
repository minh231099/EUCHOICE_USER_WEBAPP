import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import {
    CHANGE_PASSWORD,
    UPDATE_USER_INFO
} from '../../types/accountType';
import {
    AccountState,
} from './interfaces';
import { AccountActionType } from '../../actions/accountAction';

const initalState: AccountState = {
    isFetching: false,
    error: false,
    changePasswordError: false,
    errorMessage: undefined,
}

const accountReducer = (state = initalState, action: AccountActionType) => {
    switch (action.type) {
        case UPDATE_USER_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: false,
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
        case CHANGE_PASSWORD:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    changePasswordError: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    changePasswordError: false,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    changePasswordError: true,
                    // errorMessage: action.payload
                }
            }
            break;
        default:
            return state;
    }
}

export default accountReducer;