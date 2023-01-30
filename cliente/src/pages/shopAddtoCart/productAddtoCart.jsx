import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const Product = (props) => {
    const { id, productName, price, description, img1, img2, img3 } = props.data;
    const { addToCart, cartItems} = useContext(ShopContext);

    const cartItemAmount = cartItems[id];
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
            <button className="addToCartBttn" onClick={() => addToCart(id)}> 
                Add To Cart {cartItemAmount > 0 && <> ({cartItemAmount})</>}
            </button>
        </div> 
    );
};