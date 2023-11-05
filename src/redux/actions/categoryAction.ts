import { Dispatch } from 'redux';
import { GET_CATEGORY_LIST } from "../types/categoryType";
import { ProductInterface } from "../reducers/product/interfaces";
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import { CategoryInterface } from '../reducers/category/interfaces';

interface GetCategoryListActionType {
    type: typeof GET_CATEGORY_LIST;
    payload: CategoryInterface[];
}
const { CATEGORY } = prefix;
/**
 * @GET_CATEGORY_LIST
 */

const getCategoryListType = { prefix: CATEGORY, type: GET_CATEGORY_LIST }

export const getCategoryList = () => async (dispatch: Dispatch) => {
    const api = API_URLS.CATEGORY.getListCategory();
    dispatch(isDispatchCalling(getCategoryListType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getCategoryListType, response.data));
    else dispatch(isDispatchFailed(getCategoryListType, error));
}

export type CategoryActionTypes = GetCategoryListActionType;