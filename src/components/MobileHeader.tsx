import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCart2 } from 'react-icons/bs';
import { useRouter } from "next/router";
import { FaSearch } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import { AppstoreOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import MobileHeaderNav from './MobileHeaderNav';

const MobileHeader = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [searchInput, setSearchInput] = useState<string>('');
    const [prodInCart, setProdInCart] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchInput(value);
    }

    const showDrawer = () => {
        setOpen(!open);
    };

    const onClose = () => {
        setOpen(false);
    };
    return (
        <header className='header-mobile'>
            <div className='mobile_header_container'>
                <div className='d-flex mobile-header-element'>
                    <AppstoreOutlined style={{ fontSize: '20px', marginRight: '10px', marginTop: '-3px', color: 'white' }} onClick={showDrawer} />
                    <form className="search_container-mobile" onSubmit={handleSubmit}>
                        <div className="d-flex">
                            <button className="search_button" type="submit">
                                <FaSearch className="search_icon" />
                            </button>
                            <input
                                className="search_box-mobile"
                                type="text"
                                value={searchInput}
                                onChange={handleInputChange}
                                placeholder={`${t('search')}...`}
                            />
                        </div>
                    </form>
                    <div className='d-flex right-content'>
                        <div className="cart_icon_container-mobile" onClick={() => router.push('/cart')}>
                            {
                                prodInCart > 0 && <div className="prod_count">{prodInCart}</div>
                            }
                            <BsCart2 className="cart_icon-mobile" />
                        </div>
                        <div className="user_icon_container d-flex">
                            <AiOutlineUser className="user-icon" onClick={() => router.push('/user')} />
                        </div>
                    </div>
                    <Drawer
                        placement={'left'}
                        closable={false}
                        onClose={onClose}
                        open={open}
                        width={'260px'}
                    >
                        <MobileHeaderNav onClose={onClose} router={router} />
                    </Drawer>
                </div>
            </div>
        </header>
    )
}

export default MobileHeader;