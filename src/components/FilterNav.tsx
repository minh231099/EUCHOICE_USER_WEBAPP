import React from 'react';
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { RootState } from '@/redux';
import { CategoryInterface } from '@/redux/reducers/category/interfaces';
import { generateKey } from '@/utils/lib';
import { API_URLS } from '@/api/apiURL';
import apiCall from '@/helper/apiCall';

interface FilterNavPropsInf {
    category: CategoryInterface[] | null | undefined;
    router: any;
    onClose: Function;
}

const FilterNav = (props: FilterNavPropsInf) => {
    const filterPrice = [
        {
            key: '1',
            value: 'Dưới 500.000đ',
            under: '500000',
        },
        {
            key: '2',
            value: 'Từ 500.000 - 1.000.000đ',
            under: '1000000',
            over: '500000',
        },
        {
            key: '3',
            value: 'Từ 1.000.000 - 1.500.000đ',
            under: '1500000',
            over: '1000000',
        },
        {
            key: '4',
            value: 'Trên 1.500.000đ',
            over: '1500000',
        },
    ];

    return (
        <div>
            <span className='span-filter'>LỌC THEO GIÁ</span>
            <div className='divider'></div>
            <ul className='ul-filter'>
                {filterPrice?.map((item, index) => (
                    <li
                        className='li-filter'
                        key={`YCSwQQuJ0Q-${index}`}
                        onClick={(e) => {
                            props.router.push({ pathname: `/search/price`, query: { under: item.under, over: item.over } })
                        }}
                    >
                        {item.value}
                    </li>
                ))}
            </ul>
            <span className='span-filter'>DANH MỤC SẢN PHẨM</span>
            <div className='divider'></div>
            <ul className='ul-filter'>
                {props.category?.map((item: CategoryInterface, index) => (
                    <li className='li-filter' key={`E2wbmr6fHC-${index}`} onClick={() => {
                        props.router.push({ pathname: `/category/${item.name}` });
                        props.onClose()
                    }}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        category: state?.categoryReducer?.categoryList,
    };
};

export default connect(mapStateToProps)(withRouter(FilterNav));