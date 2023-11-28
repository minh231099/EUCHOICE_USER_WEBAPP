import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";

import {
    GET_LIST_SHIPPING_INFO,
    ADD_NEW_SHIPPING_INFO,
    UPDATE_SHIPPING_INFO,
    GET_LIST_CITY,
    GET_LIST_DISTRICT,
    GET_LIST_WARD,
    DELETE_SHIPPING_INFO
} from '../types/shippingInfoType';
import { AddShippingInfoPayloadInterface, ListCityInterface, ShippingInfoInterface } from '../reducers/shippingInfo/interfaces';

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

/**
 * @UPDATE_SHIPPING_INFO
 */

interface UpdateShippingInfoActionType {
    type: typeof UPDATE_SHIPPING_INFO;
    payload: undefined;
}

const updateShippingInfoType = { prefix: SHIPPING_INFO, type: UPDATE_SHIPPING_INFO };

export const updateShippingInfo = (id: string, payload: AddShippingInfoPayloadInterface) => async (dispatch: Dispatch) => {
    const api = API_URLS.SHIPPING_INFO.updateShippingInfo(id);
    dispatch(isDispatchCalling(updateShippingInfoType));

    const { response } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(updateShippingInfoType));
    else dispatch(isDispatchFailed(updateShippingInfoType));
}

/**
 * @DELETE_SHIPPING_INFO
 */

interface DeleteShippingInfoActionType {
    type: typeof DELETE_SHIPPING_INFO;
    payload: undefined;
}

const deleteShippingInfoType = { prefix: SHIPPING_INFO, type: DELETE_SHIPPING_INFO };

export const deleteShippingInfo = (id: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.SHIPPING_INFO.deleteShippingInfo(id);
    dispatch(isDispatchCalling(deleteShippingInfoType));

    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(deleteShippingInfoType));
    else dispatch(isDispatchFailed(deleteShippingInfoType));
}

/**
 * @GET_LIST_CITY
 */

interface GetListCityActionType {
    type: typeof GET_LIST_CITY;
    payload: ListCityInterface[];
}

const getListCityType = { prefix: SHIPPING_INFO, type: GET_LIST_CITY };

export const getListCity = () => async (dispatch: Dispatch) => {
    const api = API_URLS.SHIPPING_INFO.getListCity();
    dispatch(isDispatchCalling(getListCityType));

    const { response } = await apiCall({ ...api, callTo: 'providence' });

    if (response) dispatch(isDispatchSuccess(getListCityType, response));
    else dispatch(isDispatchFailed(getListCityType));
}

/**
 * @GET_LIST_DISTRICT
 */

interface GetListDistrictActionType {
    type: typeof GET_LIST_DISTRICT;
    payload: ListCityInterface[];
}

const getListDistrictType = { prefix: SHIPPING_INFO, type: GET_LIST_DISTRICT };

export const getListDistrict = (cityCode: number) => async (dispatch: Dispatch) => {
    const api = API_URLS.SHIPPING_INFO.getListDistrict(cityCode);
    dispatch(isDispatchCalling(getListDistrictType));

    const { response } = await apiCall({ ...api, callTo: 'providence' });

    if (response) dispatch(isDispatchSuccess(getListDistrictType, response.districts));
    else dispatch(isDispatchFailed(getListDistrictType));
}

/**
 * @GET_LIST_WARD
 */

interface GetListWardActionType {
    type: typeof GET_LIST_WARD;
    payload: ListCityInterface[];
}

const getListWardType = { prefix: SHIPPING_INFO, type: GET_LIST_WARD };

export const getListWard = (districtCode: number) => async (dispatch: Dispatch) => {
    const api = API_URLS.SHIPPING_INFO.getListWard(districtCode);
    dispatch(isDispatchCalling(getListWardType));

    const { response } = await apiCall({ ...api, callTo: 'providence' });

    if (response) dispatch(isDispatchSuccess(getListWardType, response.wards));
    else dispatch(isDispatchFailed(getListWardType));
}


export type ShippingInfoActionTypes = GetListShippingInfoType | AddNewShippingInfoType | UpdateShippingInfoActionType | GetListCityActionType | GetListDistrictActionType | GetListWardActionType | DeleteShippingInfoActionType;