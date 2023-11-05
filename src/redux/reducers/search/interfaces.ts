
import { ProductInterface } from "../product/interfaces";

export interface SearchState {
    isFetching: boolean,
    error: boolean,
    productList: ProductInterface[] | null,
}