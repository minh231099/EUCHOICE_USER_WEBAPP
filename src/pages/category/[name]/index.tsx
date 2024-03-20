import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import ProductCard from '@/components/ProductCard';
import { ProductInterface } from '@/redux/reducers/product/interfaces';
import { UnorderedListOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import FilterNav from '@/components/FilterNav';
import { API_URLS } from '@/api/apiURL';
import apiCall from '@/helper/apiCall';
import { Pagination } from 'antd';
import { generateKey } from '@/utils/lib';

interface CategoryPagePropsInf {
    productList: ProductInterface[] | null | undefined;
    list: any;
    pagination: any;
}
const baseUrl = process.env.BASE_URL;

const CategoryPage = (props: CategoryPagePropsInf) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { name } = router.query;

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
        <div className='category-page-container' style={{ backgroundColor: '#fff' }}>
            <div className='div-grid'>
                <div className='div-filter-mobile' onClick={() => { showDrawer() }}>
                    <UnorderedListOutlined className='icon-filter-mobile' /><strong className='span-filter-mobile'> Lọc</strong>
                </div>
                <div className='div-filter'>
                    <FilterNav onClose={() => { }} />
                </div>
               
                    <div className={`div-product ${props.list.length < 6 ? 'div-product-less' : null}`}>
                        {props.list?.map((item: ProductInterface, index: number) => (
                            <a href={`/product/${item._id}`} rel="noopener noreferrer" key={`RWTAmHBG6w-${index}`}>
                                <ProductCard

                                    sourceImg={`${baseUrl}image/${item.image[0]}`}
                                    title={item.name}
                                    price={item.type[0]?.price?.toLocaleString('vi-VN')}
                                />
                            </a>
                        ))}
                    </div> 
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
                        onChange={(e) => { router.push({ pathname: `/category/${name}/${e}` }) }}
                    />
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (props: any) => {
    const { name } = props.params;
    let pr = "";
    if (name) pr = pr.concat(`?category=${name}`);
    const api = API_URLS.PRODUCT.getListProduct(pr);
    const { response, error } = await apiCall({ ...api });
    return {
        props: {
            list: response?.data || null,
            pagination: response?.pagination || null
        }
    }
}

export default (CategoryPage);