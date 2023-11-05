import '@/styles/globals.css';

import React, { useEffect } from 'react';
import Head from 'next/head';

import type { AppProps } from 'next/app'

import { Provider } from 'react-redux';
import store from '../redux';
import { ConfigProvider } from 'antd';
import theme from '../theme/themeConfig';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import vnTranslation from '../locales/vn.json';
import LOCAL_STORE from '../constants/storage_variable';
import Layout from './layout';
import moment from 'moment';

const resources = {
  en: { translation: enTranslation.translation },
  vn: { translation: vnTranslation.translation },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'vn',
  fallbackLng: 'vn',
  interpolation: {
    escapeValue: false,
  },
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const selectedLanguage = localStorage.getItem(LOCAL_STORE.language) ? localStorage.getItem(LOCAL_STORE.language) : 'vn';
    const lng = selectedLanguage || 'vn';

    i18n.changeLanguage(lng);

    document.documentElement.lang = lng;
    moment.locale(lng === 'vn' ? 'vi' : lng);
  }, []);

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </Provider>
  )
}
