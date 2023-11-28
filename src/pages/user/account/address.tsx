import AddNewShippingInfoModal from '@/components/AddNewShippingInfoModal';
import { RootState } from '@/redux';
import { deleteShippingInfo, getListShippingInfo, updateShippingInfo } from '@/redux/actions/shippingInfo';
import { useAppDispatch } from '@/redux/hooks';
import { ShippingInfoInterface } from '@/redux/reducers/shippingInfo/interfaces';
import { generateKey } from '@/utils/lib';
import { Button, ConfigProvider, Divider, Modal, notification } from 'antd';
import React, { useState, useEffect } from 'react';
import { BsPlusLg } from 'react-icons/bs';
import { connect } from 'react-redux';

interface AddressPageType {
    shippingInfoList: ShippingInfoInterface[] | undefined,
    addNewStatus: string | undefined,
    isFetchingAdd: boolean | undefined,
    updateStatus: string | undefined,
    deleteStatus: string | undefined,
}

const AddressPage = (props: AddressPageType) => {
    const { shippingInfoList, isFetchingAdd, addNewStatus, updateStatus, deleteStatus } = props;

    const [addNewModalVisible, setAddNewModalVisible] = useState<boolean>(false);
    const [updatingAddress, setUpdatingAddress] = useState<ShippingInfoInterface | undefined>(undefined);
    const [onSubmitDelete, setOnSubmitDelete] = useState<boolean>(false);

    const openAddNewModal = () => setAddNewModalVisible(true);

    const closeAddNewModal = () => setAddNewModalVisible(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isFetchingAdd && addNewStatus === 'success') {
            dispatch(getListShippingInfo());
        }
    }, [isFetchingAdd, addNewStatus]);

    const onClickUpdate = (address: ShippingInfoInterface) => {
        setUpdatingAddress(address);
        openAddNewModal();
    }

    const [deleteId, setDeleteId] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (!isFetchingAdd && (updateStatus === 'success' || updateStatus === 'fail')) {
            setUpdatingAddress(undefined);
            dispatch(getListShippingInfo());
        }
    }, [isFetchingAdd, updateStatus]);

    useEffect(() => {
        if (!isFetchingAdd && onSubmitDelete && (deleteStatus === 'success' || deleteStatus === 'fail')) {
            setOnSubmitDelete(false);
            setDeleteId(undefined);
            if (deleteStatus === 'success') {
                notification.success({
                    message: 'Xóa Thành Công!',
                    style: { top: 140 },
                    duration: 2,
                });
                dispatch(getListShippingInfo());
            } else {
                notification.error({
                    message: 'Có lỗi xảy ra, xin vui lòng thử lại sau!',
                    style: { top: 140 },
                    duration: 2,
                })
            }
        }
    }, [isFetchingAdd, onSubmitDelete, deleteStatus]);

    const onCancelModal = () => {
        setUpdatingAddress(undefined);
        closeAddNewModal();
    }

    const onClickDelete = (id: string) => {
        setOnSubmitDelete(true);
        dispatch(deleteShippingInfo(id));
    }

    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

    const showConfirmModal = (id: string) => {
        setDeleteId(id);
        setIsModalConfirmOpen(true);
    };

    const handleConfirmOk = () => {
        onClickDelete(deleteId!);
        setIsModalConfirmOpen(false);
    };

    const handleConfirmCancel = () => {
        setIsModalConfirmOpen(false);
    };

    const changeDefaultShippingInfo = (address: ShippingInfoInterface) => {
        dispatch(updateShippingInfo(address._id, { ...address, main: true }))
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
                                <div key={`Hg97sEvknz-${index}`} className='hd5J3ctl1r'>
                                    <div className='blYGQciNev'>
                                        <div>
                                            <div className='HAhjsDFKTh'>
                                                <span>{address.name}<Divider type='vertical' /><span>{address.phone_number}</span></span>
                                            </div>
                                            <div className='b7oniqAKaH'>
                                                <span>{`${address.address}, ${address.ward}, ${address.provine}, ${address.city}, ${address.country}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='qYKVGq7vc6'>
                                        <a className='VsdiLpv53o' onClick={() => { showConfirmModal(address._id) }}>Xóa</a>
                                        <a className='hCvS66P2VE' onClick={() => { onClickUpdate(address) }}>Cập Nhật</a>
                                        {
                                            address.default ?
                                                <div className='nq6AR8yAWr'>
                                                    Mặc định
                                                </div>
                                                :
                                                <div className='La4oa2PCxG' onClick={() => { changeDefaultShippingInfo(address) }}>
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
                    onCancel={onCancelModal}
                    canCancel={true}
                    initialValues={updatingAddress}
                />
                <Modal
                    style={{ top: 250 }}
                    title="Basic Modal"
                    open={isModalConfirmOpen}
                    onOk={handleConfirmOk}
                    onCancel={handleConfirmCancel}
                >
                    Are You Sure To Delete?
                </Modal>
            </div>
        </ConfigProvider>
    )
}
const mapStateToProps = (state: RootState) => {
    return {
        shippingInfoList: state?.shippingInfoReducer?.shippingInfoList,
        addNewStatus: state?.shippingInfoReducer?.addNewStatus,
        isFetchingAdd: state?.shippingInfoReducer?.isFetchingAdd,
        updateStatus: state?.shippingInfoReducer?.updateStatus,
        deleteStatus: state?.shippingInfoReducer?.deleteStatus,
    };
};

export default connect(mapStateToProps)(AddressPage);