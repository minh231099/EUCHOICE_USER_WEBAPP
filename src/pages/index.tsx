import { Inter } from 'next/font/google'
import { Button, Carousel, Col, Divider, Row } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { useWindowSize } from 'react-use';
import { API_URLS } from '@/api/apiURL';
import apiCall from '@/helper/apiCall';
import { GiLindenLeaf, GiAlarmClock } from 'react-icons/gi';
import { ProductInterface } from '@/redux/reducers/product/interfaces';
import { useRouter } from 'next/router';
import ProductCardFS from '@/components/ProductCardFS';
import { BannerInterface } from '@/redux/reducers/banner/interfaces';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { FaBullseye } from 'react-icons/fa';
import { generateKey } from '@/utils/lib';
const freeship = '/free-delivery1.png';
const certification = '/policy_3.png';
const support = '/policy_4.png';
const promotion = '/policy_2.png';
const iconCate = '/cup.png';
const baseUrl = process.env.BASE_URL;

export default function Home(props: any) {
  const { width } = useWindowSize();
  let w = width;
  const conditional = [1, 2]
  const router = useRouter();

  const getNumberOfSwiper = (screenWidth: number) => {
    if (screenWidth >= 2999) return 10
    if (screenWidth < 2999 && screenWidth >= 2699) return 9
    if (screenWidth < 2699 && screenWidth >= 2397) return 8
    if (screenWidth < 2397 && screenWidth >= 2096) return 7
    if (screenWidth < 2096 && screenWidth >= 1794) return 6
    if (screenWidth < 1794 && screenWidth >= 1493) return 5
    if (screenWidth < 1493 && screenWidth >= 1280) return 4


    if (screenWidth < 1280 && screenWidth >= 1045) return 5
    if (screenWidth < 1045 && screenWidth >= 745) return 4
    if (screenWidth < 745 && screenWidth >= 556) return 3
    if (screenWidth < 556 && screenWidth >= 367) return 2
    if (screenWidth < 367) return 1
  }

  const onClickProduct = (id: string) => {
    router.push('/product/[id]', `/product/${id}`);
  }

  const onClickProductPage = () => {
    router.push('/product');
  }

  return (
    <div>
      <div className='carousel-home'>
        <Carousel autoplay dotPosition={'bottom'}>
          {props.listBannerTop?.map((item: BannerInterface, index: any) => {
            return <div key={`NBtT6hBhVm-${index}`} className='slider-img-container-home'>
              <img className='slider-img-home' src={`${baseUrl}image/${item?.image}`}></img>
            </div>
          })}
        </Carousel>
      </div>
      <div className='body-home'>
        <div className='hidden-side-nav'>
          <div className='category-menu-side'>
            <h3 className='cate-h-side'>Category</h3>
            <ul>
              {
                props.category?.map((item: any, index: any, category: any) => {
                  if (index + 1 === category.length) {
                    return (
                      <li key={`ScYeP7z4Gl-${index}`} className='last-li'>
                        <div className='category-list-side' onClick={() => { router.push({ pathname: `/category/${item.name}` }) }}>
                          <img src={item?.image ? `${baseUrl}image/${item?.image}` : iconCate}></img>
                          <span>
                            {item.name}
                          </span>
                        </div>
                      </li>
                    )
                  }
                  else {
                    return (
                      <li key={`YGeNPk7MWz-${index}`}>
                        <div className='category-list-side' onClick={() => { router.push({ pathname: `/category/${item.name}` }) }}>
                          <img src={item?.image ? `${baseUrl}image/${item?.image}` : iconCate}></img>
                          <span>
                            {item.name}
                          </span>
                        </div>
                      </li>
                    )
                  }
                })
              }
            </ul>
            <ul className='value-list'>
              <li>
                <div className='category-list-side' onClick={() => {
                  router.push({ pathname: `/product` });
                }}>
                  <span>
                    Value of the Day
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side' onClick={() => {
                  router.push({ pathname: `/product` });
                }}>
                  <span>
                    Top 50 Offers
                  </span>
                </div>
              </li>
              <li >
                <div className='category-list-side' onClick={() => {
                  router.push({ pathname: `/product` });
                }}>
                  <span>
                    New Arrivals
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className='div-img-side-wrapper'>
            <img src={`${baseUrl}image/${props.listBannerPos[0].image}`}></img>
            <div className='div-text-detail-side-wrapper'>
              <div>
                <h2>
                  {props.listBannerPos[0].name}
                </h2>
                <Button
                  className='see-all-btn'
                  onClick={() => { onClickProductPage() }}
                >
                  Shop Now <AiOutlineArrowRight className='shopnow-icon' />
                </Button>
              </div>
            </div>
          </div>
          <div className='div-img-side-wrapper'>
            <img src={`${baseUrl}image/${props.listBannerPos[1].image}`}></img>
            <div className='div-text-detail-side-wrapper'>
              <div>
                <h2>
                  {props.listBannerPos[1].name}
                </h2>
                <Button
                  className='see-all-btn'
                  onClick={() => { onClickProductPage() }}
                >
                  Shop Now <AiOutlineArrowRight className='shopnow-icon' />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          {props?.listFS?.length > 0 ?
            <div>
              <div className='title-deal'>
                <div>
                  <h2 className='title-h2'>Top save today</h2>
                  <div className='divider-title-wrapper'>
                    <Divider orientation="left" className='divider-title'>
                      <GiLindenLeaf className='divider-icon' />
                    </Divider>
                  </div>
                  <p className='title-p'>Don't miss this opportunity at a special discount just for this week.</p>
                </div>
                {/* <div className='expies-btn'>
                  <Button className='exp-btn'> <GiAlarmClock className='clock-icon' />Expies in: 00:00:00:00</Button>
                </div> */}
              </div>
              <div className='fs-relative-wrapper-home'>
                <Swiper
                  spaceBetween={0}
                  slidesPerView={getNumberOfSwiper(w)}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                >
                  {props?.listFS?.length < getNumberOfSwiper(w)! ?
                    props.listFS?.map((item: ProductInterface, index: any) => (
                      <SwiperSlide key={`Spw8yUreQC-${index}`}>
                        <div className='product-card-swipper'>
                          <ProductCardFS
                            sourceImg={item?.image ? `${baseUrl}image/${item?.image[0]}` : ""}
                            title={item?.name}
                            price={item?.type ? item?.type[0]?.priceSale?.toLocaleString('vi-VN') : ""}
                            amount={item?.type ? item?.type[0]?.amountSale?.toString() : ""}
                            onClick={() => onClickProduct(item._id)}
                          />
                        </div>
                      </SwiperSlide>
                    )) : conditional.map((e, idx) => (
                      <div key={`T3bWRtDZIc-${idx}`}>
                        {props.listFS?.map((item: ProductInterface, index: any) => (
                          <SwiperSlide key={`listFS-${idx}${index}`}>
                            <div className='product-card-swipper'>
                              <ProductCardFS
                                sourceImg={item?.image ? `${baseUrl}image/${item?.image[0]}` : ""}
                                title={item?.name}
                                price={item?.type ? item?.type[0]?.priceSale?.toLocaleString('vi-VN') : ""}
                                amount={item?.type ? item?.type[0]?.amountSale?.toString() : ""}
                                onClick={() => onClickProduct(item._id)}
                              />
                            </div>
                          </SwiperSlide>
                        ))}
                      </div>
                    ))}
                </Swiper>
              </div>
              <div className='btn-wrapper-home'>
                {/* <button className='btn-open-all-home' onClick={() => { onClickProductPage() }}>
                  <span className="span-open-all-home">Khám phá tất cả FlashSale</span>
                </button> */}
                <Divider />
              </div>
            </div>
            : null}
          <div className='title-deal'>
            <div>
              <h2 className='title-h2'>Top 10 Sản phẩm hot nhất tuần</h2>
              <div className='divider-title-wrapper'>
                <Divider orientation="left" className='divider-title'>
                  <GiLindenLeaf className='divider-icon' />
                </Divider>
              </div>
              <p className='title-p'>Don't miss top 10 hot deal this week.</p>
            </div>
            <div className='seeall-button-hidden'>
              <Button
                className='see-all-btn'
                onClick={() => { onClickProductPage() }}
              >
                Shop Now <AiOutlineArrowRight className='shopnow-icon' />
              </Button>
            </div>
          </div>
          <div>
            <Swiper
              spaceBetween={0}
              slidesPerView={getNumberOfSwiper(w)}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {props?.top10?.length < getNumberOfSwiper(w)! ?
                props.top10?.map((item: ProductInterface, index: any) => (
                  <SwiperSlide key={`BF5h5wECOW-${index}`}>
                    <div className='product-card-swipper'>
                      <ProductCard
                        sourceImg={item?.image ? `${baseUrl}image/${item?.image[0]}` : ""}
                        title={item?.name}
                        price={item?.type ? item?.type[0]?.price?.toLocaleString('vi-VN') : ""}
                        onClick={() => onClickProduct(item._id)}
                      />
                    </div>
                  </SwiperSlide>
                )) : conditional.map((e, idx) => (
                  <div key={`i7ZuecyOOK-${idx}`}>
                    {props.top10?.map((item: ProductInterface, index: any) => (
                      <SwiperSlide key={`QTXZ7OirSN-${idx}-${index}`}>
                        <div className='product-card-swipper'>
                          <ProductCard
                            sourceImg={item?.image ? `${baseUrl}image/${item?.image[0]}` : ""}
                            title={item?.name}
                            price={item?.type ? item?.type[0]?.price?.toLocaleString('vi-VN') : ""}
                            onClick={() => onClickProduct(item._id)}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                ))}
            </Swiper>
          </div>
          <div className='seeall-button'>
            <Button
              className='see-all-btn'
              onClick={() => { onClickProductPage() }}
            >
              Shop Now <AiOutlineArrowRight className='shopnow-icon' />
            </Button>
          </div>


          <div className='btn-wrapper-home'>
            {/* <button className='btn-open-all-home' onClick={() => { onClickProductPage() }}>
              <span className="span-open-all-home">Khám phá tất cả deal hot</span>
            </button> */}
            <Divider />
          </div>
          <div className='banner-grid-2-home'>
            <Swiper
              spaceBetween={15}
              slidesPerView={w > 1100 ? 2 : 1}
              loop={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {conditional.map((e, idx) => {
                return (
                  <div key={`deal-hot-${idx}`}>
                    {props.listBannerSub?.map((item: BannerInterface, index: any) => {
                      return <SwiperSlide key={`K3oXmcPnxW-${idx}${index}`}>
                        <div className='banner-div-wrapper-home'>
                          <img className='banner-img-home' src={`${baseUrl}image/${item?.image}`}></img>
                        </div>
                      </SwiperSlide>
                    })}
                  </div>
                )
              })}
            </Swiper>
          </div>
          <div className='title-deal'>
            <div>
              <h2 className='title-h2'>Những sản phẩm mới nhất</h2>
              <div className='divider-title-wrapper'>
                <Divider orientation="left" className='divider-title'>
                  <GiLindenLeaf className='divider-icon' />
                </Divider>
              </div>
              <p className='title-p'>Don't miss all new hot deal.</p>
            </div>
          </div>
          <div className='div-product'>
            {props.list50?.map((item: ProductInterface, index: any) => (
              <ProductCard
                key={`bJKkpv7u8C-${index}`}
                sourceImg={item?.image ? `${baseUrl}image/${item?.image[0]}` : ""}
                title={item?.name}
                price={item?.type ? item?.type[0]?.price?.toLocaleString('vi-VN') : ""}
                onClick={() => onClickProduct(item._id)}
              />
            ))}
          </div>
          <div className='btn-wrapper-home-all'>
            <button className='btn-open-all-home' onClick={() => { onClickProductPage() }}>
              <span className="span-open-all-home">Xem thêm sản phẩm</span>
            </button>
          </div>
        </div>
      </div>
      <div className='swiper-wrapper-home'>
        <Swiper
          spaceBetween={20}
          slidesPerView={w > 1457 ? 4 : (w > 1100 ? 3 : (w > 655 ? 2 : 1))}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {conditional.map((e, index) => (
            <div key={`C5JcE8yqBm-${index}`}>
              <SwiperSlide>
                <div className='two-col-home'>
                  <div className='div-img-col-home'><img className='img-col-home' src={certification} alt='certification'></img></div>
                  <div className='div-col-home'>
                    <p className='p-col-home'>Chứng nhận chất lượng</p>
                    <span className='span-col-home'>Sản phẩm đảm bảo chất lượng</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='two-col-home'>
                  <div className='div-img-col-home'><img className='img-col-home' src={freeship} alt='freeship'></img></div>
                  <div className='div-col-home'>
                    <p className='p-col-home'>Vận chuyển miễn phí</p>
                    <span className='span-col-home'>Cho đơn hàng nội thành Hà Nội</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='two-col-home'>
                  <div className='div-img-col-home'><img className='img-col-home' src={support} alt='support'></img></div>
                  <div className='div-col-home'>
                    <p className='p-col-home'>Hotline: 0888283335</p>
                    <span className='span-col-home'>Hỗ trợ trực tiếp nhanh chóng</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='two-col-home'>
                  <div className='div-img-col-home'><img className='img-col-home' src={promotion} alt='promotion'></img></div>
                  <div className='div-col-home'>
                    <p className='p-col-home'>Ngập tràn khuyến mãi</p>
                    <span className='span-col-home'>Ưu đãi lên đến 10% mỗi đơn hàng</span>
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const api = API_URLS.PRODUCT.getTop10Product();
  const top10 = await apiCall({ ...api });

  const params = '?limit=50';
  const apiList = API_URLS.PRODUCT.getListProduct(params);
  const list50 = await apiCall({ ...apiList });

  const paramsFS = '?limit=10';
  const apiFlashSale = API_URLS.PRODUCT.getListSale(paramsFS);
  const listFS = await apiCall({ ...apiFlashSale });

  const isTop = '?top=true';
  const apiBannerTop = API_URLS.BANNER.getListBanner(isTop);
  const listBannerTop = await apiCall({ ...apiBannerTop });

  const isPos = '?pos=true';
  const apiBannerPos = API_URLS.BANNER.getListBanner(isPos);
  const listBannerPos = await apiCall({ ...apiBannerPos });

  const apiBannerSub = API_URLS.BANNER.getListBanner('');
  const listBannerSub = await apiCall({ ...apiBannerSub });

  const apiListCategory = API_URLS.CATEGORY.getListCategory();
  const listCategory = await apiCall({ ...apiListCategory });

  return {
    props: {
      category: listCategory.response?.data || null,
      top10: top10.response?.data || null,
      list50: list50.response?.data || null,
      listFS: listFS.response?.data || null,
      listBannerTop: listBannerTop.response?.data || null,
      listBannerSub: listBannerSub.response?.data || null,
      listBannerPos: listBannerPos.response?.data || null,
    }
  }
}
