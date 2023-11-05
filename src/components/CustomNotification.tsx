import React, { useEffect, useState } from 'react';

interface ShowFunction {
    message: string;
    visible: boolean;
}

const CustomNotification = (props: ShowFunction) => {
    const { message, visible } = props

    return (
        <div className={`notification ${visible ? 'visible' : 'hidden'}`}>
            <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
            </div>
            <div className='q9jDmizXOm'>
                <span>{message}</span>
            </div>
        </div>
    )
}


export default CustomNotification;