import React from 'react';
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { RootState } from '@/redux';
import { CategoryInterface } from '@/redux/reducers/category/interfaces';
import { generateKey } from '@/utils/lib';

interface FilterNavPropsInf {
    category: CategoryInterface[] | null | undefined;
    router: any;
    onClose: Function;
}

const FilterNav = (props: FilterNavPropsInf) => {
    const filterPrice = [
        {
            key: '1',
            value: 'Dưới 500.000đ'
        },
        {
            key: '2',
            value: 'Từ 500.000 - 1.000.000đ'
        },
        {
            key: '3',
            value: 'Từ 1.000.000 - 1.500.000đ'
        },
        {
            key: '4',
            value: 'Trên 1.500.000đ'
        },
    ];

    return (
        <div>
            <span className='span-filter'>LỌC THEO GIÁ</span>
            <div className='divider'></div>
            <ul className='ul-filter'>
                {filterPrice?.map((item, index) => (
                    <li className='li-filter' key={generateKey()} >
                        {item.value}
                    </li>
                ))}
            </ul>
            <span className='span-filter'>DANH MỤC SẢN PHẨM</span>
            <div className='divider'></div>
            <ul className='ul-filter'>
                {props.category?.map((item: CategoryInterface, index) => (
                    <li className='li-filter' key={generateKey()} onClick={() => {
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