import StepsCustom from '@/components/StepsCustom';
import { RootState } from '@/redux';
import { getOrderDetails } from '@/redux/actions/orderAction';
import { useAppDispatch } from '@/redux/hooks';
import { OrderType } from '@/redux/reducers/order/interfaces';
import { FileAddOutlined, FileDoneOutlined, FileSearchOutlined, InboxOutlined, SendOutlined } from '@ant-design/icons';
import { ConfigProvider, Steps } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { convertToDate, generateKey } from '@/utils/lib';

import { connect } from 'react-redux';
import { convertNumberToMoney } from '@/utils/lib';

const baseUrl = process.env.BASE_URL;

interface OrderDetailsProps {
    orderDetails: OrderType | undefined;
}

const StatusName = {
    orderSuccess: {
        title: 'Đặt Hàng Thành Công',
        id: 1,
        icon: <FileAddOutlined className='VeG3HWB4e3' />
    },
    new: {
        title: 'Hệ Thống Tiếp Nhận',
        id: 2,
        icon: <FileSearchOutlined className='VeG3HWB4e3' />
    },
    packing: {
        title: 'Đang Đóng Gói',
        id: 3,
        icon: <InboxOutlined className='VeG3HWB4e3' />
    },
    shipping: {
        title: 'Vận Chuyển',
        id: 4,
        icon: <SendOutlined className='VeG3HWB4e3' />
    },
    done: {
        title: 'Hoàn Thành',
        id: 5,
        icon: <FileDoneOutlined className='VeG3HWB4e3' />
    },
    cancel: {
        title: 'Đã Hủy',
        id: undefined,
        icon: undefined,
    },
}


const OrderDetails = (props: OrderDetailsProps) => {
    const { orderDetails } = props;

    const router = useRouter();
    const { id } = router.query;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id && typeof id === 'string') dispatch(getOrderDetails(id));
    }, [id]);

    const stepItems = Object.keys(StatusName).filter(key => StatusName[key as keyof typeof StatusName].id).map(key => {
        const tmp = StatusName[key as keyof typeof StatusName]
        return (
            {
                title: tmp.title,
                icon: tmp.icon,
            }
        )
    });

    const onBackToPushchase = () => {
        router.back();
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
            <div className='Vo975bjGLM'>
                <div className='bZQ0MSNB9b'>
                    <div className='D56h5pa34O' onClick={onBackToPushchase}><AiOutlineArrowLeft /> <span className='EnxLq1AW6F'>Trở Lại</span></div>
                    <div className='qipNcABEC9'>
                        <div>Mã Đơn Hàng: {orderDetails?.orderId} </div>
                        <div className='aYFuJNI42t'>|</div>
                        <div className='cae8QrM1G0' style={{ color: orderDetails?.status === 'cancel' ? '#B80F0A' : '#00B072' }}>
                            {StatusName[orderDetails?.status as keyof typeof StatusName]?.title}
                        </div>
                    </div>
                </div>
                <div className='KOSTPWBdzB'>
                    {
                        orderDetails?.status !== 'cancel' &&
                        <div className='jVDYQ5pVdN'>
                            <StepsCustom
                                items={stepItems}
                                current={StatusName[orderDetails?.status as keyof typeof StatusName]?.id || 0}
                            />
                        </div>
                    }
                    <div className='W3nbPxn2jd'>
                        {
                            orderDetails?.status !== 'cancel' &&
                            <div className='BIHydX44O2'>
                                <div>Dự kiến nhận hàng vào ngày <span className='aeN5QGxSGY'>{convertToDate(orderDetails?.estReceived)}</span></div>
                            </div>
                        }
                    </div>
                    {
                        orderDetails?.status !== 'cancel' &&
                        <div className='estF6RrAJf'>
                            <div className='LtWUFPyQwV'>Địa Chỉ Nhận Hàng</div>
                            <div>
                                <div>{orderDetails?.shippingInfo.name}</div>
                                <div className='CqZNH6DXGw'>
                                    {orderDetails?.shippingInfo.address} - {orderDetails?.shippingInfo.ward}, {orderDetails?.shippingInfo.provine}, {orderDetails?.shippingInfo.city}, {orderDetails?.shippingInfo.country}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className='ToErdTIwng'>
                    <div>
                        {
                            orderDetails?.cart?.map((item, idx) => {
                                const { product, type, amount } = item;
                                return <div key={`SK1oGgKOOG-${idx}`} className='bPYYC5KVFy'>
                                    <div className='NUHjyLzAe9'>
                                        <img src={`${baseUrl}image/${product?.image?.[0]}`} className='kWE27JEQeR' />
                                        <div className='yGtP0MKAVm'>
                                            <div>{product.name}</div>
                                            {
                                                type.group1 &&
                                                <div className='UP7pUHoTPz'>{type.group1}{type.group2 ? ` - ${type.group2}` : ''}</div>
                                            }
                                            <div>x{amount}</div>
                                        </div>
                                    </div>
                                    <div className='pYPfmv2vWO'>{convertNumberToMoney(type.price * amount)}<span className='price-unit'>đ</span></div>
                                </div>
                            })
                        }
                    </div>
                    <div className='dCme0Xe3Mz'>
                        <div className='nMSZsfpWfI'>
                            <div>Thành Tiền:</div>
                            <div className='mAEuftJaKn'>
                                <span className='YgtfbkDOcI'>
                                    {convertNumberToMoney(orderDetails?.price ? orderDetails?.price : 0)}
                                </span>
                                <span className='price-unit'>đ</span>
                            </div>
                        </div>
                        <div className='nMSZsfpWfI'>
                            <div>Phương Thức Thanh Toán:</div>
                            <div>Trả Tiền Khi Nhận Hàng</div>
                        </div>
                    </div>
                </div>
            </div>
        </ConfigProvider>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        orderDetails: state?.orderReducer?.orderDetails,
    };
};

export default connect(mapStateToProps)(OrderDetails);