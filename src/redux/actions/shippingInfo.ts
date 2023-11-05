import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";

import { GET_LIST_SHIPPING_INFO, ADD_NEW_SHIPPING_INFO } from '../types/shippingInfoType';
import { AddShippingInfoPayloadInterface, ShippingInfoInterface } from '../reducers/shippingInfo/interfaces';

const { SHIPPING_INFO } = prefix;

interface GetListShippingInfoType {
    type: typeof GET_LIST_SHIPPING_INFO;
    payload: ShippingInfoInterface[];
}

/**
 * @GET_LIST_SHIPPING_INFO
 */

const getListShippingInfoType = { prefix: SHIPPING_INFO, type: GET_LIST_SHIPPING_INFO };

export const getListShippingInfo = () => async (dispatch: Dispatch) => {
    const api = API_URLS.SHIPPING_INFO.getListShippingInfo();
    dispatch(isDispatchCalling(getListShippingInfoType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getListShippingInfoType, response.data));
    else dispatch(isDispatchFailed(getListShippingInfoType, error));
}

interface AddNewShippingInfoType {
    type: typeof ADD_NEW_SHIPPING_INFO;
    payload: undefined;
}

/**
 * @ADD_NEW_SHIPPING_INFO
 */

const addNewShippingInfoType = { prefix: SHIPPING_INFO, type: ADD_NEW_SHIPPING_INFO };

export const addNewShippingInfo = (payload: AddShippingInfoPayloadInterface) => async (dispatch: Dispatch) => {
    const api = API_URLS.SHIPPING_INFO.addNewShippingInfo();
    dispatch(isDispatchCalling(addNewShippingInfoType));

    const { response } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(addNewShippingInfoType));
    else dispatch(isDispatchFailed(addNewShippingInfoType));
}

export type ShippingInfoActionTypes = GetListShippingInfoType | AddNewShippingInfoType;