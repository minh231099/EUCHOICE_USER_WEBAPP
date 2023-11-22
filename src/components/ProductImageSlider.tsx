import { generateKey, waitForElementToExistByClassName } from "@/utils/lib";
import React, { useEffect } from "react";

interface propsInterface {
    images: string[];
}

const ProductImageSlider = (props: propsInterface) => {
    const { images } = props;
    const len = images.length;

    let sliderIndex = 1;

    useEffect(() => {
        if (document) {
            waitForElementToExistByClassName('prod-img-container').then(() => {
                waitForElementToExistByClassName('prod-img-img-position-container').then(() => {
                    if (images && images.length > 1) {
                        waitForElementToExistByClassName('prod-img-slider').then(() => {
                            showSliders(1);
                        });
                    } else {
                        showSliders(1);
                    }
                })
            });
        }
    }, []);

    const showSliders = (n: number) => {
        let i;
        let tmp = n;
        const imagesDiv = document.getElementsByClassName('prod-img-container');
        const smallImagesDiv = document.getElementsByClassName('prod-img-slider');
        const positionDiv = document.getElementsByClassName('prod-img-img-position');

        if (n > images.length) {
            tmp = 1;
        }
        if (n < 1) {
            tmp = imagesDiv.length;
        }

        for (i = 0; i < imagesDiv.length; i++) {
            const element = imagesDiv[i] as HTMLDivElement;
            element.style.display = "none";
        }
        for (i = 0; i < smallImagesDiv.length; i++) {
            smallImagesDiv[i].className = smallImagesDiv[i].className.replace(" slider-active", "");
        }

        for (i = 0; i < smallImagesDiv.length; i++) {
            positionDiv[i].className = positionDiv[i].className.replace(" position-active", "");
        }


        const elm = imagesDiv[tmp - 1] as HTMLDivElement;
        elm.style.display = "block";
        if (images.length > 1) {
            smallImagesDiv[tmp - 1].className += " slider-active";
        }
        positionDiv[tmp - 1].className += " position-active";

        sliderIndex = tmp;
    }

    const plusSlides = (n: number) => {
        sliderIndex += n;
        showSliders(sliderIndex);
    }

    return (
        <div className="slideshow-container">
            <div className="d-flex prod-img-img-position-container">
                {
                    images.map((_, idx) => (
                        <div
                            className='prod-img-img-position'
                            key={`prod-img-img-position-${idx}`}
                            style={{
                                width: `${100 / len}%`
                            }}
                        >
                        </div>
                    ))
                }
            </div>
            {
                images.map((img, idx) => (
                    <div className='prod-img-container fade' key={`prod-img-container-${idx}`}>
                        <img src={img} className='prod-img' />
                    </div>
                ))
            }
            {
                len > 1 &&
                <>
                    <a className="prev-slide-image" onClick={() => { plusSlides(-1) }}>❮</a>
                    <a className="next-slide-image" onClick={() => { plusSlides(1) }}>❯</a>
                </>
            }
            {
                len > 1 &&
                <div className="d-flex" style={{ justifyContent: 'center' }}>
                    <div className="prod-img-slider-container d-flex">
                        {
                            images.map((img, idx) => (
                                <div className='prod-img-slider' key={generateKey()} onClick={() => { showSliders(idx + 1) }}>
                                    <img src={img} className='prod-img-small' />
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductImageSlider;