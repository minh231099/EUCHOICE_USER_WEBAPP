import React from 'react';
import MobileHeader from '@/components/MobileHeader';
import Footer from '@/components/Footer';

interface CustomProps {
    children: React.ReactNode;
    showFooter: boolean;
}


const MobileLayout: React.FC<CustomProps> = ({ children, showFooter }) => {
    return (
        <div className='mobile_layout'>
            <MobileHeader />
            <main className='main_body'>{children}</main>
            {showFooter && <Footer />}
        </div>
    );
};

export default MobileLayout;