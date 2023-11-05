import React from "react"

interface ProductCardPropsInf {
    sourceImg: any | null | undefined,
    title: string | null | undefined,
    price: string | null | undefined,
    onClick: () => void
}

const ProductCard = (props: ProductCardPropsInf) => {
    return (
        <div className="product-card-container">
            <div className="product-card" onClick={() => { props.onClick() }}>
                <div className="product-image-wrapper">
                    <img className="product-image" src={props.sourceImg} alt="Product Image"></img>
                </div>
                <div className="product-details">
                    <div className="product-price"><strong>{props.price}</strong> <sup>đ</sup></div>
                    <div className="product-title">{props.title}</div>
                    <div className="mz-rating__group-col">
                        <div className="mz-rating__rating-star-field">
                            <i className="fa fa-star star-icon"></i>
                            <i className="fa fa-star star-icon"></i>
                            <i className="fa fa-star star-icon"></i>
                            <i className="fa fa-star star-icon"></i>
                            <i className="fa fa-star-half-o star-icon"></i>
                        </div>
                        <div className="mz-rating__label-field">
                            <span className="mz-rating__label">
                                (13.27K)
                            </span>
                        </div>
                    </div>
                    {/* <a href="#" className="product-button">Detail</a> */}
                </div>
            </div>
        </div>
    )
}
export default ProductCard;