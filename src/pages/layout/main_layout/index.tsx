import React from 'react';
import { LayoutProps } from '../../../redux/reducers/layout/interface';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='main_layout'>
      <Header />
      <main className='main_body'>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;