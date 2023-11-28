import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';

import {
    ShippingInfoState,
} from './interfaces';
import { ShippingInfoActionTypes } from '@/redux/actions/shippingInfo';
import { ADD_NEW_SHIPPING_INFO, DELETE_SHIPPING_INFO, GET_LIST_CITY, GET_LIST_DISTRICT, GET_LIST_SHIPPING_INFO, GET_LIST_WARD, UPDATE_SHIPPING_INFO } from '@/redux/types/shippingInfoType';

const initalState: ShippingInfoState = {
    isFetching: false,
    error: false,
    shippingInfoList: undefined,
    addNewStatus: undefined,
    updateStatus: undefined,
    deleteStatus: undefined,
    isFetchingAdd: false,
    listCity: [],
    listDistrict: [],
    listWard: [],
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
        case UPDATE_SHIPPING_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetchingAdd: true,
                    updateStatus: 'updating',
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetchingAdd: false,
                    updateStatus: 'success',
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetchingAdd: false,
                    updateStatus: 'fail',
                }
            }
            break;
        case DELETE_SHIPPING_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetchingAdd: true,
                    deleteStatus: 'deleting',
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetchingAdd: false,
                    deleteStatus: 'success',
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetchingAdd: false,
                    deleteStatus: 'fail',
                }
            }
            break;
        case GET_LIST_CITY:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    listCity: action.payload,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    listCity: action.payload,
                }
            }
            break;
        case GET_LIST_DISTRICT:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    listDistrict: action.payload,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    listDistrict: action.payload,
                }
            }
            break;
        case GET_LIST_WARD:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    listWard: action.payload,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    listWard: action.payload,
                }
            }
            break;
        default:
            return state;
    }
};

export default shippingInfoReducer;