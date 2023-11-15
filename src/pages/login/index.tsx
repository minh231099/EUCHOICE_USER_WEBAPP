import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import SignInAndSignUpForm from "../../components/SignInAndSignUpForm";
import { Button, Form, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { LoginPayload, login } from "@/redux/actions/authAction";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { HistoryInterface } from "@/redux/reducers/history/interfaces";

const { Item } = Form;

interface LoginPagePropsItf {
    isFetching: boolean | null | undefined;
    loginError: boolean | null | undefined;
    token: string | null | undefined;
    history: HistoryInterface;
}

const LoginPage = (props: LoginPagePropsItf) => {
    const { isFetching, loginError, token, history } = props;
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [clickOnSubmit, setClickOnSubmit] = useState<boolean>(false);
    const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
    const [initialValues, setInitialValues] = useState<LoginPayload>({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (clickOnSubmit) {
            if (!isFetching && !loginError) {
                if (token) Cookies.set("jwt", token.replace('Bearer ', ''));
                setClickOnSubmit(false);
                router.push(history.back);
            }
            else if (!isFetching && loginError) {
                setShowErrorMessage(true);
            }
        }
    }, [loginError, isFetching]);

    const onSubmit = (values: LoginPayload) => {
        dispatch(login(values));
        setClickOnSubmit(true);
        setShowErrorMessage(false);
        setInitialValues(values);
    }

    const SignInForm = () => {
        return (
            <div className="sign-in-form">
                <div className="sign-in-form-body">
                    <span className="title">Đăng nhập</span>
                    <div className="form-input-info">
                        <Form onFinish={onSubmit} initialValues={initialValues}>
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
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password
                                    style={{ borderRadius: 0, fontSize: 16, marginTop: 10, padding: '5px 10px' }}
                                    placeholder="Mật khẩu"
                                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                />
                            </Item>
                            {showErrorMessage && <span className="error-message">Email hoặc mật khẩu không chính xác!</span>}
                            <Item style={{ margin: 0 }}>
                                <Button
                                    className="submit-button"
                                    htmlType="submit"
                                    loading={isFetching ? true : false}
                                >
                                    Đăng Nhập
                                </Button>
                            </Item>
                        </Form>
                        <div className="sub-container">
                            <span className="forgot-password">Quên mật khẩu?</span>
                            <div className="vertical-divider"></div>
                            <div className="another-info">
                                <span className="sign-up-router">Lần đầu bạn tới với EU Choice? <span className="sign-up-text" onClick={() => { router.push('/signup') }}>Đăng ký</span></span>
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
                SignInOrSignUpForm={SignInForm}
                type="signin"
            />
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isFetching: state?.authReducer?.isFetching,
        loginError: state?.authReducer?.error,
        token: state?.authReducer?.token,
        history: state.historyReducer.history,
    };
};

export default connect(mapStateToProps)(LoginPage);