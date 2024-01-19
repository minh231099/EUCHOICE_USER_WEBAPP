import { CategoryInterface } from "../category/interfaces";
import { WarehouseInterface } from "../warehouse/interfaces";

export interface ProductType {
    _id: string;
    name: string;
    amount: number;
    price: number;
    amountSale: number;
    priceSale: number;
    sold: number;
    product: string;
    createdAt: string;
    updatedAt: string;
    group1?: string;
    group2?: string;
}

export interface ProductInterface {
    _id: string;
    name: string;
    category: CategoryInterface;
    warehouse: WarehouseInterface;
    description: string;
    image: string[];
    type: ProductType[];
    delete: boolean;
    hide: boolean;
    createdAt: string;
    updatedAt: string;
    group1?: string;
    group2?: string;
    weight: number;
}

export interface ProductState {
    isFetching: boolean,
    error: boolean,
    productInfo: ProductInterface | null,
    productList: ProductInterface[] | null,
}

export interface ImagesInterface {

}