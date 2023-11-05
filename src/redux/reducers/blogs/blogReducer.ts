import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';
import {
    GET_INFO_BLOG, GET_LIST_BLOGS,
} from '../../types/blogsType';
import {
    BlogState,
} from './interfaces';
import { BlogActionType } from '@/redux/actions/blogAction';

const initalState: BlogState = {
    isFetching: false,
    error: false,
    blogInfo: null,
    listBlogs: [],
    pagination: {
        page: 1,
        limit: 18,
        totalData: 0,
    },
}

const blogReducer = (state = initalState, action: BlogActionType) => {
    switch (action.type) {
        case GET_INFO_BLOG:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    blogInfo: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                return {
                    ...state,
                    blogInfo: action.payload,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    blogInfo: null,
                }
            }
            break;
        case GET_LIST_BLOGS:
            if (isCallingApi(action)) {
                return {
                    ...state,
                    isFetching: true,
                    listBlogs: null,
                }
            }
            if (isSuccessfulApiCall(action)) {
                const { data, pagination } = action.payload;

                return {
                    ...state,
                    isFetching: false,
                    listBlogs: data,
                    pagination: pagination,
                }
            }
            if (isFailedApiCall(action)) {
                return {
                    ...state,
                    isFetching: false,
                    listBlogs: null,
                }
            }
            break;
        default:
            return state;
    }
};

export default blogReducer;