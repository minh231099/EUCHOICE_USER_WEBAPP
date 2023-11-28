import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MainLayout from './main_layout';
import MobileLayout from './mobile_layout';
import { useRouter } from 'next/router';
import { useAppDispatch } from '@/redux/hooks';
import { listProductInCart } from '@/redux/actions/cartAction';
import { isLogged } from '@/utils/lib';
import { RootState } from '@/redux';
import UserLeftLayout from './left_layout';
import { saveHistory } from '@/redux/actions/historyAction';
import { HistoryInterface } from '@/redux/reducers/history/interfaces';
import { getListCity } from '@/redux/actions/shippingInfo';

interface CustomProps {
  children: React.ReactNode;
  history: HistoryInterface;
}

const Layout: React.FC<CustomProps> = (props) => {
  const { children, history } = props;
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 771);
  };

  useEffect(() => {
    dispatch(saveHistory(history, router.asPath));
  }, [router.asPath]);


  useEffect(() => {
    dispatch(listProductInCart());
  }, [isLogged()]);

  useEffect(() => {
    dispatch(getListCity());
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showLayout = !router.pathname.startsWith('/login') && !router.pathname.startsWith('/signup') && !router.pathname.startsWith('/helper');;
  const showUserLayout = router.pathname.startsWith('/user');
  const showFooter = !router.pathname.startsWith('/cart') && !router.pathname.startsWith('/order') && isMobile;

  return showLayout ? (
    isMobile ?
      <MobileLayout showFooter={showFooter}>{children}</MobileLayout>
      : <MainLayout>{showUserLayout ? <UserLeftLayout>{children}</UserLeftLayout> : children}</MainLayout>)
    : <>{children}</>;
};

const mapStateToProps = (state: RootState) => {
  return {
    history: state?.historyReducer.history,
  };
};

export default connect(mapStateToProps)(Layout);