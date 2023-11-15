// store/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import productReducer from './product/productReducer';
import categoryReducer from './category/categoryReducer';
import authReducer from './auth/authReducer';
import cartReducer from './cart/cartReducer';
import searchReducer from './search/searchReducer';
import shippingInfoReducer from './shippingInfo/shippingInfoReducer';
import orderReducer from './order/orderReducer';
import blogReducer from './blogs/blogReducer';
import historyReducer from './history/historyReducers';

const rootReducer = combineReducers({
    productReducer,
    categoryReducer,
    authReducer,
    cartReducer,
    searchReducer,
    shippingInfoReducer,
    orderReducer,
    blogReducer,
    historyReducer,
});

export default rootReducer;
