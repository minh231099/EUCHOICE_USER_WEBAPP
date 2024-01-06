import { WarehouseInterface } from "../warehouse/interfaces";

export interface CartState {
    isFetching: boolean;
    error: boolean;
    listProductsInCart: CartInfoInterface[] | null;
    addToCart: boolean;
    addMoreProductToCart: boolean;
    deleteError: boolean;
    deleteCartState: string;
    listProductInOrder: CartInfoInterface[] | null;
    savingFetching: boolean;
    buyNowState: boolean;
}

export interface ProductInCart {
    cartId: string;
    name: string;
    image: string;
    group1?: string;
    group2?: string;
    price: number;
    amount: number;
    productId: string;
    typeId: string;
    storage: number;
    weight: number;
}

export interface CartInfoInterface {
    warehouse: WarehouseInterface;
    product: ProductInCart[];
}