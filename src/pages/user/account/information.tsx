import { RootState } from '@/redux';
import { GetUserInfoInterface } from '@/redux/reducers/auth/interfaces';
import { Button, ConfigProvider, DatePicker, Form, Input, Radio } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

const { Item } = Form;

interface UserInformationType {
    userInfo: GetUserInfoInterface | null | undefined;
}

const UserInformation = (props: UserInformationType) => {
    const { userInfo } = props;
    const [form] = Form.useForm();

    form.setFieldsValue({
        name: userInfo?.name,
        phonenumer: userInfo?.phonenumer,
    });

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
                    >
                        <Item label='Tên' name='name'>
                            <Input></Input>
                        </Item>
                        <Item label='Email' name='email'>
                            <span>{userInfo?.email}</span><a className='ilr9WOraS5'>Thay đổi</a>
                        </Item>
                        <Item label='Số Điện Thoại' name='phonenumber'>
                            <span></span><a className='ilr9WOraS5'>Thay đổi</a>
                        </Item>
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
                                <Button>Lưu</Button>
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