export interface HistoryInterface {
    current: string;
    back: string;
}

export interface HistoryState {
    history: HistoryInterface;
}