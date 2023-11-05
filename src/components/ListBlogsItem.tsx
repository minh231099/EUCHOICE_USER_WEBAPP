import { convertToDateLL } from "@/utils/lib";
import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from 'react-i18next';

interface Props {
    item: {
        _id: string,
        title: string,
        createdAt: string,
        image: string,
        brief: string,
    }
}

const ListBlogsItem = (props: Props) => {
    const { item } = props;
    const { title, createdAt, image, brief } = item;

    const router = useRouter();
    const { t } = useTranslation();

    const onClickReadMore = (title: string, id: string) => {
        const titlePath = title.split(' ').join('-')
        router.push(`/blogs/${titlePath}-i.${id}`);
    }

    return (
        <div className="fo37ve30JB">
            <div className="xZBy7lO4H6">
                <img className="vW6erAxOPH" src={image} />
            </div>
            <div className="mDUCakFeTV">
                <div className="j8NE357MvW">
                    {convertToDateLL(createdAt)}
                </div>
                <div className="GUatHlVr3T">
                    {title}
                </div>
                <div className="o8GCk7Jvox">
                    {brief}
                </div>
                <div className="Rz4svPY2s5" onClick={() => { onClickReadMore(title, item._id) }}>
                    {t('ReadMore')}
                </div>
            </div>
        </div>
    )
}

export default ListBlogsItem;