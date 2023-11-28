import { RootState } from '@/redux';
import { updateUserInfo } from '@/redux/actions/accountAction';
import { useAppDispatch } from '@/redux/hooks';
import { GetUserInfoInterface } from '@/redux/reducers/auth/interfaces';
import { Button, ConfigProvider, DatePicker, Form, Input, Radio } from 'antd';
import React, { useState } from 'react';
import { connect } from 'react-redux';

const { Item } = Form;

interface UserInformationType {
    userInfo: GetUserInfoInterface | null | undefined;
}

interface SaveInfoParams {
    name: string;
    email: string;
}

const UserInformation = (props: UserInformationType) => {
    const { userInfo } = props;
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [isChangingEmail, setIsChangingEmail] = useState(false);

    form.setFieldsValue({
        name: userInfo?.name,
        email: userInfo?.email,
    });

    const onSaveInfo = (values: SaveInfoParams) => {
        dispatch(updateUserInfo(values));
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '1e1e1e',
                    borderRadius: 2,
                },
            }}
        >
            <div className='n2vJVEgQZB'>
                <div className='av1tBrHjts'>
                    <b>Thông Tin Cá Nhân</b>
                </div>
                <div className='lmzr3mo5yy'>
                    <Form
                        form={form}
                        labelCol={{ xl: { span: 4 }, md: { span: 6 } }}
                        wrapperCol={{ xl: { span: 12 }, md: { span: 16 } }}
                        onFinish={onSaveInfo}
                    >
                        <Item label='Tên' name='name' required rules={[{ required: true }]}>
                            <Input></Input>
                        </Item>
                        {
                            !isChangingEmail ?
                                <Item label='Email' name='email'>
                                    <span>{userInfo?.email}</span><a className='ilr9WOraS5' onClick={() => setIsChangingEmail(true)}>Thay đổi</a>
                                </Item>
                                :
                                <Item label='Email' name='email' required rules={[{ required: true }]}>
                                    <Input></Input>
                                </Item>
                        }
                        {/* <Item label='Số Điện Thoại' name='phonenumber'>
                            <span></span><a className='ilr9WOraS5'>Thay đổi</a>
                        </Item> */}
                        {/* <Item label='Giới Tính' name='gender'>
                            <Radio.Group>
                                <Radio value={'male'}>Nam</Radio>
                                <Radio value={'female'}>Nữ</Radio>
                                <Radio value={'diff'}>Khác</Radio>
                            </Radio.Group>
                        </Item>
                        <Item label='Ngày Sinh' name='dob'>
                        </Item> */}
                        <Item wrapperCol={{ xl: { offset: 4, span: 12 }, md: { offset: 6, span: 12 } }}>
                            <div className='tudtFbpK8a'>
                                <Button htmlType='submit'>Lưu</Button>
                            </div>
                        </Item>
                    </Form>
                </div>
            </div>
        </ConfigProvider>

    )
}
const mapStateToProps = (state: RootState) => {
    return {
        userInfo: state?.authReducer?.userInfo,
    };
};

export default connect(mapStateToProps)(UserInformation);