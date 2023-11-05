import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import {
    GET_PRODUCT_INFO,
    GET_LIST_PRODUCT,
} from '../../types/productType';
import {
    ProductState,
} from './interfaces';
import { ProductActionTypes } from '@/redux/actions/productAction';

const initalState: ProductState = {
    isFetching: false,
    error: false,
    productInfo: null,
    productList: null,
}

const productReducer = (state = initalState, action: ProductActionTypes) => {
    switch (action.type) {
        case GET_PRODUCT_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    productInfo: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    productInfo: data,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    productInfo: null,
                }
            }
            break;
        case GET_LIST_PRODUCT:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    productList: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload
                return {
                    ...state,
                    productList: data,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    productList: null,
                }
            }
            break;
        default:
            return state;
    }
};

export default productReducer;