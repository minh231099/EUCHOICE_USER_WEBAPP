import React, { useState, useRef, useEffect } from "react"
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import ChangeLanguage from './ChangeLanguage';
import { IoIosMail } from "react-icons/io";
import { FaPhoneAlt, FaSearch } from "react-icons/fa";
import { BsCart2 } from 'react-icons/bs';
import { AppstoreOutlined } from '@ant-design/icons';
import { Popover } from "antd";
import { useAppDispatch } from '@/redux/hooks';
import { getCategoryList } from "@/redux/actions/categoryAction";
import { RootState } from '@/redux';
import { CategoryInterface } from "@/redux/reducers/category/interfaces";
import { useRouter } from "next/router";
import { isLogged } from "@/utils/lib";
import UserDropDown from "./UserDropDown";
import { CartInfoInterface } from "@/redux/reducers/cart/interfaces";
import Cookies from "js-cookie";
import { getListShippingInfo } from "@/redux/actions/shippingInfo";

const logo = '/logo.png';

interface CategoryPagePropsInf {
    category: CategoryInterface[] | null | undefined;
    listProductsInCart: CartInfoInterface[] | null | undefined;
    isFetching: boolean | null | undefined;
    token: string | null | undefined;
    logedOut: boolean | null | undefined;
}

const Header = (props: CategoryPagePropsInf) => {
    const { category, listProductsInCart, isFetching, logedOut, token } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const [searchInput, setSearchInput] = useState<string>('');
    const [prodInCart, setProdInCart] = useState<number>(0);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [width, setWidth] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const elementRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();

    const isShowNav = !router.pathname.startsWith('/user') && !router.pathname.startsWith('/order') && !router.pathname.startsWith('/cart');

    useEffect(() => {
        const handleResize = () => {
            if (elementRef.current) {
                const temp = elementRef.current.offsetWidth - 20;
                setWidth(temp)
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });

    useEffect(() => {
        dispatch(getCategoryList());
        dispatch(getListShippingInfo());
        setIsLoggedIn(isLogged());
    }, []);

    useEffect(() => {
        let cnt = 0;
        if (listProductsInCart) {
            listProductsInCart.forEach(elm => {
                cnt += elm.product.length;
            })
        }
        setProdInCart(cnt);
    }, [listProductsInCart]);

    useEffect(() => {
        if (!token && logedOut && !isFetching) {
            Cookies.remove('jwt');
            location.reload();
        }
    }, [logedOut, isFetching]);

    const handleNavItemClick = (index: any) => {
        setActiveIndex(index);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push({ pathname: `/search/all`, query: { key: searchInput } });
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchInput(value);
    }
    
    const navItems = [
        {
            key: '',
            value: 'Trang chủ'
        },
        {
            key: 'product',
            value: 'Sản phẩm'
        },
        {
            key: 'blogs',
            value: 'Tin tức'
        },
        {
            key: 'introduce',
            value: 'Giới thiệu'
        },
        {
            key: 'contact',
            value: 'Liên hệ'
        },
    ];

    const content = (
        <div className="popover-category" style={{ width: `${width}px` }}>
            {category?.map((item: CategoryInterface, index) => (
                <div key={index} className="popover-item" onClick={() => {
                    router.push({ pathname: `/category/${item.name}` });
                    handleNavItemClick(null);
                }}>
                    {item.name}
                </div>
            ))}
        </div>
    );

    const onClickLogin = () => {
        router.push('/login');
    }

    const onClickSignUp = () => {
        router.push('/signup')
    }

    const onClickCartIcon = () => {
        router.push('/cart');
    }

    return (
        <header className="app-header">
            <div className="above_header d-flex">
                <div className="above_header_elm">
                    <div className="above_header_left_content d-flex">
                        <span className="above_header_mail_icon"><IoIosMail /></span><span className="above_header_text">LIENHE@HAGA86.VN</span>
                        <div className="above_header_vertical_divide"></div>
                        <span className="above_header_phone_icon"><FaPhoneAlt /></span><span className="above_header_text">0888283335</span>
                    </div>
                    <div className="above_header_center_content above_header_welcome">
                        {t('welcome')}
                    </div>
                    <div className="above_header_right_content">
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <div className="d-flex" style={{ alignItems: 'center' }}>
                                <div style={{ marginRight: 30 }}>
                                    <ChangeLanguage />
                                </div>
                                {!isLoggedIn ? (
                                    <div className="d-flex above_header_sign_up_sign_in">
                                        <span className="sign_in_button" onClick={onClickLogin}>Đăng nhập</span>
                                        <div className="above_header_vertical_divide"></div>
                                        <span className="sign_up_button" onClick={onClickSignUp}>Đăng ký</span>
                                    </div>
                                ) : <UserDropDown />}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex header_second_row-container">
                <div className="d-flex header_second_row align_center">
                    <div className="header_second_row_left" onClick={() => { router.push('/') }}>
                        <img className="logo" src={logo} alt="Logo" />
                    </div>
                    <div className="header_second_row_center">
                        <form className="search_container" onSubmit={handleSubmit}>
                            <div className="d-flex">
                                <input
                                    className="search_box"
                                    type="text"
                                    value={searchInput}
                                    onChange={handleInputChange}
                                    placeholder={`${t('search')}...`}
                                />
                                <button className="search_button" type="submit">
                                    <FaSearch className="search_icon" />
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="header_second_row_right">
                        <div className="cart_icon_container" onClick={onClickCartIcon}>
                            {
                                prodInCart > 0 && <div className="prod_count">{prodInCart}</div>
                            }
                            <BsCart2 className="cart_icon" />
                        </div>
                    </div>
                </div>
            </div>
            {
                isShowNav && <div className="category-header">
                    <div className="category-grid" ref={elementRef}>
                        <Popover placement="bottomLeft" content={content} arrow={false}>
                            <div className="nav-ul-header"> <AppstoreOutlined style={{ fontSize: '20px', marginRight: '10px', marginTop: '-3px' }} />
                                <span className="span-nav-ul-header">Danh mục sản phẩm</span>
                            </div>
                        </Popover>
                        {navItems.map((item, index) => (
                            <div
                                key={index}
                                className={`nav-header ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => { handleNavItemClick(index), router.push({ pathname: `/${item.key}` }) }}
                            >
                                {item.value}
                            </div>
                        ))}
                    </div>
                </div>
            }
        </header >
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        category: state?.categoryReducer?.categoryList,
        listProductsInCart: state?.cartReducer?.listProductsInCart,
        isFetching: state?.authReducer?.isFetching,
        logedOut: state?.authReducer?.logedOut,
        token: state?.authReducer?.token,
    };
};

export default connect(mapStateToProps)(Header);