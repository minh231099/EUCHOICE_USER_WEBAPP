import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import {
    SEARCH_LIST_PRODUCT
} from '../../types/searchType';
import { SearchState } from './interfaces';
import { SearchActionTypes } from '@/redux/actions/searchAction';

const initalState: SearchState = {
    isFetching: false,
    error: false,
    productList: null,
}

const searchReducer = (state = initalState, action: SearchActionTypes) => {
    switch (action.type) {
        case SEARCH_LIST_PRODUCT:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    productList: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    productList: data,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    productList: null,
                }
            }
            break;
        default:
            return state;
    }
};

export default searchReducer;