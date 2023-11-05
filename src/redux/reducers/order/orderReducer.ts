import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';

import { ADD_NEW_ORDER, ADD_NEW_ORDER_DONE, CANCEL_ORDER, CHECK_ORDER_DONE, GET_LIST_ORDER, GET_ORDER_DETAILS } from '@/redux/types/orderType';
import { OrderActionTypes } from '@/redux/actions/orderAction';
import { OrderState } from './interfaces';

const initalState: OrderState = {
    isFetching: false,
    error: false,
    addNewOrderStatus: '',
    listOrder: undefined,
    orderDetails: undefined,
    changeOrderStatus: false,
}

const orderReducer = (state = initalState, action: OrderActionTypes) => {
    switch (action.type) {
        case ADD_NEW_ORDER:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    addNewOrderStatus: 'adding',
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    addNewOrderStatus: 'success',
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    addNewOrderStatus: 'failed',
                }
            }
            break;
        case ADD_NEW_ORDER_DONE:
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    addNewOrderStatus: '',
                }
            }
            break;
        case GET_LIST_ORDER:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    listOrder: undefined,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const { payload } = action;
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    listOrder: payload,
                    changeOrderStatus: false,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    listOrder: undefined,
                }
            }
            break;
        case GET_ORDER_DETAILS:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    orderDetails: undefined,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const { payload } = action;
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    orderDetails: payload,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    orderDetails: undefined,
                }
            }
            break;
        case CHECK_ORDER_DONE:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    changeOrderStatus: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    changeOrderStatus: true,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    changeOrderStatus: false,
                }
            }
            break;
        case CANCEL_ORDER:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    changeOrderStatus: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    changeOrderStatus: true,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    changeOrderStatus: false,
                }
            }
            break;
        default:
            return state;
    }
}

export default orderReducer;