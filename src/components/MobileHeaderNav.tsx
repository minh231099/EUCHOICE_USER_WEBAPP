import { DownOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { connect } from 'react-redux';
import { RootState } from '@/redux';
import { CategoryInterface } from '@/redux/reducers/category/interfaces';
import { generateKey } from "@/utils/lib";

interface MobileNavPropsInf {
    category: CategoryInterface[] | null | undefined;
    router: any;
    onClose: Function;
}

const navItems = [
    {
        key: '',
        value: 'Trang chủ'
    },
    {
        key: 'category',
        value: 'Danh mục'
    },
    {
        key: 'introduce',
        value: 'Giới thiệu'
    },
    {
        key: 'product',
        value: 'Sản phẩm'
    },
    {
        key: 'blogs',
        value: 'Tin tức'
    }
];
const MobileHeaderNav = (props: MobileNavPropsInf) => {
    const [sh, getSH] = useState<boolean>(true)
    return (
        <div className="mobile-header-nav-container">
            <ul className='ul-filter'>
                {navItems.map((item: any, index) => {
                    if (item.key !== 'category')
                        return (
                            <li className='li-filter' key={`XcnyT6T9Qc-${index}`} onClick={() => {
                                props.router.push({ pathname: `/${item.key}` });
                                props.onClose()
                            }}>
                                {item.value}
                            </li>
                        )

                    if (item.key === 'category')
                        return (
                            <li className='li-filter' key={`2Czyh35cXp-${index}`} onClick={() => {
                                getSH(!sh)
                            }}>
                                {item.value} <DownOutlined className={`down-icon-mb-header icon-show-is-${sh}`} /> <RightOutlined className={`down-icon-mb-header icon-show-is-${!sh}`} />
                                <div style={!sh ? { display: 'block' } : { display: "none" }}>
                                    <ul className="ul-filter">
                                        {props.category?.map((item: CategoryInterface, index) => (
                                            <li key={`lEsGoGeFZ2-${index}`} className="li-filter-level-2" onClick={() => {
                                                props.router.push({ pathname: `/category/${item.name}` });
                                                props.onClose()
                                            }}>
                                                {item.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        category: state?.categoryReducer?.categoryList,
    };
};
export default connect(mapStateToProps)(MobileHeaderNav)