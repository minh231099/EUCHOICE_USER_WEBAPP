import React from "react";
import { useRouter } from "next/router";
import type { CollapseProps } from 'antd';
import type { CSSProperties } from 'react';
import { Anchor, theme, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

const logo = '/logo.png';

interface HelperPropsInterface {
}

const vnpayMethodLen = 51;

const listContents = {
    euchoiceIntroduce: <span>
        <p>EU CHOICE - Công ty TNHH XNK Hữu cơ Việt Nam được thành lập vào năm 2017, chuyên phân phối các sản phẩm chính hãng từ thị trường châu  u: bông tẩy trang Tetra Pháp, tampon O.B Jessa Facelle, chất tẩy rửa nhà cửa và giặt giũ quần áo Denkmit nhập khẩu Đức, thực phẩm hữu cơ, các sản phẩm chăm sóc sức khỏe sắc đẹp và các sản phẩm mẹ bé… Tất cả hàng hóa tại  EU CHOICE đều được nhập khẩu chính ngạch và có đầy đủ hóa đơn, chứng từ.</p>
        <p>EU Choice sẵn sàng xuất hóa đơn VAT để khách hàng có thể hoàn toàn yên tâm và tin tưởng về nguồn gốc, xuất xứ đảm bảo tính rõ ràng minh bạch của sản phẩm.</p>
        <p>Với uy tín hơn 6 năm trên thị trường, EU CHOICE - Công ty TNHH XNK Hữu cơ Việt Nam không ngừng phát triển để trở thành nhà cung cấp các hàng hóa nhập khẩu đến từ Châu  u hàng đầu tại thị trường Việt Nam. EU CHOICE luôn hướng đến tinh thần mang đến trải nghiệm chất lượng bền vững phục vụ người tiêu dùng trực tiếp, đồng thời mang lại lợi ích tốt nhất cho các đối tác.</p>
    </span>,
    privacy: <span>
        <p><b>Khi truy cập website euchoice.vn nghĩa là quý khách đồng ý chấp nhận thực hiện những mô tả trong Chính sách bảo mật thông tin. Nếu quý khách không đồng ý với các điều khoản của Chính sách bảo mật thông tin, vui lòng không sử dụng hệ thống trang web euchoice.vn.</b> Thông báo bảo mật này được đưa ra để thể hiện vai trò của chúng tôi trong vấn đề bảo mật trực tuyến và dịch vụ khách hàng. Chúng tôi xử lý thông tin của quý khách bằng tính trung thực và độ nhạy cảm - điều mà chúng tôi đã thể hiện xuyên suốt quá trình phát triển của Công ty TNHH XNK Hữu cơ Việt Nam.</p>
        <p>
            <b>2.1 Mục đích và phạm vi thu thập thông tin</b>
            <br />
            <span>
                Việc thu thập thông tin qua website euchoice.vn sẽ giúp chúng tôi:
                <ul>
                    <li>Nắm bắt được các nguyện vọng, mong muốn của khách hàng nhằm nâng cao dịch vụ;</li>
                    <li>Giúp khách hàng cập nhật các chương trình khuyến mại, giảm giá…do EU CHOICE tổ chức sớm nhất;</li>
                    <li>Hỗ trợ khách hàng khi có khiếu nại, ý kiến một cách nhanh nhất.</li>
                </ul>
            </span>
        </p>
        <p>
            EU CHOICE thu thập thông tin như sau:
            <ul>
                <li><b>Thông tin Quý khách hàng cung cấp cho chúng tôi:</b> Chúng tôi thu thập thông tin cá nhân được cung cấp bởi người sử dụng website gồm: Họ tên, số điện thoại, địa chỉ email, địa chỉ. Thông tin sẽ được thu thập khi Quý khách đăng ký tài khoản trên website euchoice.vn, đặt hàng trên website, tham gia các cuộc thi, các trò chơi, các khảo sát có trên website euchoice.vn hoặc Quý khách hàng giao tiếp với các bộ phận của chúng tôi như bộ phận Chăm sóc Khách hàng, bộ phận Bán hàng …
                </li>
                <li><b>Đặt mua hàng:</b> Khi Quý khách đặt mua hàng trực tuyến tại website euchoie.vn, Quý khách sẽ được yêu cầu cung cấp các thông tin liên lạc, Địa chỉ giao hàng, Phương thức thanh toán và Thông tin thanh toán. Trong trường hợp Quý khách hàng chọn phương thức thanh toán trực tuyến qua VNAY (gồm Thanh toán quét mã VNPAY, Thẻ ATM và tài khoản ngân hàng, Thẻ thanh toán quốc tế) thì các thông tin liên quan đến ứng dụng Mobile Banking, Internet Banking, Thông tin Thẻ thanh toán ... không phải là thông tin mà EU CHOICE thu thập.
                </li>
                <li><b>Đăng ký Email nhận thông tin từ EU CHOICE:</b> Quý khách có thể nhập Email và Đăng ký để nhận được thông tin đầy đủ và mới nhất về các bản tin, chương trình được gửi từ chúng tôi.</li>
            </ul>
        </p>
        <p>
            <b>2.2 Phạm vi sử dụng thông tin</b>
            <br />
            <span>
                Chúng tôi rất coi trọng việc bảo mật thông tin khách hàng nên chúng tôi cam kết sẽ tuyệt đối không tự ý sử dụng thông tin khách hàng với mục đích không mang lại lợi ích cho khách hàng. Chúng tôi cam kết không buôn bán, trao đổi thông tin bảo mật của khách hàng cho bất cứ bên thứ ba nào. Tuy nhiên, trong một số trường hợp đặc biệt sau, chúng tôi có thể chia sẻ thông tin khách một cách hợp lý khi:
                <ul>
                    <li>Được sự đồng ý của khách hàng;</li>
                    <li>Để bảo vệ quyền lợi của công ty và những đối tác của công ty: Chúng tôi chỉ đưa ra những thông tin cá nhân của khách hàng khi chắc chắn rằng những thông tin đó có thể bảo vệ được quyền lợi, tài sản của công ty chúng tôi và những đối tác liên quan. Những thông tin này sẽ được tiết lộ một cách hợp pháp theo Pháp luật Việt Nam;</li>
                    <li>Theo yêu cầu của những cơ quan Chính phủ khi chúng tôi thấy phù hợp với pháp luật Việt Nam;</li>
                    <li>Trong một số trường hợp cần thiết phải cung cấp thông tin khách hàng khác, như các chương trình khuyến mãi có sự tài trợ của một bên thứ ba, chúng tôi sẽ thông báo cho quý khách hàng trước khi thông tin của quý khách được chia sẻ. Quý khách có quyền quyết định xem có đồng ý chia sẻ thông tin hoặc tham gia hay không;</li>
                    <li>Nếu Quý khách thực hiện mua hàng tại euchoice.vn, thì các thông tin gồm Tên, Số điện thoại, Địa chỉ giao hàng của Quý khách sẽ được cung cấp cho đối tác giao hàng của chúng tôi để thực hiện việc giao hàng tới Quý khách.</li>
                </ul>
            </span>
        </p>
        <p>
            <b>2.3 Thời gian lưu trữ thông tin</b>
            <br />
            EU CHOIC sẽ lưu trữ các Thông tin cá nhân do Khách hàng cung cấp trên các hệ thống nội bộ của chúng tôi trong quá trình cung cấp dịch vụ cho Khách hàng hoặc cho đến khi hoàn thành mục đích thu thập hoặc khi Khách hàng có yêu cầu hủy các thông tin đã cung cấp.
        </p>
        <p>
            <b>2.4 Địa chỉ của đơn vị thu thập và quản lý thông tin cá nhân</b>
            <br />
            <span>
                <table>
                    <tr>
                        <td colSpan={2}>Công ty TNHH XNK Hữu cơ Việt Nam</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Địa chỉ: Số 122 Trần Đại Nghĩa, Phường Đồng Tâm, Quận Hai Bà Trưng, Thành phố Hà Nội</td>
                    </tr>
                    <tr>
                        <td>Điện thoại: 0888283335</td>
                        <td>Email: lienhe@euchoice.vn</td>
                    </tr>
                </table>
            </span>
        </p>
        <p>
            <b>2.5. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình</b>
            <br />
            Khách hàng có thể thực hiện các quyền trên bằng cách tự truy cập vào website hoặc liên hệ với chúng tôi qua email hoặc địa chỉ liên lạc được công bố trên website của euchoice.vn
        </p>
        <p>
            <b>2.6 Cam kết bảo mật thông tin cá nhân khách hàng</b>
            <br />
            Chúng tôi cam kết bảo đảm an toàn thông tin cho quý khách hàng khi đăng ký thông tin cá nhân với công ty chúng tôi. Chúng tôi cam kết không trao đổi mua bán thông tin khách hàng vì mục đích thương mại. Mọi sự chia sẻ và sử dụng thông tin khách hàng chúng tôi cam kết thực hiện theo chính sách bảo mật của công ty. Chúng tôi cam kết sẽ khiến quý khách cảm thấy tin tưởng và hài lòng về bảo mật thông tin cá nhân khi tham gia và sử dụng những dịch vụ của công ty chúng tôi.
            <ul>
                <li>Để bảo mật thông tin của khách hàng tốt nhất, chúng tôi khuyến cáo quý khách hạn chế truy cập tài khoản bằng đăng nhập tự động, chú ý chế độ sao lưu password và đảm bảo đăng xuất khỏi tài khoản khi sử dụng máy tính chung để đăng nhập tài khoản trên website của chúng tôi. Chúng tôi sẽ không chịu trách nhiệm khi những thông tin cá nhân của quý khách bị rò rỉ vì những lý do trên.</li>
                <li>Chính sách bảo mật chỉ áp dụng những thông tin quý khách hàng đăng ký trên website chính thức euchoice.vn của công ty chúng tôi. Mọi thông tin quý khách đăng ký tại những wedsite hoặc những địa chỉ khác đều không thuộc phạm vi hiệu lực của Chính sách Bảo mật thông tin này.</li>
            </ul>
        </p>
    </span>,
    shoppingGuide: <span>
        <ol>
            <li>ĐĂNG NHẬP/ ĐĂNG KÝ</li>
            <span>
                Quý khách hàng vui lòng <a href="/login" target="_blank">đăng nhập</a> vào tài khoản đã có ở euchoice.vn hoặc đăng nhập bằng Facebook/Google.
                <br />
                Trong trường hợp chưa đăng ký tài khoản, Quý khách vui lòng chọn <a href="/signup" target="_blank">Đăng ký</a> để tạo tài khoản mới.
            </span>

            <li>TÌM SẢN PHẨM</li>
            <span>
                Sau khi đăng nhập, Quý khách có thể tìm sản phẩm bằng cách:
                <ol>
                    <li>Nhập từ khóa sản phẩm vào <code>Thanh tìm kiếm</code> sau đó nhấn Enter.</li>
                    <li>Tìm sản phẩm theo các danh mục.</li>
                    <li>Nhấn vào banner các chương trình khuyến mãi.</li>
                </ol>
            </span>
            <li>CHỌN SẢN PHẨM</li>
            <span>
                Sau khi chọn được sản phẩm, Quý khách nhấn:
                <ol>
                    <li>Nhấn chọn sản phẩm theo <b>Phân loại</b> (màu sắc, trọng lượng…)</li>
                    <li>Nhấn dấu <code>+/-</code> để tăng giảm số lượng sản phẩm </li>
                    <li>Nhấn Thêm vào giỏ hàng để cho sản phẩm vào giỏ và tiếp tục mua sắm.</li>
                    <li>Nhấn Mua ngay để đặt hàng luôn.</li>
                </ol>
            </span>
            <li>MUA HÀNG</li>
            <span>
                Tại trang giỏ hàng, Quý khách cần:
                <ol>
                    <li>Nhấn vào mũi tên Phân loại (màu sắc, trọng lượng…) nếu muốn thay đổi phân loại sản phẩm.</li>
                    <li>Nhấn dấu <code>+/-</code> nếu muốn tăng giảm số lượng sản phẩm.</li>
                    <li>Nhập <code>Mã giảm giá</code> (nếu có) sau đó nhấn <code>Áp dụng</code>.</li>
                    <li>Nhấn Tiến hành đặt hàng.</li>
                </ol>
            </span>
            <li>CHỌN ĐỊA CHỈ GIAO HÀNG</li>
            <span>
                <ol>
                    <li>Quý khách chọn địa chỉ giao hàng theo các địa chỉ giao hàng trong sổ địa chỉ hoặc địa chỉ giao hàng mới.</li>
                    <li>Nhấn “Giao đến địa chỉ này” để chuyển sang bước chọn Hình thức thanh toán.</li>
                </ol>
            </span>
            <li>CHỌN HÌNH THỨC THANH TOÁN VÀ ĐẶT MUA</li>
            <span>
                <ol>
                    <li>Hiện tại EU CHOICE có 2 hình thức thanh toán khi nhận hàng đối với Quý khách đặt hàng trên website euchoice.vn: <b>thanh toán khi nhận hàng (COD)</b> và <b>thanh toán chuyển khoản trước</b>.</li>
                    <li>Quý khách nhấn chọn ĐẶT MUA để hoàn thành quá trình đặt hàng.</li>
                </ol>
            </span>
        </ol>
    </span>,
    paymentMothod: <span>
        <b>CÁC PHƯƠNG THỨC THANH TOÁN KHI MUA SẮM TẠI EU CHOICE</b>
        <br />
        <span>
            Mua hàng trực tuyến tại euchoice.vn, Quý khách có thể chọn 1 trong các hình thức thanh toán sau:
            <ol>
                <li><b>Thanh toán trực tiếp (COD)</b> cho nhân viên giao hàng khi nhận hàng tại nhà gồm tiền hàng + phí giao hàng.</li>
                <ul>
                    <li>Đối với hàng giao tận nhà thông qua một đối tác cung cấp dịch vụ giao nhận do EU CHOICE chỉ định, Quý khách vui lòng thanh toán chuyển khoản tiền hàng trước khi EU CHOICE gửi hàng và thanh toán trực tiếp chi phí vận chuyển hàng cho bên dịch vụ giao nhận.</li>
                </ul>
                <li><b>Chuyển khoản</b> sau khi xác nhận đặt hàng và trước khi nhận hàng.</li>
                <ul>
                    <li>Đối với một số khu vực mà Nhà cung cấp dịch vụ giao nhận quy định bên chuyển hàng phải trả phí trước. Khi tiếp nhận đơn đặt hàng, EU CHOICE sẽ thông báo cho Quý khách phí giao hàng, Quý khách vui lòng chuyển khoản tiền hàng + phí giao hàng cho EU CHOICE trước khi EU CHOICE chuyển hàng.</li>
                    <li>
                        Quý khách vui lòng thanh toán chuyển khoản tới các tài khoản sau:
                        <div className="helper-bank-info">
                            <img className="bank-icon-helper" src="/vnpaymethod1.png" />
                            <span>
                                <b>Ngân hàng Thương mại cổ phẩn Ngoại thương Việt Nam</b><br />
                                Số TK: 0011004338012<br />
                                Chủ tài khoản: Công ty TNHH Xuất nhập khẩu Hữu cơ Việt Nam<br />
                            </span>
                        </div>
                        <div className="helper-bank-info">
                            <img className="bank-icon-helper" src="/dongabank.png" />
                            <span>
                                <b>Ngân hàng Thương  mại cổ phần Đông Á - DongABank</b><br />
                                Số tài khoản: 019200370001<br />
                                Chủ tài khoản: Công ty TNHH Xuất nhập khẩu Hữu cơ Việt Nam<br />
                            </span>
                        </div>
                        <b style={{ color: 'red' }}>Lưu ý: Khi chuyển khoản, Quý khách vui lòng ghi rõ Mã Số Đơn Hàng được thanh toán vào phần ghi chú của lệnh chuyển khoản</b>
                    </li>
                </ul>
                <li>Thanh toán trực tuyến qua VNPAY:</li>
                <span>
                    Gồm các hình thức thanh toán:
                    <ol>
                        <li><b>Thanh toán quét mã VNPAY QR:</b> Quý khách hàng sử dụng tính năng QR Pay được tích sẵn trên ứng dụng Mobile Banking của các ngân hàng liên kết (Tìm trong menu của các ứng dụng này trên điện thoại), tiến hành quét mã QR Pay, nhập mã giảm giá (nếu có) và thanh toán trực tiếp từ tài khoản ngân hàng. Quý khách hàng lưu ý sử dụng đúng ứng dụng Mobile Banking trên điện thoại của các ngân hàng có tích hợp tính năng QR Pay dưới đây:</li>
                        <div className="helper-list-payment-method">
                            {
                                Array.apply(null, Array(vnpayMethodLen)).map((_, index) => {
                                    
                                    return (
                                        <div className="helper-list-payment-method-item">
                                            <img className="helper-list-payment-method-img" src={`/vnpaymethod${index+1}.png`}/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <li></li>
                        <li></li>
                    </ol>
                </span>
            </ol>
        </span>
    </span>
}

const getItems: (panelStyle: CSSProperties) => CollapseProps['items'] = (panelStyle) => [
    {
        key: 'about-euchoice',
        label: <span className="helper-content-title">Về EUCHOICE</span>,
        style: panelStyle,
        children: <Collapse
            bordered={false}
            style={{ background: '#fff' }}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            items={[
                {
                    key: 'euchoice-introduce',
                    label: <span className="helper-content-title">Giới Thiệu Về EUCHOICE</span>,
                    style: panelStyle,
                    children: listContents.euchoiceIntroduce,
                },
                {
                    key: 'privacy',
                    label: <span className="helper-content-title">Chính Sách Bảo Mật Và Lưu Trữ Thông Tin</span>,
                    style: panelStyle,
                    children: listContents.privacy,
                },
            ]}
        />,
    },
    {
        key: 'customer-support',
        label: <span className="helper-content-title">Hỗ Trợ Khách Hàng</span>,
        style: panelStyle,
        children: < Collapse
            bordered={false}
            style={{ background: '#fff' }}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            items={[
                {
                    key: 'shopping-guide',
                    label: <span className="helper-content-title">Hướng Dẫn Đặt Hàng</span>,
                    style: panelStyle,
                    children: listContents.shoppingGuide,
                },
                {
                    key: 'payment-methods',
                    label: <span className="helper-content-title">Phương Thức Thanh Toán</span>,
                    style: panelStyle,
                    children: listContents.paymentMothod,
                },
                {
                    key: 'shipping-policy',
                    label: <span className="helper-content-title">Chính Sách Vận Chuyển</span>,
                    style: panelStyle,
                },
                {
                    key: 'refund-policy',
                    label: <span className="helper-content-title">Chính Sách Đổi Trả Và Hoàn Tiền</span>,
                    style: panelStyle,
                },
            ]}
        />,
    },
];

const Helper = (props: HelperPropsInterface) => {
    const router = useRouter();
    const { token } = theme.useToken();

    const panelStyle: React.CSSProperties = {
        marginBottom: 24,
        background: '#fff',
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };


    const items = [
        {
            key: 'about-euchoice',
            href: '#about-euchoice',
            title: <span className="helper-anchor-title">Về EUCHOICE</span>,
            children: [
                {
                    key: 'euchoice-introduce',
                    href: '#euchoice-introduce',
                    title: <span className="helper-anchor-title">Giới Thiệu Về EUCHOICE</span>,
                },
                {
                    key: 'privacy',
                    href: '#privacy',
                    title: <span className="helper-anchor-title">Chính Sách Bảo Mật Và Lưu Trữ Thông Tin</span>,
                },
            ],
        },
        {
            key: 'customer-support',
            href: '#customer-support',
            title: <span className="helper-anchor-title">Hỗ Trợ Khách Hàng</span>,
            children: [
                {
                    key: 'shopping-guide',
                    href: '#shopping-guide',
                    title: <span className="helper-anchor-title">Hướng Dẫn Đặt Hàng</span>,
                },
                {
                    key: 'payment-methods',
                    href: '#payment-methods',
                    title: <span className="helper-anchor-title">Phương Thức Thanh Toán</span>,
                },
                {
                    key: 'shipping-policy',
                    href: '#shipping-policy',
                    title: <span className="helper-anchor-title">Chính Sách Vận Chuyển</span>,
                },
                {
                    key: 'refund-policy',
                    href: '#refund-policy',
                    title: <span className="helper-anchor-title">Chính Sách Đổi Trả Và Hoàn Tiền</span>,
                },
            ],
        },
    ];

    return (
        <div>
            <div className="jGuLCEirpK">
                <div className="j85X16YDAP" onClick={() => router.push('/')}>
                    <img className="C5d6e393DV" src={logo} alt="Logo" />
                </div>
            </div>
            <div className="helper-body">
                <div className="helper-anchor">
                    <Anchor
                        items={items}
                    />
                </div>
                <div className="helper-contents">
                    <Collapse
                        bordered={false}
                        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                        items={getItems(panelStyle)}
                        style={{ background: '#fff' }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Helper;