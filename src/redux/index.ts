import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middlewares/loggerMiddleware';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunkMiddleware, loggerMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;