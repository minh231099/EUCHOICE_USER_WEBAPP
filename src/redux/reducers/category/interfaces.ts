export interface CategoryInterface {
    _id: string;
    name: string;
    delete: boolean;
    hide: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CategoryState {
    isFetching: boolean;
    error: boolean;
    categoryList: CategoryInterface[] | null;
}