import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { getProductInfo } from '@/redux/actions/productAction';
import { useAppDispatch } from '@/redux/hooks';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import RenderProductPath, { PathArrayElmInterface } from '@/components/RenderProductPath';
import { RootState } from '@/redux';
import { ProductInterface, ProductType } from '@/redux/reducers/product/interfaces';
import ProductImageSlider from '@/components/ProductImageSlider';
import { BsCartPlus } from 'react-icons/bs';
import { generateKey, isLogged } from '@/utils/lib';
import { AddToCartPayload, addToCart, addToCartDone, buyNow, listProductInCart, buyNowDone } from '@/redux/actions/cartAction';
import CustomNotification from '@/components/CustomNotification';

const baseUrl = process.env.BASE_URL;

interface ProductPagePropsInf {
    productInfo: ProductInterface | null | undefined;
    addToCartState: boolean | null | undefined;
    buyNowState: boolean | undefined;
}

const ProductPage = (props: ProductPagePropsInf) => {

    const { productInfo, addToCartState, buyNowState } = props;

    const router = useRouter();
    const { id } = router.query;

    const [prodPath, setProdPath] = useState<PathArrayElmInterface[]>([]);
    const [imgList, setImgList] = useState<string[]>([]);
    const [productPrice, setProductPrice] = useState<string | undefined>();
    const [totalSold, setTotalSold] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(1);
    const [buyQuantity, setBuyQuantitty] = useState<number>(1);
    const [isShowDes, setIsShowDes] = useState<boolean>(false);
    const [isShowPolicy, setIsShowPolicy] = useState<boolean>(false);

    const [typeSelected, setTypeSelected] = useState<string | undefined>();
    const [group1ListOption, setGroup1ListOption] = useState<(string | undefined)[]>([]);
    const [group2ListOption, setGroup2ListOption] = useState<(string | undefined)[]>([]);
    const [group1, setGroup1] = useState<string | undefined>();
    const [group2, setGroup2] = useState<string | undefined>();
    const [group1Selected, setGroup1Selected] = useState<string | undefined>();
    const [group2Selected, setGroup2Selected] = useState<string | undefined>();

    const [maxPrice, setMaxPrice] = useState<string>();
    const [minPrice, setMinPrice] = useState<string>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id && typeof id === 'string') {
            dispatch(getProductInfo(id));
        }
    }, [id]);

    useEffect(() => {
        if (buyNowState) {
            router.push('/order');
            dispatch(buyNowDone());
        }
    }, [buyNowState]);

    const init = (productInfo: ProductInterface) => {
        const { name, category } = productInfo;
        const cateName = category.name;

        const tmp: PathArrayElmInterface[] = [
            {
                name: 'Home',
                clickable: true,
                onClick: () => {
                    router.push('/');
                }
            },
            {
                name: cateName,
                clickable: true,
                onClick: () => {
                    router.push(`/category/${cateName}`);
                }
            },
            {
                name: name,
            }
        ];

        setProdPath(tmp);

        if (productInfo.image && productInfo.image.length > 0) {
            const images: string[] = productInfo.image.map(imgName => baseUrl + `image/${imgName}`);
            setImgList(images);
        }

        setGroup1(productInfo.group1);
        setGroup2(productInfo.group2);

        if (productInfo.type) {
            convertTypeToClass(productInfo.type);
            if (productInfo.type.length > 1) {
                setGroup1ListOption(productInfo.type.map(type => type.group1).filter((value, index, self) => {
                    return self.indexOf(value) === index;
                }));
                setGroup2ListOption(productInfo.type.map(type => type.group2).filter((value, index, self) => {
                    return self.indexOf(value) === index;
                }));
            } else {
                setGroup1ListOption([]);
                setGroup2ListOption([]);
            }
        }
    }

    const convertTypeToClass = (productType: ProductType[]) => {
        if (productType.length > 1) {
            setProductPrice(undefined);
            setMaxPrice(productType.reduce((maxProduct, product) => {
                if (!maxProduct || product.price > maxProduct.price)
                    return product;
                return maxProduct;
            }).price.toLocaleString('vi-VN'));
            setMinPrice(productType.reduce((minProduct, product) => {
                if (!minProduct || product.price < minProduct.price)
                    return product;
                return minProduct;
            }).price.toLocaleString('vi-VN'));
        } else {
            setProductPrice(productType[0].price.toLocaleString('vi-VN'));
            setTypeSelected(productType[0]._id);
        }

        let tmp = 0;
        let am = 0;
        productType.forEach((type) => {
            tmp += type.sold;
            am += type.amount;
        });
        setTotalSold(tmp);
        setTotalAmount(am);
    }

    useEffect(() => {
        if (productInfo) {
            init(productInfo);
        }
    }, [productInfo]);

    const onChangeShowDes = () => {
        const animatedDiv = document.getElementById("product-des") as HTMLDivElement;
        if (!isShowDes) {
            animatedDiv.style.display = 'block';
            animatedDiv.className += ' show';
        } else {
            animatedDiv.style.display = 'none';
            animatedDiv.className.replace(" show", "")
        }
        setIsShowDes(!isShowDes);
    }

    const onChangeShowPolicy = () => {
        const animatedDiv = document.getElementById("product-policy") as HTMLDivElement;
        if (!isShowPolicy) {
            animatedDiv.style.display = 'block';
            animatedDiv.className += ' show';
        } else {
            animatedDiv.style.display = 'none';
            animatedDiv.className.replace(" show", "")
        }
        setIsShowPolicy(!isShowPolicy);
    }

    const addToCartClick = () => {
        if (!isLogged()) router.push('/login');
        else {
            if (id && typeof id === 'string' && typeSelected) {
                const payload: AddToCartPayload = {
                    product: id,
                    amount: buyQuantity,
                    type: typeSelected,
                }
                dispatch(addToCart(payload));
            }
        }
    }

    const onSelectGroup1 = (name: string | undefined, idx: number) => {
        const animatedDiv = document.getElementById(`option-group1-${idx}`) as HTMLDivElement;
        const isChecked = animatedDiv.className.includes('option-active');

        if (!isChecked) {
            animatedDiv.className += ' option-active';
            setGroup1Selected(name);
        } else setGroup1Selected(undefined);

        group1ListOption.forEach((_, index) => {
            if (!isChecked && index === idx) return;
            const animatedDiv = document.getElementById(`option-group1-${index}`) as HTMLDivElement;
            animatedDiv.className = animatedDiv.className.replace(' option-active', '');
        });
    }

    const onSelectGroup2 = (name: string | undefined, idx: number) => {
        const animatedDiv = document.getElementById(`option-group2-${idx}`) as HTMLDivElement;
        const isChecked = animatedDiv.className.includes('option-active');

        if (!isChecked) {
            animatedDiv.className += ' option-active';
            setGroup2Selected(name);
        } else setGroup2Selected(undefined);

        group2ListOption.forEach((_, index) => {
            if (!isChecked && index === idx) return;
            const animatedDiv = document.getElementById(`option-group2-${index}`) as HTMLDivElement;
            animatedDiv.className = animatedDiv.className.replace(' option-active', '');
        });
    }

    useEffect(() => {
        if (!group1Selected) {
            if (productInfo?.type) {
                convertTypeToClass(productInfo.type);
            }
            return;
        }

        let tmp: any = [];

        if (group1Selected) tmp = productInfo?.type.filter(type => type.group1 === group1Selected);

        if (group2Selected) tmp = tmp.filter((type: ProductType) => type.group2 === group2Selected);

        if (tmp && tmp.length) {
            if (tmp.length === 1) {
                setProductPrice(tmp[0].price.toLocaleString('vi-VN'));
                setTotalAmount(tmp[0].amount);
                setTypeSelected(tmp[0]._id);
            } else convertTypeToClass(tmp);
        }

    }, [group1Selected, group2Selected]);

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        if (addToCartState) {
            setIsVisible(true);

            dispatch(addToCartDone());
            dispatch(listProductInCart());
        }
    }, [addToCartState]);

    useEffect(() => {
        if (isVisible) {
            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, 2000);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [isVisible]);

    const onClickBuyNow = () => {
        if (!isLogged()) router.push('/login');
        else {
            if (id && typeof id === 'string' && typeSelected) {
                const payload: AddToCartPayload = {
                    product: id,
                    amount: buyQuantity,
                    type: typeSelected,
                    buyNow: true,
                }
                dispatch(buyNow(payload));
            }
        }
    }

    const renderRangePrice = () => {
        if (minPrice != maxPrice)
            return <>{minPrice}< div className='price-unit'>đ</div><div style={{ margin: '0 10px' }}>-</div>{maxPrice}< div className='price-unit'>đ</div></>
        else return <>{minPrice}<div className='price-unit'>đ</div></>
    }

    return (
        <div className='product-details-container'>
            <CustomNotification visible={isVisible} message='Sản phẩm được thêm vào giỏ hàng thành công' />
            <RenderProductPath
                pathArray={prodPath}
            />
            <div className='product-body-container'>
                <div className='product-image-container'>
                    <ProductImageSlider
                        images={imgList}
                    />
                </div>
                <div className='product-information-container'>
                    <h1 className='product-name'>{productInfo?.name}</h1>
                    {/* <div className='product-rating'>
                        <span>Đã bán: {totalSold}</span>
                    </div> */}
                    <div className='product-price'>
                        {
                            productPrice ?
                                <> {productPrice} < div className='price-unit'>đ</div></>
                                :
                                <>{renderRangePrice()}</>
                        }
                    </div>
                    <div className='group-class-container'>
                        {
                            group1 &&
                            <div>
                                <div className='group-container'>
                                    <div className='group-title'>
                                        {group1}:
                                    </div>
                                    <div className='option-container'>
                                        {
                                            group1ListOption.map((option, idx) => (
                                                <div
                                                    key={`jieAmNgpSE-${idx}`}
                                                    className='option-group'
                                                    id={`option-group1-${idx}`}
                                                    onClick={() => { onSelectGroup1(option, idx) }}
                                                >
                                                    {option}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {
                                    group2 &&
                                    <div className='group-container'>
                                        <div className='group-title'>
                                            {group2}:
                                        </div>
                                        <div className='option-container'>
                                            {
                                                group2ListOption.map((option, idx) => (
                                                    <div
                                                        key={`lpWEZ0Z8UJ-${idx}`}
                                                        id={`option-group2-${idx}`}
                                                        className='option-group'
                                                        onClick={() => { onSelectGroup2(option, idx) }}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    <div className='d-flex'>
                        <div className='quantity-change'>
                            <div className='quantity__reduce' onClick={() => {
                                if (buyQuantity > 1) {
                                    setBuyQuantitty(buyQuantity - 1)
                                }
                            }}><a>-</a></div>
                            <input
                                type='number'
                                min={1}
                                max={totalAmount}
                                className='quantiity__control'
                                value={buyQuantity}
                                onChange={(e) => {
                                    const tmp = parseInt(e.target.value, 10)
                                    if (tmp < totalAmount) {
                                        setBuyQuantitty(tmp)
                                    } else {
                                        setBuyQuantitty(totalAmount);
                                    }
                                }}

                            />
                            <div className='quantity__augure' onClick={() => {
                                if (buyQuantity < totalAmount) {
                                    setBuyQuantitty(buyQuantity + 1)
                                }
                            }}><a>+</a></div>
                        </div>
                        <span className='max-amount'>{totalAmount} sản phẩm có sẵn</span>
                    </div>
                    <div className='buy-container d-flex'>
                        <div className="add-to-cart-button" onClick={addToCartClick}>
                            <BsCartPlus className='add-to-cart-icon' />
                            Thêm Vào Giỏ Hàng
                        </div>
                        <div className="buy-now-button" onClick={onClickBuyNow}>
                            Mua Ngay
                        </div>
                    </div>
                    <div className='vertical-divider'></div>

                    <div className='product-more-information'>
                        <div className='product-des-extend' onClick={onChangeShowDes}>
                            <span className='product-more-information-left-content'>Mô tả sản phẩm</span>
                            <span className='product-more-information-right-content'>
                                {
                                    isShowDes ? <UpOutlined /> : <DownOutlined />
                                }
                            </span>
                        </div>
                        <div id="product-des" className='product-des'>
                            {productInfo?.description}
                        </div>
                        <div className='product-more-information-divider'></div>
                        <div className='product-policy-extend' onClick={onChangeShowPolicy}>
                            <span className='product-more-information-left-content'>Vì sao bạn nên chọn EUCHOICE?</span>
                            <span className='product-more-information-right-content'>
                                {
                                    isShowPolicy ? <UpOutlined /> : <DownOutlined />
                                }
                            </span>
                        </div>
                        <div id="product-policy" className='product-policy'>
                            <div className='d-flex product-policy-row'>
                                <img src='/refund.png' className='product-policy-icon' />
                                <div style={{ marginLeft: 10 }}>
                                    <b className="policy-title">ĐỔI MỚI 7 NGÀY MIỄN PHÍ</b><br />
                                    <span>Nếu phát hiện do lỗi nhà sản xuất</span>
                                </div>
                            </div>
                            <div className='d-flex product-policy-row'>
                                <img src='/original.png' className='product-policy-icon' />
                                <div style={{ marginLeft: 10 }}>
                                    <b className="policy-title">HÀNG CHÍNH HÃNG</b><br />
                                    <span>Nói không với hàng nhái, kém chất lượng. Sản phẩm đều có hóa đơn chứng từ</span>
                                </div>
                            </div>
                            <div className='d-flex product-policy-row'>
                                <img src='/free-delivery.png' className='product-policy-icon' />
                                <div style={{ marginLeft: 10 }}>
                                    <b className="policy-title">GIAO HÀNG MIỄN PHÍ</b><br />
                                    <span>Trong nội thành Hà Nội với đơn từ 300.000đ</span>
                                </div>
                            </div>
                        </div>
                        <div className='product-more-information-divider'></div>
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        productInfo: state?.productReducer?.productInfo,
        addToCartState: state?.cartReducer?.addToCart,
        buyNowState: state?.cartReducer?.buyNowState,
    };
};

export default connect(mapStateToProps)(ProductPage);