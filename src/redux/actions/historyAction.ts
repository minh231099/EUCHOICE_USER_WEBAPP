import { Dispatch } from 'redux';
import { SAVE_HISTORY } from "../types/historyTypes";
import { HistoryInterface } from "../reducers/history/interfaces";
import prefix from "../prefix";
import { isDispatchSuccess } from "@/helper/dispatchDedicate";

interface SaveHistoryType {
    type: typeof SAVE_HISTORY;
    payload: HistoryInterface;
}
const { HISTORY } = prefix;
/**
 * @SAVE_HISTORY
 */

const saveHistoryType = { prefix: HISTORY, type: SAVE_HISTORY }

const exceptionPath = ['/login', '/signup', '/order'];

export const saveHistory = (history: HistoryInterface, nextPath: string) => async (dispatch: Dispatch) => {
    const newHis = {
        ...history,
        current: nextPath,
    }
    if (!exceptionPath.includes(history.current)) newHis.back = history.current;

    dispatch(isDispatchSuccess(saveHistoryType, newHis));
}

export type HistoryActionTypes = SaveHistoryType;