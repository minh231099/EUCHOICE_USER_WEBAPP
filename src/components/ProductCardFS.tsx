import React from "react"
const fireFS = '/luachua.png';

interface ProductCardPropsInf {
    sourceImg: any | null | undefined,
    title: string | null | undefined,
    price: string | null | undefined,
    amount: string | null | undefined,
    onClick: () => void
}

const ProductCardFS = (props: ProductCardPropsInf) => {
    return (
        <div className="product-card-container">
            <div className="product-card" onClick={() => { props.onClick() }}>
                <div className="product-image-wrapper">
                    <img className="product-image" src={props.sourceImg} alt="Product Image"></img>
                </div>
                <div className="product-details">
                    <div className="product-price product-price-fs"><strong>{props.price}</strong> <sup>đ</sup></div>
                    <div className="product-title product-title-fs">{props.title}</div>
                    <div className="product-amount-fs"><img className="img-amount-fs" src={fireFS}></img><span className="prod-amount-text">Only {props.amount} left</span></div>
                </div>
            </div>
        </div>
    )
}
export default ProductCardFS;