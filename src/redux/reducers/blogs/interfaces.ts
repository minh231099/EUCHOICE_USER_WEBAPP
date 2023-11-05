export interface BlogInterfaces {
    _id: string,
    title: string,
    createdAt: string,
    content: string,
    image: string,
    brief: string,
}

export interface BlogState {
    isFetching: boolean,
    error: boolean,
    blogInfo: BlogInterfaces | null,
    listBlogs: BlogInterfaces[] | null,
    pagination: {
        page: number,
        limit: number,
        totalData: number,
    }
}
