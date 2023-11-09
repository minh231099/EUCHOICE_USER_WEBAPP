import { API_URLS } from "@/api/apiURL";
import apiCall from "@/helper/apiCall";
import { Card } from "antd";
import { useRouter } from "next/router";
import React from "react";

const Category = (props: any) => {
    const router = useRouter();
    return (
        <div className="page-container">
            <div className="head-category">
                Our Categories
            </div>
            <div className="category-container">
                {props?.category?.map((item: any) => (
                    <Card
                        className="card-category"
                        onClick={() => { router.push({ pathname: `/category/${item.name}` }) }}
                    >
                        <img className="img-category"
                            src="https://quomodothemes.website/html/shopus/assets/images/homepage-one/category-img/dresses.webp">
                        </img>
                        <p className="text-category">{item.name}</p>
                    </Card>
                ))}
            </div>
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