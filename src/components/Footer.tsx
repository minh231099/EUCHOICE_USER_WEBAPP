import { Row, Col } from "antd";
import React from "react"
import { LiaShippingFastSolid, LiaMedalSolid } from 'react-icons/lia';
import { BiSupport } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
const logo = '/logo.png';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer>
            <section className="section">
                <div className="bg-section bg-section2 bg-img"></div>
                <div className="section-content footer-bot" >
                    <Row className="row" gutter={24} >
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="img">
                                        <div className="img-inner">
                                            <img className="img-object" src={logo} alt="Logo" />
                                        </div>
                                    </div>
                                    <p className="infoEu text-justify-foot">EUCHOICE là một công ty chuyên cung cấp và phân phối các sản phẩm Châu Âu chính ngạch, có hóa đơn, chứng từ sản phẩm. Phục vụ nhu cầu cao cấp, dịch vụ nhanh chóng & tin cậy nhằm mang đến cho bạn những sự lựa chọn thời thượng & độc đáo nhất.</p>
                                    <div className="infoEu connect-foot uppercase-foot text-title-foot"><h3 ><b></b><span >KẾT NỐI VỚI CHÚNG TÔI</span><b></b></h3></div>
                                    <a href="#" className="fa fa-facebook"></a>
                                    <a href="#" className="fa fa-youtube"></a>
                                    <a href="#" className="fa fa-instagram"></a>
                                    <div>
                                        <img className="bn46" src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="bn45" />
                                        <img className="bn46" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png" alt="bn45" />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="infoEu uppercase-foot text-title-foot"><h3><b></b><span >Hỗ trợ khách hàng</span><b></b></h3></div>
                                    <div >
                                        <div className="text-line-foot">
                                            <a href="https://euchoice.vn/chinh-sach-bao-mat/" >
                                                <span className="infoEu capitalize-foot">
                                                    Chính sách bảo mật
                                                </span>
                                            </a>
                                        </div>
                                        <div className="text-line-foot">
                                            <a href="https://euchoice.vn/chinh-sach-doi-tra/">
                                                <span className="infoEu capitalize-foot">
                                                    Chính sách đổi trả
                                                </span>
                                            </a>
                                        </div>
                                        <div className="text-line-foot">
                                            <a href="https://euchoice.vn/huong-dan-thanh-toan/">
                                                <span className="infoEu capitalize-foot">
                                                    Chính sách thanh toán
                                                </span>
                                            </a>
                                        </div>
                                        <div className="text-line-foot">
                                            <a href="https://euchoice.vn/dieu-khoan-su-dung/">
                                                <span className="infoEu capitalize-foot">
                                                    Điều khoản sử dụng
                                                </span>
                                            </a>
                                        </div>
                                        <div className="text-line-foot">
                                            <a href="https://euchoice.vn/huong-dan-mua-hang/">
                                                <span className="infoEu capitalize-foot">
                                                    Hướng dẫn mua hàng
                                                </span>
                                            </a>
                                        </div>
                                        <div className="text-line-foot">
                                            <a href="https://euchoice.vn/chinh-sach-bao-ve-thong-tin-ca-nhan-cua-nguoi-tieu-dung/">
                                                <span className="infoEu capitalize-foot">
                                                    Chính sách bảo vệ khách hàng
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="infoEu uppercase-foot text-title-foot"><h3><b></b><span >Chấp nhận thanh toán</span><b></b></h3></div>
                                    <Row>
                                        <Col >
                                            <img className="bn45" src="https://vudigital.co/wp-content/uploads/2022/12/logo-mastercard-da-thay-doi-nhu-the-nao-trong-hon-50-nam-2.webp" alt="bn45" />
                                        </Col>
                                        <Col >
                                            <img className="bn45" src="https://resources.mynewsdesk.com/image/upload/c_fill,dpr_auto,f_auto,g_auto,q_auto:good,w_1782/oeb5fz6yafjdfm9yehbe" alt="bn45" />
                                        </Col>
                                        <Col >
                                            <img className="bn45" src="https://www.global.jcb/en/about-us/brand-concept/images/index/pic_jcbcard_02.png" alt="bn45" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <img className="bn45" src="https://www.taichinhz.com/wp-content/uploads/2021/10/zalopay-la-gi.jpg" alt="bn45" />
                                        </Col>
                                        <Col >
                                            <img className="bn45" src="https://inkythuatso.com/uploads/images/2021/12/payoo-logo-inkythuatso-02-15-47-06.jpg" alt="bn45" />
                                        </Col>
                                        <Col >
                                            <img className="bn45" src="https://napas.qltns.mediacdn.vn/479491956813160448/2022/10/14/logo-napas-nen-trong-16657148272251732659720.png" alt="bn45" />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Col>
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="infoEu uppercase-foot text-title-foot"><h3 ><b></b><span >Về EUCHOICE</span><b></b></h3></div>
                                    <div className="text-line-foot">
                                        <a href="#">
                                            <span className="infoEu capitalize-foot">
                                                giới thiệu EUCHOICE
                                            </span>
                                        </a>
                                    </div>
                                    <div className="text-line-foot">
                                        <a href="https://euchoice.vn/so-tai-khoan-ngan-hang/">
                                            <span className="infoEu capitalize-foot">
                                                số tài khoản ngân hàng
                                            </span>
                                        </a>
                                    </div>
                                    <div className="text-line-foot">
                                        <a href="https://euchoice.vn/thong-tin-hang-hoa/">
                                            <span className="infoEu capitalize-foot">
                                                thông tin hàng hóa
                                            </span>
                                        </a>
                                    </div>
                                    <div className="text-line-foot">
                                        <a href="https://euchoice.vn/chinh-sach-van-chuyen/">
                                            <span className="infoEu capitalize-foot">
                                                Chính sách vận chuyển
                                            </span>
                                        </a>
                                    </div>
                                    <div className="text-line-foot">
                                        <a href="https://euchoice.vn/chinh-sach-bao-mat-va-luu-tru-thong-tin/">
                                            <span className="infoEu capitalize-foot">
                                                Chính sách bảo mật và lưu trữ thông tin
                                            </span>
                                        </a>
                                    </div>
                                    <div className="text-line-foot">
                                        <a href="#">
                                            <span className="infoEu capitalize-foot">
                                                Quy chế hoạt động
                                            </span>
                                        </a>
                                    </div>
                                    <div className="text-line-foot">
                                        <a href="#">
                                            <span className="infoEu capitalize-foot">
                                                Tin tức
                                            </span>
                                        </a>
                                    </div>
                                    <div className="text-line-foot">
                                        <a href="#">
                                            <span className="infoEu capitalize-foot">
                                                Trung tâm hỗ trợ
                                            </span>
                                        </a>
                                    </div>
                                    <div>
                                        <a href="http://online.gov.vn/Home/WebDetails/85990" target="_blank" rel="noopener">
                                            <img
                                                src="https://euchoice.vn/wp-content/uploads/2021/09/logoSaleNoti-300x114.png"
                                                alt=""
                                                data-lazy-src="https://euchoice.vn/wp-content/uploads/2021/09/logoSaleNoti-300x114.png"
                                                data-ll-status="loaded"
                                                className="gov-vn"
                                            >
                                            </img>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="col" md={6} sm={12} xs={24}>
                            <div className="col-inner">
                                <div className="box">
                                    <div className="infoEu uppercase-foot text-title-foot"><h3 ><b></b><span >Liên Hệ</span><b></b></h3></div>
                                    <p className="infoEu capitalize-foot"><strong>Địa chỉ chúng tôi</strong></p>
                                    <p className="infoEu text-justify-foot">Số 122 Trần Đại Nghĩa, Phường Đồng Tâm, Quận Hai Bà Trưng, Thành phố Hà Nội</p>
                                    <p className="infoEu capitalize-foot"><strong>Emai chúng tôi</strong></p>
                                    <p className="infoEu">lienhe@euchoice.vn</p>
                                    <p className="infoEu capitalize-foot"><strong>Số điện thoại</strong></p>
                                    <p className="infoEu">0888283335</p>
                                    <p className="infoEu capitalize-foot"><strong>Mã Số Thuế</strong>: 0107700928</p>
                                    <p className="infoEu capitalize-foot"><strong>Ngày hoạt động</strong>: 10/01/2017</p>
                                    <p className="infoEu capitalize-foot"><strong>Nơi cấp</strong>: Hà Nội </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="divider-footer">
                </div>
                <div className="copyright">
                    <strong>© Bản quyền thuộc về Công Ty EUCHOICE</strong>
                </div>
            </section>
        </footer >
    )
}

export default Footer;