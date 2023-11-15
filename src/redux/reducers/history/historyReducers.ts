import { isCallingApi, isFailedApiCall, isSuccessfulApiCall } from '@/helper/actionDedicate';

import { SAVE_HISTORY } from '@/redux/types/historyTypes';
import { HistoryState } from './interfaces';
import { HistoryActionTypes } from '@/redux/actions/historyAction';

const initalState: HistoryState = {
    history: {
        current: '/',
        back: '/',
    }
}

const historyReducer = (state = initalState, action: HistoryActionTypes) => {
    switch (action.type) {
        case SAVE_HISTORY:
            if (isSuccessfulApiCall(action)) {
                const { payload } = action
                return {
                    ...state,
                    history: payload,
                }
            }
        default:
            return state;
    }
}

export default historyReducer;