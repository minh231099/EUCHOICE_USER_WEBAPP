export interface ShippingInfoInterface {
    _id: string;
    address: string;
    ward: string;
    provine: string;
    city: string;
    country: string;
    name: string;
    default: boolean;
    phone_number: string;
    cityCode: number;
    provineCode: number;
    wardCode: number;
}

export interface AddShippingInfoPayloadInterface {
    name: string;
    country: string;
    city: string;
    provine: string;
    ward: string;
    address: string;
    main: boolean;
    phone_number: string;
    cityCode: number;
    provineCode: number;
    wardCode: number;
}

export interface ListCityInterface {
    name: string;
    code: number;
    division_type: string;
    codename: string;
    phone_code?: number;
    district_code?: number;
}

export interface ShippingInfoState {
    isFetching: boolean,
    error: boolean,
    shippingInfoList: ShippingInfoInterface[] | undefined,
    addNewStatus: string | undefined,
    isFetchingAdd: boolean,
    updateStatus: string | undefined,
    deleteStatus: string | undefined,
    listCity: ListCityInterface[],
    listDistrict: ListCityInterface[],
    listWard: ListCityInterface[],
}

