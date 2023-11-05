import { RootState } from '@/redux';
import { connect } from 'react-redux';
import React, { useEffect, useState, createRef, useMemo } from 'react';
import { CartInfoInterface } from '@/redux/reducers/cart/interfaces';
import { ShopOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, notification } from 'antd';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { addMoreProductToCart, deleteManyProductInCart, deleteProductInCart, listProductInCart, saveProductToOrderInfo } from '@/redux/actions/cartAction';
import { useAppDispatch } from '@/redux/hooks';
import DeleteModal from './components/DeleteModal';
import { useRouter } from 'next/router';
import { GrFormClose } from "react-icons/gr";

const baseUrl = process.env.BASE_URL;

interface CartPagePropsInterface {
    cartInfo: CartInfoInterface[] | null | undefined;
    deleteCartState: string | null | undefined;
    addMoreProductToCartStatus: boolean | undefined;
}

interface deleteProductInfoType {
    id: string;
    productName: string;
    group1?: string;
    group2?: string;
    index: number;
    cartId: string;
}

const CartPage = (props: CartPagePropsInterface) => {
    const router = useRouter();
    const [api, contextHolder] = notification.useNotification();

    const { cartInfo, deleteCartState, addMoreProductToCartStatus } = props;

    const [cartInfoData, setCartInfoData] = useState<CartInfoInterface[]>([]);
    const [listCheckProductRef, setListCheckProductionRef] = useState<React.RefObject<HTMLInputElement>[]>([]);
    const [isSelectedProductList, setIsSelectedProductList] = useState<boolean[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);

    const [cartInfoLength, setCartInfoLength] = useState<number>(0);
    const [listAmount, setListAmount] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    const [deleteProductInfo, setDeleteProductInfo] = useState<deleteProductInfoType>();
    const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
    const [inStorage, setInStorage] = useState<number[]>([]);

    useMemo(() => {
        if (addMoreProductToCartStatus) {
            dispatch(listProductInCart())
        }
    }, [addMoreProductToCartStatus])

    useEffect(() => {
        if (cartInfo) {
            setCartInfoData(cartInfo);
            let cnt = 0;
            const listAmTmp: number[] = [];
            const listStorageTmp: number[] = [];
            cartInfo.forEach(item => {
                item.product.forEach(prod => {
                    cnt += 1;
                    listAmTmp.push(prod.amount);
                    listStorageTmp.push(prod.storage);
                })
            });
            setListAmount(listAmTmp);
            setInStorage(listStorageTmp);

            const tmp: React.RefObject<HTMLInputElement>[] = Array.from({ length: cnt }, () => createRef());;
            setListCheckProductionRef(tmp);

            const a: boolean[] = Array.from({ length: cnt }, () => false);
            setIsSelectedProductList(a);

            setCartInfoLength(cnt);
        }
    }, [JSON.stringify(cartInfo)]);

    useMemo(() => {
        if (deleteCartState === 'success') {
            dispatch(listProductInCart());
        }
    }, [deleteCartState]);

    const getProductIndexInList = (cartIdx: number, productIdx: number) => {
        let cnt = 0;

        if (cartInfoData) {
            for (let i = 0; i < cartInfoData.length; i++) {
                if (i > cartIdx) break;
                const item = cartInfoData[i];

                for (let j = 0; j < item.product.length; j++) {
                    if (i === cartIdx && j === productIdx) break;
                    cnt += 1;
                }
            }
        }

        return cnt;
    }

    const countSelectedProduct = (isSelectedProductList: boolean[]) => {
        const cnt = isSelectedProductList.reduce((count, currentValue) => {
            if (currentValue === true) {
                return count + 1;
            }
            return count;
        }, 0);

        return cnt
    }

    useEffect(() => {
        getTotalPrice();
    }, [isSelectedProductList])

    const getTotalPrice = () => {
        let cnt = 0;
        let tmp = 0;
        if (cartInfoData) {
            for (let i = 0; i < cartInfoData.length; i++) {
                const item = cartInfoData[i];

                for (let j = 0; j < item.product.length; j++) {
                    if (isSelectedProductList[cnt]) tmp += item.product[j].price * item.product[j].amount;
                    cnt += 1;
                }
            }
        }

        setTotalPrice(tmp);

    }

    const convertNumberToMoney = (n: number) => {
        return n.toLocaleString('vi-VN');
    }

    const onCheckProduct = (cartIdx: number, productIdx: number) => {
        const refIdx = getProductIndexInList(cartIdx, productIdx);
        const tmp = isSelectedProductList;
        tmp[refIdx] = !tmp[refIdx];

        const cnt = tmp.reduce((count, currentValue) => {
            if (currentValue === true) {
                return count + 1;
            }
            return count;
        }, 0);

        if (cnt === tmp.length) setIsSelectedAll(true);
        else setIsSelectedAll(false);

        setIsSelectedProductList(JSON.parse(JSON.stringify(tmp)))
    }

    const onCheckSelectAll = () => {
        const tmp = Array.from({ length: cartInfoLength }, () => !isSelectedAll);
        setIsSelectedProductList(JSON.parse(JSON.stringify(tmp)));
        setIsSelectedAll(!isSelectedAll);
    }

    const plusProduct = (
        prodId: string,
        typeId: string,
        amount: number,
        idx: number,
        productId: string,
        productName: string,
        productGroup1: string | undefined,
        productGroup2: string | undefined,
        cartId: string,
    ) => {
        if (listAmount[idx] + amount === 0) {
            setDeleteProductInfo({
                id: productId,
                productName: productName,
                group1: productGroup1,
                group2: productGroup2,
                index: idx,
                cartId,
            });
            setDeleteModalVisible(true);
        } else if (listAmount[idx] + amount > inStorage[idx]) {
            api['error']({
                message: 'Vượt quá số lượng có trong kho',
            });
        } else {
            const payload = {
                product: prodId,
                type: typeId,
                amount: amount,
            }
            dispatch(addMoreProductToCart(payload));
            listAmount[idx] = listAmount[idx] + amount;

            setListAmount(JSON.parse(JSON.stringify(listAmount)));
        }
    }

    const deleteProduct = (
        productId: string,
        productName: string,
        productGroup1: string | undefined,
        productGroup2: string | undefined,
        index: number,
        cartId: string,
    ) => {
        setDeleteProductInfo({
            id: productId,
            productName: productName,
            group1: productGroup1,
            group2: productGroup2,
            index,
            cartId,
        });
        setDeleteModalVisible(true);
    }

    const onOkDelete = () => {
        if (deleteProductInfo?.id) {
            dispatch(deleteProductInCart(deleteProductInfo?.cartId));
            listAmount.splice(deleteProductInfo.index, 1);

            setListAmount(JSON.parse(JSON.stringify(listAmount)));
        }
        setDeleteProductInfo(undefined);
        setDeleteModalVisible(false);
    }

    const onCancelDelete = () => {
        setDeleteModalVisible(false);
    }

    const multiDelete = () => {
        const tmp: string[] = [];
        let cnt = 0;

        if (cartInfoData) {
            for (let i = 0; i < cartInfoData.length; i++) {
                const item = cartInfoData[i];

                for (let j = 0; j < item.product.length; j++) {
                    const prod = item.product[j];
                    if (isSelectedProductList[cnt]) {
                        tmp.push(prod.cartId);
                    }
                    cnt += 1;
                }
            }
        }

        dispatch(deleteManyProductInCart(tmp));
    }

    const onClickMakeOrder = () => {
        const tmp: CartInfoInterface[] = [];
        let cnt = 0;
        let cartLen = 0;
        let prevCart = 0;
        if (cartInfoData) {
            for (let i = 0; i < cartInfoData.length; i++) {
                const item = cartInfoData[i];

                for (let j = 0; j < item.product.length; j++) {
                    const prod = item.product[j];
                    if (isSelectedProductList[cnt]) {
                        if (!cartLen || prevCart != i) {
                            tmp[cartLen] = { ...item, product: [] };
                            cartLen += 1;
                            prevCart = i;
                        }
                        tmp[cartLen - 1].product.push(prod);
                    }
                    cnt += 1;
                }
            }
        }

        if (cartLen) {
            dispatch(saveProductToOrderInfo(tmp));
            router.push('/order');
        }
    }

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: 'black',
                    borderRadius: 2,
                },
            }}
        >
            {contextHolder}
            <div className='cart-page-container'>
                <div className='cart-header-row'>
                    <div className='product-row'>
                        <div className='product-cell product-name-cell'>
                            <input
                                id="selectedAll"
                                type="checkbox"
                                checked={isSelectedAll}
                                onChange={onCheckSelectAll}
                            />
                            <label htmlFor="selectedAll"> Sản Phẩm</label>
                        </div>
                        <div></div>
                        <div className='product-cell'>Đơn Giá</div>
                        <div className='product-cell'>Số Lượng</div>
                        <div className='product-cell'>Thành Tiền</div>
                        <div className='product-cell'>Thao Tác</div>
                    </div>
                </div>
                {
                    cartInfoData &&
                    <div className='bfDyQAFRE8'>
                        {
                            cartInfoData.map((item, idx) => {
                                const { name, address, city, country } = item.warehouse;
                                return (
                                    <div key={`cart-container-${idx}`} className='cart-container'>
                                        <div className='warehouse-title'><ShopOutlined style={{ marginRight: 5 }} />{name} - {`${address}, ${city}, ${country}`}</div>
                                        <div className='product-list-body'>
                                            {
                                                item.product.map((product, prodIdx) => {
                                                    return (
                                                        <div key={`product-in-cart-${prodIdx}`} className='product-row product-row-mobile'>
                                                            <div className='product-cell product-name-cell product-name-mobile'>
                                                                <input
                                                                    className='check-product'
                                                                    id={`checkedProduct${getProductIndexInList(idx, prodIdx)}`}
                                                                    type="checkbox"
                                                                    checked={isSelectedProductList[getProductIndexInList(idx, prodIdx)]}
                                                                    onChange={() => { onCheckProduct(idx, prodIdx) }}
                                                                    ref={listCheckProductRef[getProductIndexInList(idx, prodIdx)]}
                                                                />
                                                                <div className='prod-name-and-img' onClick={() => { router.push(`/product/${product.productId}`) }}>
                                                                    <img src={`${baseUrl}image/${product?.image?.[0]}`} className='product-image-title' />
                                                                    <span className='product-name'>{product.name}</span>
                                                                </div>
                                                            </div>
                                                            <div className='product-cell ow4CSIpCAA'>
                                                                {product.group1}
                                                                {product.group2 ? ` - ${product.group2}` : ''}
                                                            </div>
                                                            <div className='product-cell ow4CSIpCAA'>
                                                                <div className='price-div'>{convertNumberToMoney(product.price)}<div className='price-unit'>đ</div></div>
                                                            </div>
                                                            <div className='product-cell ow4CSIpCAA'>
                                                                <div className='product-amount'>
                                                                    <div
                                                                        className='product-amount-deadd-button'
                                                                        onClick={() => {
                                                                            plusProduct(
                                                                                product.productId,
                                                                                product.typeId,
                                                                                -1,
                                                                                getProductIndexInList(idx, prodIdx),
                                                                                product.productId,
                                                                                product.name,
                                                                                product.group1,
                                                                                product.group2,
                                                                                product.cartId,
                                                                            )
                                                                        }}
                                                                    >
                                                                        <FiMinus />
                                                                    </div>
                                                                    <div className='product-amount-number'>
                                                                        {listAmount[getProductIndexInList(idx, prodIdx)]}
                                                                    </div>
                                                                    <div
                                                                        className='product-amount-deadd-button'
                                                                        onClick={() => {
                                                                            plusProduct(
                                                                                product.productId,
                                                                                product.typeId,
                                                                                1,
                                                                                getProductIndexInList(idx, prodIdx),
                                                                                product.productId,
                                                                                product.name,
                                                                                product.group1,
                                                                                product.group2,
                                                                                product.cartId,
                                                                            )
                                                                        }}
                                                                    >
                                                                        <FiPlus />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='product-cell ow4CSIpCAA'><div className='price-div'>{convertNumberToMoney(product.price * product.amount)}<div className='price-unit'>đ</div></div></div>
                                                            <div className='product-cell ow4CSIpCAA'>
                                                                <a
                                                                    className='delete-action'
                                                                    onClick={() => {
                                                                        deleteProduct(
                                                                            product.productId,
                                                                            product.name,
                                                                            product.group1,
                                                                            product.group2,
                                                                            getProductIndexInList(idx, prodIdx),
                                                                            product.cartId,
                                                                        )
                                                                    }}
                                                                >
                                                                    Xóa
                                                                </a>
                                                            </div>
                                                            <div className='product-details-mobile'>
                                                                <input
                                                                    className='check-product'
                                                                    id={`checkedProduct${getProductIndexInList(idx, prodIdx)}`}
                                                                    type="checkbox"
                                                                    checked={isSelectedProductList[getProductIndexInList(idx, prodIdx)]}
                                                                    onChange={() => { onCheckProduct(idx, prodIdx) }}
                                                                    ref={listCheckProductRef[getProductIndexInList(idx, prodIdx)]}
                                                                />
                                                                <div>
                                                                    <img src={`${baseUrl}image/${product?.image?.[0]}`} className='product-image-title' />
                                                                </div>
                                                                <div className='product-info-mobile'>
                                                                    <div className='product-name-mobile'>
                                                                        <span>{product.name}</span>
                                                                    </div>
                                                                    <div>
                                                                        {product.group1}
                                                                        {product.group2 ? ` - ${product.group2}` : ''}
                                                                    </div>
                                                                    <div className='price-div'>{convertNumberToMoney(product.price)}<div className='price-unit'>đ</div></div>
                                                                    <div className='product-amount'>
                                                                        <div
                                                                            className='product-amount-deadd-button'
                                                                            onClick={() => {
                                                                                plusProduct(
                                                                                    product.productId,
                                                                                    product.typeId,
                                                                                    -1,
                                                                                    getProductIndexInList(idx, prodIdx),
                                                                                    product.productId,
                                                                                    product.name,
                                                                                    product.group1,
                                                                                    product.group2,
                                                                                    product.cartId,
                                                                                )
                                                                            }}
                                                                        >
                                                                            <FiMinus />
                                                                        </div>
                                                                        <div className='product-amount-number'>
                                                                            {listAmount[getProductIndexInList(idx, prodIdx)]}
                                                                        </div>
                                                                        <div
                                                                            className='product-amount-deadd-button'
                                                                            onClick={() => {
                                                                                plusProduct(
                                                                                    product.productId,
                                                                                    product.typeId,
                                                                                    1,
                                                                                    getProductIndexInList(idx, prodIdx),
                                                                                    product.productId,
                                                                                    product.name,
                                                                                    product.group1,
                                                                                    product.group2,
                                                                                    product.cartId,
                                                                                )
                                                                            }}
                                                                        >
                                                                            <FiPlus />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='uiPYVL67nA'>
                                                                <GrFormClose onClick={() => {
                                                                    deleteProduct(
                                                                        product.productId,
                                                                        product.name,
                                                                        product.group1,
                                                                        product.group2,
                                                                        getProductIndexInList(idx, prodIdx),
                                                                        product.cartId,
                                                                    )
                                                                }
                                                                }
                                                                />
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
                <div className='cart-checkout'>
                    <div className='left-content'>
                        <div className='selected-all-container'>
                            <input id="selectedAll" type="checkbox" checked={isSelectedAll} onChange={onCheckSelectAll} />
                            <label htmlFor="selectedAll" className='UwnNNGs8A6'>Tất Cả</label>
                        </div>
                        <div className='delete-action-container'>
                            <a
                                className='delete-action'
                                onClick={multiDelete}
                            >
                                Xóa
                            </a>
                        </div>
                    </div>
                    <div className='right-content-cart-checkout'>
                        <div className='total-price-div'>
                            Tổng Giá <span className='wUYXFwV2cq'>({countSelectedProduct(isSelectedProductList)} Sản Phẩm)</span>:
                            <b className='price-text'>{convertNumberToMoney(totalPrice)}<div className='price-unit'>đ</div></b>
                        </div>
                        <Button className='checkout-button' onClick={onClickMakeOrder}>Mua Hàng</Button>
                    </div>
                </div>
                <DeleteModal
                    productInfo={deleteProductInfo}
                    onOk={onOkDelete}
                    onCancel={onCancelDelete}
                    visible={deleteModalVisible}
                />
            </div>
        </ConfigProvider>

    )
}

const mapStateToProps = (state: RootState) => {
    return {
        cartInfo: state?.cartReducer?.listProductsInCart,
        deleteCartState: state?.cartReducer?.deleteCartState,
        addMoreProductToCartStatus: state?.cartReducer?.addMoreProductToCart,
    };
};


export default connect(mapStateToProps)(CartPage);