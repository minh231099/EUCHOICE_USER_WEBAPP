import { ProductInterface, ProductType } from "../product/interfaces";
import { ShippingInfoInterface } from "../shippingInfo/interfaces";
import { WarehouseInterface } from "../warehouse/interfaces";

export interface AddNewOrderPayloadType {
    carts: string[];
    paymentMethod: string,
    shippingInfo: string;
}

export interface OrderState {
    isFetching: boolean;
    error: boolean;
    addNewOrderStatus: string;
    listOrder: OrderType[] | undefined;
    orderDetails: OrderType | undefined;
    changeOrderStatus: boolean;
    paymentLink: string | undefined;
    deliveryFee: number;
}

interface CartInOrder {
    _id: string;
    owner: string;
    product: ProductInterface;
    type: ProductType;
    amount: number;
    bought: boolean;
}

export interface OrderType {
    _id: string;
    owner: string;
    warehouse: WarehouseInterface;
    cart: CartInOrder[];
    status: string;
    price: number;
    orderId: string;
    estReceived: string;
    shippingInfo: ShippingInfoInterface;
}

export interface GetDeliveryFeePayload {
    weight: number;
    price: number;
    provine: string;
    city: string;
}