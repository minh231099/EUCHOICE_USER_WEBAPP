import { RootState } from '@/redux';
import { addNewShippingInfo, getListDistrict, getListWard, updateShippingInfo } from '@/redux/actions/shippingInfo';
import { useAppDispatch } from '@/redux/hooks';
import { AddShippingInfoPayloadInterface, ListCityInterface, ShippingInfoInterface } from '@/redux/reducers/shippingInfo/interfaces';
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const { Item } = Form;

interface PropsType {
    visible: boolean;
    onCancel: () => void;
    canCancel: boolean | undefined;
    initialValues: ShippingInfoInterface | undefined;
    listCity: ListCityInterface[] | undefined;
    listDistrict: ListCityInterface[] | undefined;
    listWard: ListCityInterface[] | undefined;
}

interface ListOptionInf {
    value: string;
    code: number;
    label: string;
}

const AddNewShippingInfoModal = (props: PropsType) => {
    const { visible, onCancel, canCancel, initialValues, listCity, listDistrict, listWard } = props;
    const dispatch = useAppDispatch();
    const [form] = Form.useForm();

    const [cityOptions, setCityOptions] = useState<ListOptionInf[]>([]);
    const [isChangedCity, setIsChangedCity] = useState<boolean>(false);
    const [cityCode, setCityCode] = useState<number>(0);

    const [districtOptions, setDistrictOptions] = useState<ListOptionInf[]>([]);
    const [isChangedDistrict, setIsChangedDistrict] = useState<boolean>(false);
    const [provineCode, setProvineCode] = useState<number>(0);

    const [wardOptions, setWardOptions] = useState<ListOptionInf[]>([]);
    const [wardCode, setWardCode] = useState<number>(0);

    form.setFieldsValue({
        country: 'Việt Nam',
    });

    useEffect(() => {
        if (initialValues && !form.getFieldsValue().phone_number) {
            form.setFieldsValue({
                phone_number: initialValues.phone_number,
                name: initialValues.name,
                address: initialValues.address,
                city: initialValues.city,
                provine: initialValues.provine,
                ward: initialValues.ward,
                main: initialValues.default,
            });

            if (initialValues.cityCode) {
                setCityCode(initialValues.cityCode);
                dispatch(getListDistrict(initialValues.cityCode));
            }
            if (initialValues.provineCode) {
                setProvineCode(initialValues.provineCode);
                dispatch(getListWard(initialValues.provineCode));
            }
            if (initialValues.wardCode) {
                setWardCode(initialValues.wardCode);
            }

            if (initialValues.city && !isChangedCity) setIsChangedCity(true);
            if (initialValues.provine && !isChangedDistrict) setIsChangedDistrict(true);
        }
    }, [JSON.parse(JSON.stringify(initialValues ? initialValues : {}))]);

    useEffect(() => {
        if (listCity) {
            setCityOptions(listCity.map((items: ListCityInterface) => {
                const tmp = items.name.split(' ');

                if (items.name.includes('Thành phố'))
                    tmp.splice(0, 2);
                else
                    tmp.splice(0, 1);

                return {
                    value: tmp.join(' '),
                    code: items.code,
                    label: tmp.join(' '),
                }
            }));
        }
    }, [listCity?.length]);

    useEffect(() => {
        if (listDistrict) {
            setDistrictOptions(listDistrict.map((items: ListCityInterface) => {
                const tmp = items.name.split(' ');

                if (items.name.includes('Thành phố'))
                    tmp.splice(0, 2);
                else
                    tmp.splice(0, 1);

                return {
                    value: tmp.join(' '),
                    code: items.code,
                    label: tmp.join(' '),
                }
            }))
        }
    }, [JSON.parse(JSON.stringify(listDistrict))]);

    useEffect(() => {
        if (listWard) {
            setWardOptions(listWard.map((items: ListCityInterface) => {
                const tmp = items.name.split(' ');

                if (items.name.includes('Thị trấn'))
                    tmp.splice(0, 2);
                else
                    tmp.splice(0, 1);

                return {
                    value: tmp.join(' '),
                    code: items.code,
                    label: tmp.join(' '),
                }
            }))
        }
    }, [JSON.parse(JSON.stringify(listWard))])

    const onSubmit = (values: AddShippingInfoPayloadInterface) => {
        const payload = { ...values, cityCode, provineCode, wardCode }
        if (!initialValues) {
            dispatch(addNewShippingInfo(payload));
        } else {
            dispatch(updateShippingInfo(initialValues._id, payload));
        }
        onClearForm();
    }

    const onChangeCity = (values: string, option: any) => {
        if (values) {
            setIsChangedCity(true);
            setIsChangedDistrict(false);
            form.resetFields(['provine', 'ward']);
            form.setFieldValue('city', values);
            setCityCode(option.code);
            dispatch(getListDistrict(option.code));
        }
    }

    const onChangeDistrict = (values: string, option: any) => {
        if (values) {
            setIsChangedDistrict(true);
            form.resetFields(['ward']);
            form.setFieldValue('provine', values);
            setProvineCode(option.code);
            dispatch(getListWard(option.code));
        }
    }

    const onChangeWard = (values: string, option: any) => {
        if (values) {
            setWardCode(option.code);
        }
    }

    const onClearForm = () => {
        form.resetFields();
        onCancel();
    }

    return (
        <Modal
            className='add-new-address-modal'
            open={visible}
            zIndex={999999999}
            closeIcon={null}
            title='Địa Chỉ Mới'
            centered
            onCancel={onCancel}
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
                    <Item name='city' rules={[{ required: true, message: '' }]}>
                        <Select
                            placeholder='Tỉnh/Thành Phố'
                            options={cityOptions}
                            dropdownStyle={{ zIndex: 999999999 }}
                            onChange={onChangeCity}
                        />
                    </Item>
                    <Item name='provine' rules={[{ required: true, message: '' }]}>
                        <Select
                            placeholder='Quận/Huyện'
                            disabled={!isChangedCity}
                            options={districtOptions}
                            dropdownStyle={{ zIndex: 999999999 }}
                            onChange={onChangeDistrict}
                        />
                    </Item>
                    <Item name='ward' rules={[{ required: true, message: '' }]}>
                        <Select
                            placeholder='Phường/Xã'
                            disabled={!isChangedDistrict}
                            dropdownStyle={{ zIndex: 999999999 }}
                            options={wardOptions}
                            onChange={onChangeWard}
                        />
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

const mapStateToProps = (state: RootState) => {
    return {
        listCity: state?.shippingInfoReducer?.listCity,
        listDistrict: state?.shippingInfoReducer?.listDistrict,
        listWard: state?.shippingInfoReducer?.listWard,
    };
};

export default connect(mapStateToProps)(AddNewShippingInfoModal);