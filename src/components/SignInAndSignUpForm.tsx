import Footer from "@/components/Footer";
import React from "react";

const logo = '/logo.png';

interface PropsInterface {
    SignInOrSignUpForm: () => any;
    type: 'signin' | 'signup';
}

const SignInAndSignUpForm = (props: PropsInterface) => {
    const { SignInOrSignUpForm, type } = props
    return (
        <div className="siasuf-container">
            <div className="siasuf-header">
                <div className="left-content">
                    <img className="logo" src={logo} alt="Logo" />
                    <span className="header-text">{type == 'signin' ? 'Đăng nhập' : 'Đăng ký'}</span>
                </div>
                <div className="right-content">
                    <span className="need-help-text">Bạn cần giúp đỡ?</span>
                </div>
            </div>
            <div className="siasuf-body">
                <div className="siasuf-form">
                    <SignInOrSignUpForm />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SignInAndSignUpForm;