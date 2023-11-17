import React, { useState } from 'react';
import { useRouter } from 'next/router'
import ProductCard from '@/components/ProductCard';
import { ProductInterface } from '@/redux/reducers/product/interfaces';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Drawer, Pagination } from 'antd';
import FilterNav from '@/components/FilterNav';
import { API_URLS } from '@/api/apiURL';
import apiCall from '@/helper/apiCall';
import { generateKey } from '@/utils/lib';

interface SearchPagePropsInf {
    list: ProductInterface[] | null | undefined;
    router: any;
    pagination: any;
}
const baseUrl = process.env.BASE_URL;

const ProductPage = (props: SearchPagePropsInf) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const onClickProduct = (id: string) => {
        router.push('/product/[id]', `/product/${id}`);
    }

    return (
        <div className='category-page-container page-container'>
            <div className='div-grid'>
                <div className='div-filter-mobile' onClick={() => { showDrawer() }}>
                    <UnorderedListOutlined className='icon-filter-mobile' /><strong className='span-filter-mobile'> Lọc</strong>
                </div>
                <div className='div-filter'>
                    <FilterNav onClose={() => { }} />
                </div>
                {props.list?.length === 1 ?
                    <div className='div-product div-product-less'>
                        {props.list?.map((item: ProductInterface, index: number) => (
                            <ProductCard
                                key={generateKey()}
                                sourceImg={`${baseUrl}image/${item.image[0]}`}
                                title={item.name}
                                price={item.type[0]?.price?.toLocaleString('vi-VN')}
                                onClick={() => onClickProduct(item._id)}
                            />
                        ))}
                    </div> : (props.list?.length === 2 ? <div className='div-product div-product-less-2'>
                        {props.list?.map((item: ProductInterface, index: number) => (
                            <ProductCard
                                key={generateKey()}
                                sourceImg={`${baseUrl}image/${item.image[0]}`}
                                title={item.name}
                                price={item.type[0]?.price?.toLocaleString('vi-VN')}
                                onClick={() => onClickProduct(item._id)}
                            />
                        ))}
                    </div> : (props.list?.length === 3 ? <div className='div-product div-product-less-3'>
                        {props.list?.map((item: ProductInterface, index: number) => (
                            <ProductCard
                                key={generateKey()}
                                sourceImg={`${baseUrl}image/${item.image[0]}`}
                                title={item.name}
                                price={item.type[0]?.price?.toLocaleString('vi-VN')}
                                onClick={() => onClickProduct(item._id)}
                            />
                        ))}
                    </div> : <div className='div-product'>
                        {props.list?.map((item: ProductInterface, index: number) => (
                            <ProductCard
                                key={generateKey()}
                                sourceImg={`${baseUrl}image/${item.image[0]}`}
                                title={item.name}
                                price={item.type[0]?.price?.toLocaleString('vi-VN')}
                                onClick={() => onClickProduct(item._id)}
                            />
                        ))}
                    </div>))}
            </div>
            <Drawer
                placement={'left'}
                closable={false}
                onClose={onClose}
                open={open}
                width={'260px'}
            >
                <div className="mobile-header-nav-container">
                    <FilterNav onClose={onClose} />
                </div>
            </Drawer>
            <div className='div-grid'>
                <div></div>
                <div className='div-pagination-prod'>
                    <Pagination
                        defaultCurrent={props.pagination.page}
                        total={props.pagination.totalData}
                        pageSize={20}
                        onChange={(e) => { router.push({ pathname: `/product`, query: { page: e } }) }}
                    />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (props: any) => {
    const api = API_URLS.PRODUCT.getListProduct(`?page=${props.query.page}`);
    const { response, error } = await apiCall({ ...api });
    return {
        props: {
            list: response?.data || null,
            pagination: response?.pagination || null
        }
    }
}

export default ProductPage;