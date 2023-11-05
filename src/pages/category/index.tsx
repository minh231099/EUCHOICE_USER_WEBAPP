import { API_URLS } from "@/api/apiURL";
import apiCall from "@/helper/apiCall";
import Link from "next/link";
import React from "react";

const Category = (props: any) => {
    return (
        <div>
            {props?.category?.map((item: any) => (
                <Link key={item._id} href={`/category/${item.name}`}>
                    {item.name}
                </Link>
            ))}
        </div>
    )
}

export const getServerSideProps = async () => {
    const api = API_URLS.CATEGORY.getListCategory();
    const { response, error } = await apiCall({ ...api });
    return {
        props: {
            category: response?.data || null
        }
    }
}

export default Category;