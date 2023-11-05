export interface ShippingInfoInterface {
    _id: string;
    address: string;
    ward: string;
    provine: string;
    city: string;
    country: string;
    name: string;
    default: boolean;
}

export interface AddShippingInfoPayloadInterface {
    name: string;
    country: string;
    city: string;
    provine: string;
    ward: string;
    address: string;
    main: boolean;
}

export interface ShippingInfoState {
    isFetching: boolean,
    error: boolean,
    shippingInfoList: ShippingInfoInterface[] | undefined,
    addNewStatus: string | undefined,
    isFetchingAdd: boolean,
}