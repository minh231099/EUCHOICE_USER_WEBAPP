import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { LayoutProps } from '../../redux/reducers/layout/interface';
import MainLayout from './main_layout';
import MobileLayout from './mobile_layout';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { listProductInCart } from '@/redux/actions/cartAction';
import { isLogged } from '@/utils/lib';
import { RootState } from '@/redux';
import UserLeftLayout from './left_layout';

interface CustomProps {
  children: React.ReactNode;
}

const Layout: React.FC<CustomProps> = (props) => {
  const { children } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    dispatch(listProductInCart());
  }, [isLogged()]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showLayout = !router.pathname.startsWith('/login') && !router.pathname.startsWith('/signup');
  const showUserLayout = router.pathname.startsWith('/user');
  const showFooter = !router.pathname.startsWith('/cart') && !router.pathname.startsWith('/order') && !isMobile;

  return showLayout ? (
    isMobile ?
      <MobileLayout showFooter={showFooter}>{children}</MobileLayout>
      : <MainLayout>{showUserLayout ? <UserLeftLayout>{children}</UserLeftLayout> : children}</MainLayout>)
    : <>{children}</>;
};

const mapStateToProps = (state: RootState) => {
  return {
    addToCartState: state?.cartReducer?.addToCart,
  };
};

export default connect(mapStateToProps)(Layout);