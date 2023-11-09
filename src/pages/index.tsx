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
const inter = Inter({ subsets: ['latin'] })
const freeship = '/free-delivery1.png';
const certification = '/policy_3.png';
const support = '/policy_4.png';
const promotion = '/policy_2.png';
const flashsale = '/flashsale.png';
export default function Home(props: any) {
  const { width } = useWindowSize();
  let w = width;
  const conditional = [1, 2]
  const baseUrl = process.env.BASE_URL;
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
            return <div key={`banner-${index}`} className='slider-img-container-home'>
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
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/vegetable.svg'></img>
                  <span>
                    Vegetables & Fruit
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/cup.svg'></img>
                  <span>
                    Beverages
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/meats.svg'></img>
                  <span>
                    Meats & Seafood
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/breakfast.svg'></img>
                  <span>
                    Breakfast & Dairy
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/frozen.svg'></img>
                  <span>
                    Frozen Foods
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/biscuit.svg'></img>
                  <span>
                    Biscuits & Snacks
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/grocery.svg'></img>
                  <span>
                    Grocery & Staples
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/drink.svg'></img>
                  <span>
                    Wines & Alcohol Drinks
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/milk.svg'></img>
                  <span>
                    Milk & Dairies
                  </span>
                </div>
              </li>
              <li className='last-li'>
                <div className='category-list-side'>
                  <img src='https://themes.pixelstrap.com/fastkart/assets/svg/1/pet.svg'></img>
                  <span>
                    Pet Foods
                  </span>
                </div>
              </li>
            </ul>
            <ul className='value-list'>
              <li>
                <div className='category-list-side'>
                  <span>
                    Value of the Day
                  </span>
                </div>
              </li>
              <li>
                <div className='category-list-side'>
                  <span>
                    Top 50 Offers
                  </span>
                </div>
              </li>
              <li >
                <div className='category-list-side'>
                  <span>
                    New Arrivals
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className='div-img-side-wrapper'>
            <img src='https://themes.pixelstrap.com/fastkart/assets/images/vegetable/banner/8.jpg'></img>
            <div className='div-text-detail-side-wrapper'>
              <div>
                <h2>
                  Seafood
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
            <img src='https://themes.pixelstrap.com/fastkart/assets/images/vegetable/banner/11.jpg'></img>
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
                <div className='expies-btn'>
                  <Button className='exp-btn'> <GiAlarmClock className='clock-icon' />Expies in: 00:00:00:00</Button>
                </div>
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
                  {conditional.map((e, index) => (
                    <div key={`listFS ${index}`}>
                      {props.listFS?.map((item: ProductInterface, index: any) => (
                        <SwiperSlide key={`listFS-${index}`}>
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
              {conditional.map((e, index) => (
                <div key={`top-10 ${index}`}>
                  {props.top10?.map((item: ProductInterface, index: any) => (
                    <SwiperSlide key={`top10-${index}`}>
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
              {conditional.map((e, index) => {
                return (
                  <div key={`deal-hot-${index}`}>
                    {props.listBannerSub?.map((item: BannerInterface, index: any) => {
                      return <SwiperSlide>
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
                key={`list-50-${index}`}
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
            <div key={`certification ${index}`}>
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

  const apiBannerSub = API_URLS.BANNER.getListBanner('');
  const listBannerSub = await apiCall({ ...apiBannerSub });
  return {
    props: {
      top10: top10.response?.data || null,
      list50: list50.response?.data || null,
      listFS: listFS.response?.data || null,
      listBannerTop: listBannerTop.response?.data || null,
      listBannerSub: listBannerSub.response?.data || null,
    }
  }
}