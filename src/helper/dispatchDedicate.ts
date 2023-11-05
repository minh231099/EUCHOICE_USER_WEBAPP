import PREFIX from '@/redux/prefix';

export const isDispatchCalling = (prefixType: { type: string, prefix: string }, payload: any = null) => ({
    type: prefixType.type,
    meta: { prefix: [prefixType.prefix, PREFIX.API_CALLING] },
    payload,
});

export const isDispatchSuccess = (prefixType: { type: string, prefix: string }, payload: any = null) => ({
    type: prefixType.type,
    meta: { prefix: [prefixType.prefix, PREFIX.API_CALLED_SUCCESS] },
    payload,
});

export const isDispatchFailed = (prefixType: { type: string, prefix: string }, payload: any = null) => ({
    type: prefixType.type,
    meta: { prefix: [prefixType.prefix, PREFIX.API_CALLED_FAILURE] },
    payload,
});