import Cookies from "js-cookie";

const HEADERS = {
    DEFAULT_HEADER: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
    header: () => ({
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
    }),
    header_form: () => ({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Authorization: `Bearer ${Cookies.get('jwt')}`,
    }),
    jsonHeader: () => ({
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: localStorage.getItem('jwt'),
        RefreshToken: localStorage.getItem('reft'),
    }),
    file_header: () => ({
        'Content-Type': 'multipart/form-data',
        Authorization: localStorage.getItem('jwt'),
        RefreshToken: localStorage.getItem('reft'),
    }),
};

export const API_URLS = {
    AUTH: {
        login: () => ({
            endPoint: `v1/account/signIn`,
            method: 'POST',
            headers: HEADERS.header()
        }),
        userInfo: () => ({
            endPoint: `v1/account/info`,
            method: 'GET',
            headers: HEADERS.header()
        }),
        logOut: () => ({
            endPoint: `v1/account/signout`,
            method: 'POST',
            headers: HEADERS.header()
        })
    },
    CART: {
        addToCart: () => ({
            endPoint: `v1/cart/add`,
            method: 'POST',
            headers: HEADERS.header()
        }),
        cartInfo: () => ({
            endPoint: `v1/cart/info`,
            method: 'GET',
            headers: HEADERS.header()
        }),
        deleteProductInCart: (id: string) => ({
            endPoint: `v1/cart/delete/${id}`,
            method: 'PUT',
            headers: HEADERS.header()
        }),
        deleteManyProductInCart: () => ({
            endPoint: `v1/cart/delete-many`,
            method: 'POST',
            headers: HEADERS.header()
        }),
    },
    PRODUCT: {
        getProductDetails: (id: string) => ({
            endPoint: `v1/product/info/${id}`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER
        }),
        getListProduct: (params: string) => ({
            endPoint: `v1/product/list${params}`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER
        }),
        getProductImages: (name: string) => ({
            endPoint: `v1/image/${name}`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER
        }),
        getTop10Product: () => ({
            endPoint: `v1/product/top?limit=10`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER
        }),
        getListSale: (param: string) => ({
            endPoint: `v1/product/list-sale${param}`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER
        })
    },
    CATEGORY: {
        getListCategory: () => ({
            endPoint: `v1/category/list`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER
        }),
    },
    SEARCH: {
        searchProduct: (params: string) => ({
            endPoint: `v1/search/all${params}`,
            method: 'GET',
            headers: HEADERS.DEFAULT_HEADER
        })
    },
    SHIPPING_INFO: {
        getListShippingInfo: () => ({
            endPoint: `v1/shippingInfo/list`,
            method: 'GET',
            headers: HEADERS.header()
        }),
        addNewShippingInfo: () => ({
            endPoint: `v1/shippingInfo/add`,
            method: 'POST',
            headers: HEADERS.header()
        })
    },
    ORDER: {
        addNewOrder: () => ({
            endPoint: `v1/order/add`,
            method: 'POST',
            headers: HEADERS.header()
        }),
        getListOrder: (type: string | undefined) => ({
            endPoint: `v1/order/list?status=${type}`,
            method: 'GET',
            headers: HEADERS.header()
        }),
        getOrderDetails: (id: string) => ({
            endPoint: `v1/order/info/${id}`,
            method: 'GET',
            headers: HEADERS.header()
        }),
        checkOrderDone: (id: string) => ({
            endPoint: `v1/order/done/${id}`,
            method: 'PUT',
            headers: HEADERS.header()
        }),
        cancelOrder: (id: string) => ({
            endPoint: `v1/order/cancel/${id}`,
            method: 'PUT',
            headers: HEADERS.header()
        }),
    },
    INTRODUCE: {
        getAboutUs: () => ({
            endPoint: `v1/config/profile`,
            method: 'GET',
            headers: HEADERS.header(),
        })
    },
    BLOGS: {
        getListBlogs: (page: number) => ({
            endPoint: `v1/news/list?page=${page}&limit=9`,
            method: 'GET',
            headers: HEADERS.header(),
        }),
        getBlog: (id: string) => ({
            endPoint: `v1/news/info/${id}`,
            method: 'GET',
            headers: HEADERS.header(),
        })
    },
    BANNER: {
        getListBanner: (isTop: string | undefined) => ({
            endPoint: `v1/banner/list${isTop}`,
            method: 'GET',
            headers: HEADERS.header()
        }),
    }
}