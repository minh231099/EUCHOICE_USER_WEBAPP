import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useAppDispatch } from "@/redux/hooks";
import { getUserInfo, logOut } from "@/redux/actions/authAction";
import { RootState } from "@/redux";
import { GetUserInfoInterface } from "@/redux/reducers/auth/interfaces";
import { Dropdown } from "antd";
import type { MenuProps } from 'antd';
import { useRouter } from "next/router";

interface UserDropDownPropsItf {
    userInfo: GetUserInfoInterface | null | undefined
}

const UserDropDown = (props: UserDropDownPropsItf) => {
    const { userInfo } = props;
    const [userName, setUserName] = useState<string>('')
    const dispatch = useAppDispatch();
    const router = useRouter();
    const currentPath = router.asPath;

    useEffect(() => {
        dispatch(getUserInfo());
    }, []);

    useEffect(() => {
        if (userInfo) {
            setUserName(userInfo.name);
        }
    }, [userInfo]);

    const onLogOut = () => {
        dispatch(logOut());
    }

    const items: MenuProps['items'] = [
        {
            key: 'userInformation',
            label: (
                <a style={{ padding: 5 }} onClick={() => { router.push('/user/account/information') }}>
                    Thông Tin Cá Nhân
                </a>
            ),
        },
        {
            key: 'purchasedOrder',
            label: (
                <a style={{ padding: 5 }} onClick={() => { router.push('/user/purchase') }}>
                    Đơn Đã Mua
                </a>
            ),
        },
        {
            key: 'logout',
            label: (
                <a style={{ padding: 5 }} onClick={onLogOut}>
                    Đăng Xuất
                </a>
            ),
        },
    ];

    return (
        <div style={{ cursor: 'pointer' }}>
            <Dropdown menu={{ items }} placement="bottomLeft" overlayStyle={{ zIndex: 999999 }}>
                <div style={{ marginBottom: 2 }}>
                    Xin chào, {userName}
                </div>
            </Dropdown>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        userInfo: state?.authReducer?.userInfo,
    };
};

export default connect(mapStateToProps)(UserDropDown);