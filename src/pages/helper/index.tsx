import React from "react";
import { useRouter } from "next/router";

const logo = '/logo.png';

interface HelperPropsInterface {
}

const Helper = (props: HelperPropsInterface) => {
    const router = useRouter();

    return (
        <div>
            <div className="jGuLCEirpK">
                <div className="j85X16YDAP" onClick={() => router.push('/')}>
                    <img className="C5d6e393DV" src={logo} alt="Logo" />
                </div>
                <span className="header-text"></span>
            </div>
        </div>
    )
}

export default Helper;