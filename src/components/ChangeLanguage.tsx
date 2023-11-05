import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import LOCAL_STORAGE from '../constants/storage_variable';

import { IoMdArrowDropdown } from "react-icons/io";
import { RiGlobalLine } from "react-icons/ri";

const keyMap = {
    vn: 'Tiếng Việt',
    en: 'English'
}

const ChangeLanguage = () => {
    const { t, i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [curLng, setCurLng] = useState<'vn' | 'en'>('vn');

    useEffect(() => {
        const tmp: string = localStorage.getItem(LOCAL_STORAGE.language) || '';
        setCurLng(tmp as 'vn' | 'en');
    }, []);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const changeLanguage = (lng: string) => {
        localStorage.setItem(LOCAL_STORAGE.language, lng);
        setCurLng(lng as 'vn' | 'en');
        i18n.changeLanguage(lng);
        setIsOpen(!isOpen);
    };

    return (
        <div className="select_language_container">
            <div className="dropdown-toggle d-flex" onClick={handleToggle}>
                <div className="lng_icon"><RiGlobalLine /></div>
                <div className="lng-text">{keyMap[curLng]}</div>
                <div className="dropdown_icon"><IoMdArrowDropdown /></div>
            </div>
            {
                isOpen &&
                <div>
                    <div className="dropdown-content">
                        <div className="dropdown-option" onClick={() => changeLanguage('vn')}>Tiếng Việt</div>
                        <div className="dropdown-option" onClick={() => changeLanguage('en')}>English</div>
                    </div>
                    <div className="communication-box-arrow"></div>
                </div>
            }
        </div>
    );
};

export default ChangeLanguage;;