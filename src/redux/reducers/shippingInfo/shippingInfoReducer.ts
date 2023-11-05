import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';

import {
    ShippingInfoState,
} from './interfaces';
import { ShippingInfoActionTypes } from '@/redux/actions/shippingInfo';
import { ADD_NEW_SHIPPING_INFO, GET_LIST_SHIPPING_INFO } from '@/redux/types/shippingInfoType';

const initalState: ShippingInfoState = {
    isFetching: false,
    error: false,
    shippingInfoList: undefined,
    addNewStatus: undefined,
    isFetchingAdd: false,
}

const shippingInfoReducer = (state = initalState, action: ShippingInfoActionTypes) => {
    switch (action.type) {
        case GET_LIST_SHIPPING_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    shippingInfoList: undefined,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    shippingInfoList: data,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    shippingInfoList: undefined,
                }
            }
            break;
        case ADD_NEW_SHIPPING_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    addNewStatus: 'adding',
                    isFetchingAdd: true,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload
                return {
                    ...state,
                    addNewStatus: 'success',
                    isFetchingAdd: false,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    addNewStatus: 'failed',
                    isFetchingAdd: false,
                }
            }
            break;
        default:
            return state;
    }
};

export default shippingInfoReducer;