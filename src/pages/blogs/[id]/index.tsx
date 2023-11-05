import { API_URLS } from '@/api/apiURL';
import { RootState } from '@/redux';
import { getBlogInfo } from '@/redux/actions/blogAction';
import { useAppDispatch } from '@/redux/hooks';
import { BlogInterfaces } from '@/redux/reducers/blogs/interfaces';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

interface BlogPageProps {
    blogInfo: BlogInterfaces | undefined | null;
}

const BlogDetails = (props: BlogPageProps) => {
    const { blogInfo } = props;
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [cleanBlogInfo, setCleanBlogInfo] = useState<BlogInterfaces>();

    const { id } = router.query;

    useEffect(() => {
        if (id && typeof id === 'string') {
            const tmp = id.split('-');
            const blogId = tmp[tmp.length - 1].split('.')[1];
            dispatch(getBlogInfo(blogId));
        }
    }, [id]);

    useEffect(() => {
        if (blogInfo) {
            const content = blogInfo.content.replaceAll('<figure>', '').replaceAll('</figure>', '').replaceAll('<img', '<img class="vLv4CZQ3Es"');
            setCleanBlogInfo({ ...blogInfo, content });
        }
    }, [blogInfo]);

    return (
        <div className='blog-details-container'>
            <div className='Pk4JpUa0w2'>
                <div className='blog-header'>
                    <div className='jyRAp30ZG6'>
                        {blogInfo?.title}
                    </div>
                    <div className='AZQq8ur7SM'>
                        {blogInfo?.brief}
                    </div>
                    <img className='mKEF9bGKoe' src={blogInfo?.image} />
                </div>
                <div className='blog-body' dangerouslySetInnerHTML={{ __html: cleanBlogInfo?.content! }}>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        blogInfo: state.blogReducer?.blogInfo,
    };
};

export default connect(mapStateToProps)(BlogDetails);