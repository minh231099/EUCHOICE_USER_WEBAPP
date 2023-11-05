import { API_URLS } from "@/api/apiURL";
import apiCall from "@/helper/apiCall";
import React from "react";

interface IntroducePropsInterface {
    aboutUs: string;
}

const Introduce = (props: IntroducePropsInterface) => {
    const { aboutUs } = props;

    return (
        <div dangerouslySetInnerHTML={{ __html: aboutUs }}>
        </div>
    )
}

export const getServerSideProps = async () => {
    const api = API_URLS.INTRODUCE.getAboutUs();
    const { response } = await apiCall({ ...api });

    return {
        props: {
            aboutUs: response?.data?.htmlString || ''
        }
    }
}

export default Introduce;