import { API_URLS } from "@/api/apiURL";
import ListBlogsItem from "@/components/ListBlogsItem";
import { RootState } from "@/redux";
import { getListBlog } from "@/redux/actions/blogAction";
import { useAppDispatch } from "@/redux/hooks";
import { BlogInterfaces } from "@/redux/reducers/blogs/interfaces";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useSearchParams } from 'next/navigation'
import { useRouter } from "next/router";
import { Pagination, Spin } from "antd";

interface BlogsProps {
    isFetching: boolean | null | undefined,
    listBlogs: BlogInterfaces[] | null | undefined,
    pagination: {
        page: number,
        limit: number,
        totalData: number,
    } | null | undefined,
}

const Blogs = (props: BlogsProps) => {
    const { listBlogs, pagination, isFetching } = props;
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { page } = router.query;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getListBlog(currentPage));
    }, [currentPage]);

    useEffect(() => {
        if (page && typeof page === 'string')
            setCurrentPage(parseInt(page));
    }, [page]);

    const onChangeCurrentPage = (page: number) => {
        setCurrentPage(page);
        router.query.page = page.toString();
        router.push(router);
    }

    return (
        <div className="blogs-page-container">
            <div className={`FnglPNnWAo ${isFetching ? 'active' : ''}`}>
                {isFetching && <Spin size="large" />}
            </div>
            <div className="VNAMgHYWSk">
                {
                    listBlogs?.map((item) => <ListBlogsItem item={item} key={item._id} />)
                }
            </div>
            <div className="NZRJB9P9QE">
                {
                    pagination?.limit! <= pagination?.totalData! ?
                        <Pagination
                            defaultCurrent={currentPage}
                            total={pagination?.totalData}
                            pageSize={pagination?.limit}
                            onChange={onChangeCurrentPage}
                        /> : null
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state: RootState) => {
    return {
        isFetching: state.blogReducer?.isFetching,
        listBlogs: state.blogReducer?.listBlogs,
        pagination: state.blogReducer?.pagination,
    };
};
export default connect(mapStateToProps)(Blogs);