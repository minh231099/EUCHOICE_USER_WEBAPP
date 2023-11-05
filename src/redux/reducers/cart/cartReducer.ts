import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import {
    CartState,
} from './interfaces';

import {
    ADD_TO_CART,
    LIST_PRODUCT_IN_CART,
    ADD_MORE_PRODUCT_TO_CART,
    DELETE_PRODUCT_IN_CART,
    DELETE_MANY_PRODUCT_IN_CART,
    SAVE_PRODUCT_TO_ORDER_INFO,
    ADD_TO_CART_DONE,
    BUY_NOW,
    BUY_NOW_DONE,
} from '@/redux/types/cartType';

import { CartActionType } from '@/redux/actions/cartAction';

const initalState: CartState = {
    isFetching: false,
    error: false,
    listProductsInCart: null,
    addToCart: false,
    addMoreProductToCart: false,
    deleteError: false,
    deleteCartState: '',
    listProductInOrder: null,
    savingFetching: false,
    buyNowState: false,
}

const cartReducer = (state = initalState, action: CartActionType) => {
    switch (action.type) {
        case ADD_TO_CART:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    addToCart: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    addToCart: true,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    addToCart: false,
                }
            }
            break;
        case ADD_MORE_PRODUCT_TO_CART:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    addMoreProductToCart: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    addMoreProductToCart: true,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    addMoreProductToCart: false,
                }
            }
            break;
        case DELETE_PRODUCT_IN_CART:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    deleteError: false,
                    deleteCartState: 'deleting',
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    deleteError: false,
                    deleteCartState: 'success',
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    deleteError: true,
                    deleteCartState: 'fail',
                }
            }
            break;
        case DELETE_MANY_PRODUCT_IN_CART:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    deleteError: false,
                    deleteCartState: 'deleting',
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    deleteError: false,
                    deleteCartState: 'success',
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    deleteError: true,
                    deleteCartState: 'fail',
                }
            }
            break;
        case LIST_PRODUCT_IN_CART:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    listProductsInCart: null,
                    addToCart: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    listProductsInCart: data,
                    addToCart: false,
                    addMoreProductToCart: false,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    listProductsInCart: null,
                    addToCart: false,
                }
            }
            break;
        case SAVE_PRODUCT_TO_ORDER_INFO:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    savingFetching: true,
                    listProductInOrder: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload;
                return {
                    ...state,
                    savingFetching: false,
                    listProductInOrder: data,
                }
            }
            break;
        case ADD_TO_CART_DONE:
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    addToCart: false,
                }
            }
            break;
        case BUY_NOW:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: false,
                    buyNowState: false,
                    error: false,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    buyNowState: true,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    buyNowState: false,
                }
            }
            break;

        case BUY_NOW_DONE:
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    buyNowState: false,
                }
            }
            break;
        default:
            return state;
    }
}

export default cartReducer;