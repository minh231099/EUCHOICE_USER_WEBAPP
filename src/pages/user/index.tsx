import { logOut } from '@/redux/actions/authAction';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/router';
import React from 'react';
import { BsBoxSeam, BsCalendarCheck, BsCartX, BsTruck } from 'react-icons/bs';

const UserPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const onLogOut = () => {
        dispatch(logOut());
    }

    const navigatorPurchase = (type: string) => {
        router.push({
            pathname: '/user/purchase',
            query: { type },
        });
    };

    const navigator = (path: string) => {
        router.push({
            pathname: path,
        });
    }

    return (
        <div className='GHikxnVHFR'>
            <div className='TyURwphi6y'>
                <div className='ozqZYf1ae5'>Đơn Mua</div>
                <div className='ZQ8ze1QaZc'>
                    <div className='HNgA3Gmt2h' onClick={() => { navigatorPurchase('new') }}>
                        <BsBoxSeam className='PYRqEgdxFJ' />
                        <div className='yrmbOtes65'>Hệ thống tiếp nhận</div>
                    </div>
                    <div className='HNgA3Gmt2h' onClick={() => { navigatorPurchase('shipping') }}>
                        <BsTruck className='PYRqEgdxFJ' />
                        <div className='yrmbOtes65'>Đang giao</div>
                    </div>
                    <div className='HNgA3Gmt2h' onClick={() => { navigatorPurchase('done') }}>
                        <BsCalendarCheck className='PYRqEgdxFJ' />
                        <div className='yrmbOtes65'>Hoàn thành</div>
                    </div>
                    <div className='HNgA3Gmt2h' onClick={() => { navigatorPurchase('cancel') }}>
                        <BsCartX className='PYRqEgdxFJ' />
                        <div className='yrmbOtes65'>Đã Hủy</div>
                    </div>
                </div>
            </div>
            <div className='G4gke7PUfx'>
                <div className='j4wC1fPOpf' onClick={() => { navigator('/user/account/information') }}>Thông tin tài khoản</div>
                <div className='j4wC1fPOpf' onClick={() => { navigator('/user/account/address') }}>Địa chỉ</div>
                <div className='j4wC1fPOpf'>Đổi mật khẩu</div>
            </div>
            <div className='TyURwphi6y uSbZpS5JQk' onClick={onLogOut}>
                Đăng xuất
            </div>
        </div>
    )
}

export default UserPage;