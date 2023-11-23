import React from 'react';
import { RightOutlined } from '@ant-design/icons';
import { generateKey } from '@/utils/lib';

export interface PathArrayElmInterface {
    name: string;
    onClick?: () => void;
    clickable?: boolean;
}

export interface RenderProductPathPropsInterface {
    pathArray?: PathArrayElmInterface[];
    className?: string;
}

const RenderProductPath = (props: RenderProductPathPropsInterface) => {
    const { pathArray, className } = props;

    return (
        <div className={className ? className : 'prod-path-container'}>
            {
                pathArray?.map((elm, idx) => (
                    <div className={`name-container`} key={`qdhV1B5un3-${idx}`}>
                        <a className={`${idx > 0 ? 'mlr-10' : 'mr-10'} ${elm.clickable ? 'prod-path-clickable' : ''}`} onClick={elm.onClick}>{elm.name}</a>
                        {
                            idx + 1 < pathArray.length &&
                            <RightOutlined />
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default RenderProductPath;