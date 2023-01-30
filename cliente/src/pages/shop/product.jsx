import React from "react";

export const Product = (props) => {
    const { productName, price, description, img1, img2, img3 } = props.data;
    return (
        <div className="product">
            <div className="slide-var">
                <ul>
                    <li><img src={img1} alt={productName}/></li>
                    <li><img src={img2} alt={productName}/></li>
                    <li><img src={img3} alt={productName}/></li>
                </ul>
            </div>
            <div className="descripcion">
                <p>{description}</p>
            </div>
            <div className="description"> 
                <p> 
                    <b>{productName}</b> 
                </p>
                <p> ${price}</p>
            </div>
        </div> 
    );
};