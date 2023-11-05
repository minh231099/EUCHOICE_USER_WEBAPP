import PREFIX from '@/redux/prefix';
import { Action } from 'redux';

export interface CustomAction<T = any> extends Action {
  type: string;
  payload?: T;
  meta?: {
    prefix: string;
  };
}

export const isCallingApi = (action: CustomAction) =>
  action.meta?.prefix && action.meta.prefix.includes(PREFIX.API_CALLING);

export const isSuccessfulApiCall = (action: CustomAction) =>
  action.meta?.prefix && action.meta.prefix.includes(PREFIX.API_CALLED_SUCCESS);

export const isFailedApiCall = (action: CustomAction) =>
  action.meta?.prefix && action.meta.prefix.includes(PREFIX.API_CALLED_FAILURE);