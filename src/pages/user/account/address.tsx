import AddNewShippingInfoModal from '@/components/AddNewShippingInfoModal';
import { RootState } from '@/redux';
import { getListShippingInfo } from '@/redux/actions/shippingInfo';
import { useAppDispatch } from '@/redux/hooks';
import { ShippingInfoInterface } from '@/redux/reducers/shippingInfo/interfaces';
import { Button, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { connect } from 'react-redux';

interface AddressPageType {
    shippingInfoList: ShippingInfoInterface[] | undefined,
    addNewStatus: string | undefined,
    isFetchingAdd: boolean | undefined,
}

const AddressPage = (props: AddressPageType) => {
    const { shippingInfoList, isFetchingAdd, addNewStatus } = props;

    const [addNewModalVisible, setAddNewModalVisible] = useState<boolean>(false);
    const openAddNewModal = () => setAddNewModalVisible(true);

    const closeAddNewModal = () => setAddNewModalVisible(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isFetchingAdd && addNewStatus === 'success') {
            dispatch(getListShippingInfo());
        }
    }, [isFetchingAdd, addNewStatus]);

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
                <div className='av1tBrHjts fURjFU3uWX'>
                    <b>Địa Chỉ Của Tôi</b>
                    <Button type='primary' className='cqerDkKjY4' onClick={openAddNewModal}>
                        <div className='X4n0Bmop3H'>
                            <BsPlusLg style={{ marginRight: 5 }} />Thêm Địa Chỉ Mới
                        </div>
                    </Button>
                </div>
                <div>
                    <div>
                        {
                            shippingInfoList?.map((address, index) => (
                                <div key={index} className='hd5J3ctl1r'>
                                    <div className='blYGQciNev'>
                                        <div>
                                            <div className='HAhjsDFKTh'>
                                                <span>{address.name}</span>
                                            </div>
                                            <div className='b7oniqAKaH'>
                                                <span>{`${address.address}, ${address.city}, ${address.country}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='qYKVGq7vc6'>
                                        <a className='hCvS66P2VE'>Cập Nhật</a>
                                        {
                                            address.default ?
                                                <div className='nq6AR8yAWr'>
                                                    Mặc định
                                                </div>
                                                :
                                                <div className='La4oa2PCxG'>
                                                    Đặt Làm Mặc Định
                                                </div>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <AddNewShippingInfoModal
                    visible={addNewModalVisible}
                    onCancel={closeAddNewModal}
                    canCancel={true}
                />
            </div>
        </ConfigProvider>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        shippingInfoList: state?.shippingInfoReducer?.shippingInfoList,
        addNewStatus: state?.shippingInfoReducer?.addNewStatus,
        isFetchingAdd: state?.shippingInfoReducer?.isFetchingAdd,
    };
};

export default connect(mapStateToProps)(AddressPage);