import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import {
    GET_CATEGORY_LIST,
} from '../../types/categoryType';
import {
    CategoryState,
} from './interfaces';
import { CategoryActionTypes } from '@/redux/actions/categoryAction';

const initalState: CategoryState = {
    isFetching: false,
    error: false,
    categoryList: null,
}

const categoryReducer = (state = initalState, action: CategoryActionTypes) => {
    switch (action.type) {
        case GET_CATEGORY_LIST:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    error: false,
                    categoryList: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const data = action.payload
                return {
                    ...state,
                    isFetching: false,
                    error: false,
                    categoryList: data,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    error: true,
                    categoryList: null,
                }
            }
            break;
        default:
            return state;
    }
};

export default categoryReducer;