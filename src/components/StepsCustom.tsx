import { generateKey } from '@/utils/lib';
import React from 'react';

interface ItemType {
    title: string;
    icon: any;
}

interface StepCustomProps {
    items: ItemType[];
    current: number;
}

const StepsCustom = (props: StepCustomProps) => {
    const { items, current } = props;
    return (
        <div className='Z6Gc3maKKd'>
            {
                items.map((item, index) => (
                    <div className={`qjMyXh09iM ${index < current - 1 ? 'done' : ''} ${index == current - 1 ? 'active' : ''}`} key={`obwE8oyLQI-${index}`}>
                        <div className='JewLNWYpXj'>
                            <div className='rNAsGxQfoM'>{item.icon}</div>
                        </div>
                        <div className='WKDOczktmK'>{item.title}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default StepsCustom;