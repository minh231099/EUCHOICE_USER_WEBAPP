import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import { AddNewOrderPayloadType, GetDeliveryFeePayload, OrderType } from '../reducers/order/interfaces';

import {
    ADD_NEW_ORDER,
    ADD_NEW_ORDER_DONE,
    GET_LIST_ORDER,
    GET_ORDER_DETAILS,
    CHECK_ORDER_DONE,
    CANCEL_ORDER,
    GET_DELIVERY_FEE,
} from '../types/orderType';

const { ORDER } = prefix;

interface AddNewOrderType {
    type: typeof ADD_NEW_ORDER;
    payload: any;
}
/**
 * @ADD_NEW_ORDER
 */

const addNewOrderType = { prefix: ORDER, type: ADD_NEW_ORDER }

export const addNewOrder = (payload: AddNewOrderPayloadType) => async (dispatch: Dispatch) => {
    const api = API_URLS.ORDER.addNewOrder();
    dispatch(isDispatchCalling(addNewOrderType));
    const { response, error } = await apiCall({ ...api, payload });
    if (response) dispatch(isDispatchSuccess(addNewOrderType, response));
    else dispatch(isDispatchFailed(addNewOrderType));
}

interface AddNewOrderDoneType {
    type: typeof ADD_NEW_ORDER_DONE;
    payload: undefined;
}
/**
 * @ADD_NEW_ORDER_DONE
 */

const addNewOrderDoneType = { prefix: ORDER, type: ADD_NEW_ORDER_DONE };

export const addNewOrderDone = () => async (dispatch: Dispatch) => {
    dispatch(isDispatchSuccess(addNewOrderDoneType));
}

interface GetListOrdersType {
    type: typeof GET_LIST_ORDER;
    payload: OrderType[];
}

/**
 * @GET_LIST_ORDER
 */

const getListOrderType = { prefix: ORDER, type: GET_LIST_ORDER };

export const getListOrder = (type: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.ORDER.getListOrder(type !== 'all' ? type : '');
    dispatch(isDispatchCalling(getListOrderType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getListOrderType, response.data));
    else dispatch(isDispatchFailed(getListOrderType, error.data));
}

interface GetOrderDetailsType {
    type: typeof GET_ORDER_DETAILS;
    payload: OrderType;
}

/**
 * @GET_ORDER_DETAILS
 */

const getOrderDetailsType = { prefix: ORDER, type: GET_ORDER_DETAILS };

export const getOrderDetails = (id: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.ORDER.getOrderDetails(id);
    dispatch(isDispatchCalling(getOrderDetailsType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getOrderDetailsType, response.data));
    else dispatch(isDispatchFailed(getOrderDetailsType, error.data));
}

interface CheckOrderDoneType {
    type: typeof CHECK_ORDER_DONE;
    payload: undefined;
}

/**
 * @CHECK_ORDER_DONE
 */

const checkOrderDoneType = { prefix: ORDER, type: CHECK_ORDER_DONE };

export const checkOrderDone = (id: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.ORDER.checkOrderDone(id);
    dispatch(isDispatchCalling(checkOrderDoneType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(checkOrderDoneType));
    else dispatch(isDispatchFailed(checkOrderDoneType));
}

interface CancelOrderType {
    type: typeof CANCEL_ORDER;
    payload: undefined;
}

/**
 * @CANCEL_ORDER
 */

const cancelOrderType = { prefix: ORDER, type: CANCEL_ORDER };

export const cancelOrder = (id: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.ORDER.cancelOrder(id);
    dispatch(isDispatchCalling(cancelOrderType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(cancelOrderType));
    else dispatch(isDispatchFailed(cancelOrderType));
}
/**
 * @GET_DELIVERY_FEE
 */

interface GetDeliveryFeeType {
    type: typeof GET_DELIVERY_FEE;
    payload: number;
}

const getDeliveryFeeType = { prefix: ORDER, type: GET_DELIVERY_FEE };

export const getDeliveryFee = (payload: GetDeliveryFeePayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.ORDER.getDeliveryFee();
    dispatch(isDispatchCalling(getDeliveryFeeType));
    const {response, error} = await apiCall({...api, payload});

    if (response) dispatch(isDispatchSuccess(getDeliveryFeeType, response.data));
    else dispatch(isDispatchFailed(getDeliveryFeeType));
}

export type OrderActionTypes = AddNewOrderType | AddNewOrderDoneType | GetListOrdersType | GetOrderDetailsType | CheckOrderDoneType | CancelOrderType | GetDeliveryFeeType;