import { addNewShippingInfo } from '@/redux/actions/shippingInfo';
import { useAppDispatch } from '@/redux/hooks';
import { AddShippingInfoPayloadInterface } from '@/redux/reducers/shippingInfo/interfaces';
import { Button, Checkbox, Divider, Form, Input, Modal } from 'antd';
import React from 'react';

const { Item } = Form;

interface PropsType {
    visible: boolean;
    onCancel: () => void;
    canCancel: boolean | undefined;
}

const AddNewShippingInfoModal = (props: PropsType) => {
    const { visible, onCancel, canCancel } = props;
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const onSubmit = (values: AddShippingInfoPayloadInterface) => {
        dispatch(addNewShippingInfo(values));
        onClearForm();
    }

    const onClearForm = () => {
        form.resetFields();
        onCancel();
    }

    return (

        <Modal
            className='add-new-address-modal'
            open={visible}
            zIndex={999999}
            closeIcon={null}
            title='Địa Chỉ Mới'
            centered
            maskClosable={false}
            footer={[
                <Button onClick={onClearForm} disabled={!canCancel}>
                    Cancel
                </Button>,
                <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
                    Submit
                </Button>
            ]}
        >
            <Form
                className='Aoekk79GJR'
                form={form}
                onFinish={onSubmit}
                initialValues={{
                    country: 'Viet Nam'
                }}
            >
                <div>
                    <Item name='phone_number' rules={[{ required: true, message: '' }]}>
                        <Input type='number' placeholder='Phone Number' />
                    </Item>
                </div>
                <div>
                    <Item name='name' rules={[{ required: true, message: '' }]}>
                        <Input placeholder='Họ Và Tên' />
                    </Item>
                </div>
                <Item name='address' rules={[{ required: true, message: '' }]}>
                    <Input placeholder='Địa Chỉ Cụ Thể' />
                </Item>
                <div className='M2GXrTnvkg'>
                    <Item name='ward' rules={[{ required: true, message: '' }]}>
                        <Input placeholder='Phường/Xã' />
                    </Item>
                    <Item name='provine' rules={[{ required: true, message: '' }]}>
                        <Input placeholder='Quận/Huyện' />
                    </Item>
                    <Item name='city' rules={[{ required: true, message: '' }]}>
                        <Input placeholder='Thành Phố' />
                    </Item>
                </div>
                <div className='M2GXrTnvkg'>
                    <Item name='country'>
                        <Input placeholder='Đất Nước' disabled />
                    </Item>
                </div>
                <div>
                    <Item name='main' valuePropName="checked">
                        <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                    </Item>
                </div>
            </Form>
        </Modal >
    )
};

export default AddNewShippingInfoModal;