import { RootState } from '@/redux';
import { changePassword } from '@/redux/actions/accountAction';
import { useAppDispatch } from '@/redux/hooks';
import { ChangePasswordPayload } from '@/redux/reducers/account/interfaces';

import { Button, ConfigProvider, Form, Input, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

const { Item } = Form
const { Password } = Input

interface ChangePasswordPageType {
    changePasswordError: boolean | undefined,
    errorMessage: string | undefined,
    isFetching: boolean | undefined,
}

const ChangePasswordPage = (props: ChangePasswordPageType) => {
    const { changePasswordError, errorMessage, isFetching } = props;
    console.log(errorMessage);
    const dispatch = useAppDispatch();

    const [submiting, setSubmiting] = useState(false);
    const [changePasswordErrorMessage, setChangePasswordErrorMessage] = useState<string | undefined>();
    const onSubmitChangePassWord = (values: ChangePasswordPayload) => {
        dispatch(changePassword(values));
        setSubmiting(true)
    }

    useEffect(() => {
        if (!isFetching && submiting) {
            if (changePasswordError) {
                setChangePasswordErrorMessage(errorMessage);
            } else {
                setChangePasswordErrorMessage(undefined);
            }
        }
    }, [changePasswordError, submiting, isFetching])

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '1e1e1e',
                    borderRadius: 2,
                },
            }}
        >
            <div className='vLfvCfihke'>
                <Form
                    labelCol={{ xl: { span: 8 }, md: { span: 6 }, lg: { span: 6 }, sm: { span: 6 }, xs: { span: 6 } }}
                    wrapperCol={{ xl: { span: 6 }, md: { span: 6 }, lg: { span: 6 }, sm: { span: 6 }, xs: { span: 6 } }}
                    onFinish={onSubmitChangePassWord}
                    onChange={() => setChangePasswordErrorMessage(undefined)}
                >
                    <Item
                        name="current_password"
                        label="Mật Khẩu Hiện Tại"
                        rules={[{ required: true, message: 'Vui Lòng Điền Mật Khẩu Hiện Tại!' }]}
                        required
                    >
                        <Password type='password' />
                    </Item>
                    <Item
                        name="new_password"
                        label="Mật Khẩu Mới"
                        rules={[{ required: true, message: 'Vui Lòng Điền Mật Khẩu Mới!' }]}
                        required
                    >
                        <Password type='password' />
                    </Item>
                    <Item
                        name="confirm_password"
                        label="Xác Nhận Mật Khẩu"
                        rules={[
                            {
                                required: true,
                                message: 'Vui Lòng Xác Nhận Mật Khẩu!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('new_password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Không Trùng Với Mật Khẩu Mới!'));
                                },
                            }),
                        ]}
                        required
                    >
                        <Password type='password' />
                    </Item>
                    <div>
                        {
                            changePasswordErrorMessage &&
                            <div>
                                {changePasswordErrorMessage}
                            </div>
                        }
                    </div>
                    <Item wrapperCol={{ xl: { offset: 8, span: 16 }, md: { offset: 6, span: 16 } }}>
                        <Button htmlType='submit'>Lưu</Button>
                    </Item>
                </Form>
            </div>
        </ConfigProvider>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        changePasswordError: state.accountReducer?.changePasswordError,
        errorMessage: state.accountReducer?.errorMessage,
        isFetching: state.accountReducer?.isFetching,
    };
};

export default connect(mapStateToProps)(ChangePasswordPage);