import React, { useState } from "react";
import SignInAndSignUpForm from "../../components/SignInAndSignUpForm";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import { SignUpPayload } from "@/redux/reducers/auth/interfaces";
import { RootState } from "@/redux";
import { connect } from 'react-redux';
import { useAppDispatch } from "@/redux/hooks";
import { signUp } from "@/redux/actions/authAction";

const { Item } = Form;

interface SignUpPageProps {
    signUpError: boolean | undefined;
}

const SignUpPage = (props: SignUpPageProps) => {
    const { signUpError } = props;
    // const [isVerify, setIsVerify] = useState<boolean>(false);
    const [form] = Form.useForm();
    const router = useRouter();

    const dispatch = useAppDispatch();


    // const onClickVerify = () => {
    //     if (form.getFieldValue('phone')) {
    //         setIsVerify(true);
    //     }
    // }

    const onClickSignUp = (values: SignUpPayload) => {
        console.log(values);
        if (values.password && values.password === values.repassword) {
            dispatch(signUp(values));
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
                            onFinish={onClickSignUp}
                        >
                            {/* <Item
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
                            } */}
                            <Item
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input
                                    style={{ borderRadius: 0, fontSize: 16, marginTop: 10, padding: '5px 10px' }}
                                    placeholder="Email"
                                />
                            </Item>
                            <Item
                                name="phone_number"
                                rules={[{ required: true, message: 'Please input your phone number!' }]}
                            >
                                <Input
                                    style={{ borderRadius: 0, fontSize: 16, marginTop: 10, padding: '5px 10px' }}
                                    placeholder="Phone Number"
                                />
                            </Item>
                            <Item
                                name="name"
                                rules={[{ required: true, message: 'Please input your name!' }]}
                            >
                                <Input
                                    style={{ borderRadius: 0, fontSize: 16, marginTop: 10, padding: '5px 10px' }}
                                    placeholder="User's Name"
                                />
                            </Item>
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
                            <Item
                                name="repassword"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The confirm password that you entered do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    style={{ borderRadius: 0, fontSize: 16, marginTop: 10, padding: '5px 10px' }}
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </Item>
                            <Item style={{ margin: 0 }}>
                                <Button className="submit-button" htmlType="submit">
                                    Đăng Ký
                                </Button>
                            </Item>
                        </Form>
                        <div className="sub-container">
                            <div className="vertical-divider"></div>
                            <div className="another-info">
                                <span className="sign-up-router">Bạn đã có tài khoản? <span className="sign-up-text" onClick={() => { router.push('/login') }}>Đăng nhập</span></span>
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

const mapStateToProps = (state: RootState) => {
    return {
        isFetching: state?.authReducer?.isFetching,
        signUpError: state?.authReducer?.signUpError,
    };
};

export default connect(mapStateToProps)(SignUpPage);