import { waitForElementToExistByClassName } from '@/utils/lib';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { PiPackageBold, PiUserBold } from "react-icons/pi";

interface CustomProps {
    children: React.ReactNode;
}

const UserLeftLayout: React.FC<CustomProps> = (props) => {
    const { children } = props;
    const router = useRouter();
    const currentPath = router.asPath;

    const [isCurrentActive, setIsCurrentActive] = useState<string>('information');

    useEffect(() => {
        const tmp = currentPath.split('?')[0];
        const sub1 = tmp.split('/')[2];
        const sub2 = tmp.split('/')[3];
        setIsCurrentActive(sub1 !== 'purchase' && sub2 ? sub2 : sub1)
    }, [currentPath]);

    const isActive = (id: string) => id === isCurrentActive;

    const navigator = (parent: string | undefined, path: string | undefined) => {
        router.push(`/user/${parent ? `${parent}/` : ''}${path}`)
    };

    return (
        <div className='user-layout-container'>
            <div className='Brs7RuPcP1'>
                <div>
                    <div className='PxZmyhU8yS'>
                        <div className={`Jl9cqWcRLj`}>
                            <PiUserBold className='Vd1Twwpi5c' />
                        </div>
                        <div
                            className={`Jl9cqWcRLj`}
                            onClick={() => { navigator('account', 'information') }}
                        >
                            Tài Khoản Của Tôi
                        </div>
                    </div>
                    <div>
                        <div className='PxZmyhU8yS clQnFbXH3e'>
                            <div></div>
                            <div
                                className={`Jl9cqWcRLj ${isActive('information') ? 'HgvBcRcPNJ' : ''}`}
                                id='information'
                                onClick={() => { navigator('account', 'information') }}
                            >
                                Hồ Sơ
                            </div>
                        </div>
                        <div className='PxZmyhU8yS clQnFbXH3e'>
                            <div></div>
                            <div
                                className={`Jl9cqWcRLj ${isActive('address') ? 'HgvBcRcPNJ' : ''}`}
                                id='address'
                                onClick={() => { navigator('account', 'address') }}
                            >
                                Địa Chỉ
                            </div>
                        </div>
                        <div className='PxZmyhU8yS clQnFbXH3e'>
                            <div></div>
                            <div
                                className={`Jl9cqWcRLj ${isActive('change-password') ? 'HgvBcRcPNJ' : ''}`}
                                id='change-password'
                                onClick={() => { navigator('account', 'change-password') }}
                            >
                                Đổi Mật Khẩu
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`PxZmyhU8yS ${isActive('purchase') ? 'HgvBcRcPNJ' : ''}`}
                        id='purchase'
                        onClick={() => { navigator(undefined, 'purchase') }}
                    >
                        <div className={`Jl9cqWcRLj`}
                        >
                            <PiPackageBold className='Vd1Twwpi5c' />
                        </div>
                        <div className={`Jl9cqWcRLj`}>
                            Đơn Mua
                        </div>
                    </div>
                </div>
            </div>
            <div className='mbarwrLNQn'>
                {children}
            </div>
        </div>
    )
}

export default UserLeftLayout;