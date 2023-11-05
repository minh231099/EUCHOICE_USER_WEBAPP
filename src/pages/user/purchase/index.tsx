import { RootState } from '@/redux';
import { cancelOrder, checkOrderDone, getListOrder } from '@/redux/actions/orderAction';
import { useAppDispatch } from '@/redux/hooks';
import { OrderType } from '@/redux/reducers/order/interfaces';
import { compareTwoDate, convertNumberToMoney, convertToDate } from '@/utils/lib';
import { ShopOutlined } from '@ant-design/icons';
import { Button, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { useRouter } from 'next/router';
import moment from 'moment';
import localStorageVariables from '@/constants/storage_variable';

const {
    purchaseHisScroll
} = localStorageVariables;

interface PurchaseHistoryPageType {
    listOrder: OrderType[] | undefined;
    changeOrderStatus: boolean | undefined;
}

const baseUrl = process.env.BASE_URL;

const navItems = [
    {
        name: 'Tất Cả',
        id: 'all',
    },
    {
        name: 'Hệ Thống Tiếp Nhận',
        id: 'new',
    },
    {
        name: 'Vận Chuyển',
        id: 'shipping',
    },
    {
        name: 'Hoàn Thành',
        id: 'done',
    },
    {
        name: 'Đã Hủy',
        id: 'cancel',
    },
]

const PurchaseHistoryPage = (props: PurchaseHistoryPageType) => {
    const { listOrder, changeOrderStatus } = props;

    const router = useRouter();
    const { type } = router.query;

    const [listOrderData, setListOrderData] = useState<OrderType[]>([]);

    useEffect(() => {
        if (listOrder) {
            setListOrderData(listOrder);
        }
    }, [JSON.stringify(listOrder)]);

    useEffect(() => {
        if (listOrderData.length) {
            const tmp = localStorage.getItem(purchaseHisScroll);
            document.documentElement.scrollTop = document.body.scrollTop = parseInt(tmp ? tmp : '0');
        }
    }, [JSON.stringify(listOrderData)])

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (changeOrderStatus) {
            if (typeof type === 'string' || !type)
                dispatch(getListOrder(type ? type : ''))
        }
    }, [changeOrderStatus]);

    useEffect(() => {
        if (typeof type === 'string' || !type)
            dispatch(getListOrder(type ? type : ''));
    }, [type]);

    const setCurrentTab = (type: string) => {
        localStorage.setItem(purchaseHisScroll, '0');
        router.push({
            pathname: '/user/purchase',
            query: { type },
        });
    }

    const isCurrentTab = (type: string | string[] | undefined, navItemId: string) => {
        if (typeof type === 'string') return (!type && navItemId === 'all') || (type === navItemId);
        return navItemId === 'all';
    }

    const onCheckDoneOrder = (id: string) => {
        dispatch(checkOrderDone(id));
    }

    const onCheckCancelOrder = (id: string) => {
        dispatch(cancelOrder(id));
    }

    const onGoToDetailsOrder = (id: string) => {
        const tmp = document.documentElement.scrollTop || document.body.scrollTop;
        localStorage.setItem(purchaseHisScroll, tmp.toString());
        router.push(`/user/purchase/${id}`)
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
                <div className='ae52a2fIEK'>
                    {
                        navItems.map((navItem, index) => (
                            <div
                                key={index}
                                className={`j5L55xGKBr ${isCurrentTab(type, navItem.id) ? 'KQeVWhP97F' : ''}`}
                                onClick={() => { setCurrentTab(navItem.id) }}
                            >
                                {navItem.name}
                            </div>
                        ))
                    }
                </div>
                <div className='hlxPgnEBr1'>
                    {
                        listOrderData?.map((order, index) => {
                            const { warehouse, cart } = order;
                            return (
                                <LazyLoad key={index} height={200} offset={[-100, 0]}>
                                    <div className='IPxqDV0w15'>
                                        <div className='n7vWrAkZl9'>
                                            <ShopOutlined style={{ marginRight: 5 }} /><span>{`${warehouse.name} - ${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</span>
                                        </div>
                                        <div className='T9OuzWhzc2' onClick={() => { onGoToDetailsOrder(order._id) }}>
                                            {
                                                cart.map((item, idx) => {
                                                    const { product, type, amount } = item;
                                                    return <div key={`bPYYC5KVFy${idx}`} className='bPYYC5KVFy'>
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
                                        <div className='FnrTmZmU5d' style={{ background: order.status === 'cancel' ? '#FA8071' : '#e2eeee' }}>
                                            <div className='Z0PsouoV4C'>
                                                {
                                                    order.status !== 'cancel' &&
                                                    order.status !== 'done' &&
                                                    <div>
                                                        <span className='iDhMoasO3r'>
                                                            Ngày giao hàng dự kiến: {convertToDate(order.estReceived)}
                                                        </span>
                                                    </div>
                                                }
                                                <span className='mAEuftJaKn'>
                                                    Thành Tiền: <span className='YgtfbkDOcI'>{convertNumberToMoney(order.price)}</span><span className='price-unit'>đ</span>
                                                </span>
                                            </div>
                                            <div className='re2hADo8vE'>
                                                {
                                                    order.status !== 'new' &&
                                                    order.status !== 'cancel' &&
                                                    order.status !== 'done' &&
                                                    compareTwoDate(moment().toString(), order.estReceived) >= 0 &&
                                                    <div className='CMylhjMf3a'>
                                                        <Button type='primary' className='E9LbSyeF1K' onClick={() => { onCheckDoneOrder(order._id) }}>Đã Nhận Hàng</Button>
                                                    </div>
                                                }
                                                {
                                                    order.status !== 'done' && order.status !== 'cancel' &&
                                                    <div className='CMylhjMf3a'>
                                                        <Button className='E9LbSyeF1K' onClick={() => { onCheckCancelOrder(order._id) }}>Hủy</Button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </LazyLoad>)
                        })
                    }
                    {
                        !listOrderData.length &&
                        <EmptyOrder
                            type={typeof type === 'string' ? type : 'all'}
                        />
                    }
                </div>
            </div>
        </ConfigProvider>

    )
}

const mapStateToProps = (state: RootState) => {
    return {
        listOrder: state?.orderReducer?.listOrder,
        changeOrderStatus: state?.orderReducer?.changeOrderStatus,
    };
};

export default connect(mapStateToProps)(PurchaseHistoryPage);

interface EmptyOrderProps {
    type: string;
}

const EmptyOrder = (props: EmptyOrderProps) => {
    const { type } = props;
    const emptyTitle = {
        all: 'Bạn chưa có bất kỳ đơn hàng nào',
        new: 'Hệ thống hiện chưa tiếp nhận bất kỳ đơn hàng nào',
        shipping: 'Không có đơn hàng nào đang được vận chuyển đến bạn',
        done: 'Hiện chưa có đơn hàng nào hoàn thành',
        cancel: 'Hiện chưa có đơn hàng nào bị hủy',
    }
    const message: string = emptyTitle.hasOwnProperty(type) ? emptyTitle[type as keyof typeof emptyTitle] : '';
    return (
        <div className='il9lzie8c5'>
            <img src='/empty_box.png' width={125} height={125} />
            <div className='H3Jo34inFl'>
                <span>{message}</span>
            </div>
        </div>
    )
}