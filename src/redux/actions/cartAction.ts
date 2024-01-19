import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";
import {
    ADD_MORE_PRODUCT_TO_CART,
    ADD_TO_CART,
    LIST_PRODUCT_IN_CART,
    DELETE_PRODUCT_IN_CART,
    DELETE_MANY_PRODUCT_IN_CART,
    SAVE_PRODUCT_TO_ORDER_INFO,
    ADD_TO_CART_DONE,
    BUY_NOW,
    BUY_NOW_DONE,
} from '../types/cartType';

import { CartInfoInterface } from '../reducers/cart/interfaces';

const { CART } = prefix;

interface AddToCartType {
    type: typeof ADD_TO_CART;
    payload: undefined;
}

/**
 * @ADD_TO_CART
 */

const addToCartType = { prefix: CART, type: ADD_TO_CART };

export interface AddToCartPayload {
    product: string;
    amount: number;
    type: string;
    buyNow?: boolean;
    weight?: number;
}

export const addToCart = (payload: AddToCartPayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.CART.addToCart();
    dispatch(isDispatchCalling(addToCartType));
    const { response } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(addToCartType));
    else dispatch(isDispatchFailed(addToCartType));
}

/**
 * @BUY_NOW
 */

interface BuyNowType {
    type: typeof BUY_NOW;
    payload: undefined;
}

const buyNowType = { prefix: CART, type: BUY_NOW };

export const buyNow = (payload: AddToCartPayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.CART.addToCart();
    dispatch(isDispatchCalling(buyNowType));
    dispatch(isDispatchCalling(saveProductToOrderInfoType));
    const { response } = await apiCall({ ...api, payload });

    if (response) {
        const tmp = response.data;
        tmp[0].product[0].weight = payload.weight;
        dispatch(isDispatchSuccess(saveProductToOrderInfoType, tmp));
        dispatch(isDispatchSuccess(buyNowType));
    }
    else dispatch(isDispatchFailed(buyNowType));
}

/**
 * BUY_NOW_DONE
 */

interface BuyNowDoneType {
    type: typeof BUY_NOW_DONE;
    payload: undefined;
}

const buyNowDoneType = { prefix: CART, type: BUY_NOW_DONE };

export const buyNowDone = () => async (dispatch: Dispatch) => {
    dispatch(isDispatchSuccess(buyNowDoneType));
}

/**
 * @LIST_PRODUCT_IN_CART
 */

interface CartInfoType {
    type: typeof LIST_PRODUCT_IN_CART;
    payload: CartInfoInterface[];
}

const listProductInCartType = { prefix: CART, type: LIST_PRODUCT_IN_CART };

export const listProductInCart = () => async (dispatch: Dispatch) => {
    const api = API_URLS.CART.cartInfo();
    dispatch(isDispatchCalling(listProductInCartType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(listProductInCartType, response.data));
    else dispatch(isDispatchFailed(listProductInCartType));
}

interface AddMoreProductToCartType {
    type: typeof ADD_MORE_PRODUCT_TO_CART;
    payload: undefined;
}
/**
 * @ADD_MORE_PRODUCT_TO_CART
 */

const addMoreProductToCartType = { prefix: CART, type: ADD_MORE_PRODUCT_TO_CART };

export const addMoreProductToCart = (payload: AddToCartPayload) => async (dispatch: Dispatch) => {
    const api = API_URLS.CART.addToCart();
    dispatch(isDispatchCalling(addMoreProductToCartType));
    const { response } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(addMoreProductToCartType, response.data));
    else dispatch(isDispatchFailed(addMoreProductToCartType));
}

interface DeleteProductInCartType {
    type: typeof DELETE_PRODUCT_IN_CART;
    payload: undefined;
}

/**
 * @DELETE_PRODUCT_IN_CART
 */

const deleteProductInCartType = { prefix: CART, type: DELETE_PRODUCT_IN_CART };

export const deleteProductInCart = (cartId: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.CART.deleteProductInCart(cartId);
    dispatch(isDispatchCalling(deleteProductInCartType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(deleteProductInCartType));
    else dispatch(isDispatchFailed(deleteProductInCartType));
}

interface DeleteManyProductInCartType {
    type: typeof DELETE_MANY_PRODUCT_IN_CART;
    payload: undefined;
}

/**
 * @DELETE_MANY_PRODUCT_IN_CART
 */

const deleteManyProductInCartType = { prefix: CART, type: DELETE_MANY_PRODUCT_IN_CART };

export const deleteManyProductInCart = (listId: string[]) => async (dispatch: Dispatch) => {
    const api = API_URLS.CART.deleteManyProductInCart();
    dispatch(isDispatchCalling(deleteManyProductInCartType));
    const payload = { listId };

    const { response } = await apiCall({ ...api, payload });

    if (response) dispatch(isDispatchSuccess(deleteManyProductInCartType));
    else dispatch(isDispatchFailed(deleteManyProductInCartType));

}

interface SaveProductToOrderInfoType {
    type: typeof SAVE_PRODUCT_TO_ORDER_INFO;
    payload: CartInfoInterface[] | null;
}

/**
 * @SAVE_PRODUCT_TO_ORDER_INFO
 */

const saveProductToOrderInfoType = { prefix: CART, type: SAVE_PRODUCT_TO_ORDER_INFO };

export const saveProductToOrderInfo = (listProduct: CartInfoInterface[] | null) => async (dispatch: Dispatch) => {
    dispatch(isDispatchCalling(saveProductToOrderInfoType));
    dispatch(isDispatchSuccess(saveProductToOrderInfoType, listProduct));
}

interface AddToCartDoneType {
    type: typeof ADD_TO_CART_DONE;
    payload: undefined;
}

/**
 * @SAVE_PRODUCT_TO_ORDER_INFO
 */

const addToCartDoneType = { prefix: CART, type: ADD_TO_CART_DONE };

export const addToCartDone = () => async (dispatch: Dispatch) => {
    dispatch(isDispatchSuccess(addToCartDoneType));
}

export type CartActionType = AddToCartType | CartInfoType | AddMoreProductToCartType | DeleteProductInCartType | DeleteManyProductInCartType | SaveProductToOrderInfoType | AddToCartDoneType | BuyNowType | BuyNowDoneType;