import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import { SEARCH_LIST_PRODUCT } from '../types/searchType';
import { ProductInterface } from '../reducers/product/interfaces';

interface SearchActionType {
    type: typeof SEARCH_LIST_PRODUCT;
    payload: ProductInterface[];
}
const { SEARCH } = prefix;
/**
 * @SEARCH_LIST_PRODUCT
 */

const searchProductType = { prefix: SEARCH, type: SEARCH_LIST_PRODUCT }

export const searchProduct = (payload: any) => async (dispatch: Dispatch) => {
    const { key } = payload;
    let params = "";
    if (key) params = params.concat(`?key=${key}`);
    const api = API_URLS.SEARCH.searchProduct(params);
    dispatch(isDispatchCalling(searchProductType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(searchProductType, response.data));
    else dispatch(isDispatchFailed(searchProductType, error));
}

export type SearchActionTypes = SearchActionType;