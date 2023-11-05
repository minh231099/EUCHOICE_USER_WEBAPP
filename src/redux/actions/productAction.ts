import { Dispatch } from 'redux';
import { GET_LIST_PRODUCT, GET_PRODUCT_INFO, GET_PRODUCT_IMAGES } from "../types/productType";
import { ImagesInterface, ProductInterface } from "../reducers/product/interfaces";
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";

const { PRODUCT } = prefix;

interface GetProductInfoActionType {
    type: typeof GET_PRODUCT_INFO;
    payload: ProductInterface;
}

interface GetListProductActionType {
    type: typeof GET_LIST_PRODUCT;
    payload: ProductInterface[];
}

/**
 * @GET_PRODUCT_INFO
 */

const getProductInfoType = { prefix: PRODUCT, type: GET_PRODUCT_INFO }

export const getProductInfo = (productId: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.PRODUCT.getProductDetails(productId);
    dispatch(isDispatchCalling(getProductInfoType));
    const { response, error } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getProductInfoType, response.data));
    else dispatch(isDispatchFailed(getProductInfoType, error));
}

/**
 * @GET_LIST_PRODUCT
 */

const getListProductType = { prefix: PRODUCT, type: GET_LIST_PRODUCT }

export const getListProduct = (payload: any) => async (dispatch: Dispatch) => {
    const { category, page } = payload;
    let params = "";
    if (category) params = params.concat(`?category=${category}&page=${page}`);
    const api = API_URLS.PRODUCT.getListProduct(params);
    dispatch(isDispatchCalling(getListProductType));
    const { response, error } = await apiCall({ ...api });
    if (response) dispatch(isDispatchSuccess(getListProductType, response.data));
    else dispatch(isDispatchFailed(getListProductType, error));
}

interface GetProductImagesActionType {
    type: typeof GET_PRODUCT_IMAGES;
    payload: ImagesInterface[];
}

/**
 * @GET_PRODUCT_IMAGES
 */
const getProductImagesType = { prefix: PRODUCT, type: GET_PRODUCT_IMAGES }

export const getProductImages = (listImageName: string[]) => async (dispatch: Dispatch) => {
    const listImg = [];
    let apiCallStatus = true;
    dispatch(isDispatchCalling(getProductImagesType));
    for (const imgName of listImageName) {
        const api = API_URLS.PRODUCT.getProductImages(imgName);
        const { response, error } = await apiCall({ ...api });

        if (error) {
            dispatch(isDispatchFailed(getProductImagesType, error));
            apiCallStatus = false;
            break;
        }
        else listImg.push(response.data);
    }

    if (apiCallStatus) dispatch(isDispatchSuccess(getProductImagesType, listImg));
}

export type ProductActionTypes = GetProductInfoActionType | GetProductImagesActionType | GetListProductActionType;
