import { Dispatch } from 'redux';
import { API_URLS } from "@/api/apiURL";
import prefix from "../prefix";
import { isDispatchCalling, isDispatchFailed, isDispatchSuccess } from "@/helper/dispatchDedicate";
import apiCall from "@/helper/apiCall";

import {
    GET_INFO_BLOG,
    GET_LIST_BLOGS
} from '../types/blogsType';
import { BlogInterfaces } from '../reducers/blogs/interfaces';

const { BLOGS } = prefix;

interface GetBlogInfoType {
    type: typeof GET_INFO_BLOG;
    payload: BlogInterfaces;
}

const getBlogInfoType = { prefix: BLOGS, type: GET_INFO_BLOG };

export const getBlogInfo = (id: string) => async (dispatch: Dispatch) => {
    const api = API_URLS.BLOGS.getBlog(id);
    dispatch(isDispatchCalling(getBlogInfoType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getBlogInfoType, response.data));
    else dispatch(isDispatchFailed(getBlogInfoType));
}

interface GetListBlogsType {
    type: typeof GET_LIST_BLOGS;
    payload: {
        data: BlogInterfaces[];
        pagination: {
            page: number,
            limit: number,
            totalData: number,
        }
    };
}

const getListBlogsType = { prefix: BLOGS, type: GET_LIST_BLOGS };

export const getListBlog = (page: number) => async (dispatch: Dispatch) => {
    const api = API_URLS.BLOGS.getListBlogs(page);

    dispatch(isDispatchCalling(getListBlogsType));
    const { response } = await apiCall({ ...api });

    if (response) dispatch(isDispatchSuccess(getListBlogsType, response));
    else dispatch(isDispatchFailed(getListBlogsType));
}

export type BlogActionType = GetBlogInfoType | GetListBlogsType;