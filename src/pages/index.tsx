import { Inter } from 'next/font/google'
import { Carousel, Col, Row } from 'antd'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { useWindowSize } from 'react-use';
import { API_URLS } from '@/api/apiURL';
import apiCall from '@/helper/apiCall';
import { ProductInterface } from '@/redux/reducers/product/interfaces';
import { useRouter } from 'next/router';
import ProductCardFS from '@/components/ProductCardFS';
import { BannerInterface } from '@/redux/reducers/banner/interfaces';
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
    if (screenWidth >= 2834) return 9
    if (screenWidth < 2834 && screenWidth >= 2517) return 8
    if (screenWidth < 2517 && screenWidth >= 2200) return 7
    if (screenWidth < 2200 && screenWidth >= 1884) return 6
    if (screenWidth < 1884 && screenWidth >= 1801) return 5
    if (screenWidth < 1801 && screenWidth >= 1737) return 7
    if (screenWidth < 1737 && screenWidth >= 1501) return 6
    if (screenWidth < 1501 && screenWidth >= 1467) return 7
    if (screenWidth < 1467 && screenWidth >= 1256) return 6
    if (screenWidth < 1256 && screenWidth >= 1201) return 5
    if (screenWidth < 1201 && screenWidth >= 1178) return 6
    if (screenWidth < 1178 && screenWidth >= 980) return 5
    if (screenWidth < 980 && screenWidth >= 921) return 4
    if (screenWidth < 921 && screenWidth >= 875) return 5
    if (screenWidth < 875 && screenWidth >= 698) return 4
    if (screenWidth < 698 && screenWidth >= 521) return 3
    if (screenWidth < 521 && screenWidth >= 343) return 2
    if (screenWidth < 343) return 1
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
      {props?.listFS?.length > 0 ?
        <div>
          <div className='fs-relative-wrapper-home'>
            <div className='flash-sale-wrapper-home'>
              <img className='img-fs-home' src={flashsale}></img>
            </div>
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
            <button className='btn-open-all-home' onClick={() => { onClickProductPage() }}>
              <span className="span-open-all-home">Khám phá tất cả FlashSale</span>
            </button>
          </div>
        </div>
        : null}
      <div className='top10-wrapper-home'>
        <h2 className='title-top10-home'>Top 10 sản phẩm hot nhất tuần</h2>
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
      <div className='btn-wrapper-home'>
        <button className='btn-open-all-home' onClick={() => { onClickProductPage() }}>
          <span className="span-open-all-home">Khám phá tất cả deal hot</span>
        </button>
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
      <div className='top10-wrapper-home'>
        <h2 className='title-top10-home'>Những sản phẩm mới nhất</h2>
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
      <div className='btn-wrapper-home'>
        <button className='btn-open-all-home' onClick={() => { onClickProductPage() }}>
          <span className="span-open-all-home">Xem thêm sản phẩm</span>
        </button>
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
