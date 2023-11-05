import React, { useState } from "react";
import SignInAndSignUpForm from "../../components/SignInAndSignUpForm";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";

const { Item } = Form;

const SignUpPage = () => {
    const [isVerify, setIsVerify] = useState<boolean>(false);
    const [form] = Form.useForm();
    const router = useRouter();
    const onClickVerify = () => {
        if (form.getFieldValue('phone')) {
            setIsVerify(true);
        }
    }

    const SignUpForm = () => {
        return (
            <div className="sign-in-form">
                <div className="sign-in-form-body">
                    <span className="title">Đăng ký</span>
                    <div className="form-input-info">
                        <Form
                            layout="vertical"
                            form={form}
                        >
                            <Item
                                name="phone"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input
                                    style={{ borderRadius: 0, fontSize: 16, marginTop: 10, padding: '5px 10px' }}
                                    placeholder="Phone Number"
                                    suffix={
                                        <div className="YVmVV3u82Q" onClick={onClickVerify}>
                                            Xác Thực
                                        </div>
                                    }
                                />
                            </Item>
                            {
                                isVerify &&
                                <Item
                                    name="verifyCode"
                                    rules={[{ required: true, message: 'Please input verify code!' }]}
                                    label="Mã Xác Nhận:"
                                    wrapperCol={{ span: 14 }}
                                >
                                    <Input
                                        style={{ borderRadius: 0, fontSize: 16, padding: '5px 10px' }}
                                    />
                                </Item>
                            }
                            <Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input
                                    style={{ borderRadius: 0, fontSize: 16, marginTop: 10, padding: '5px 10px' }}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Item>
                            <Item style={{ margin: 0 }}>
                                <Button className="submit-button">
                                    Đăng Ký
                                </Button>
                            </Item>
                        </Form>
                        <div className="sub-container">
                            <div className="vertical-divider"></div>
                            <div className="another-info">
                                <span className="sign-up-router">Bạn đã có tài khoản? <span className="sign-up-text" onClick={() => {router.push('/login')}}>Đăng nhập</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <SignInAndSignUpForm
                SignInOrSignUpForm={SignUpForm}
                type="signup"
            />
        </div>
    )
}

export default SignUpPage;