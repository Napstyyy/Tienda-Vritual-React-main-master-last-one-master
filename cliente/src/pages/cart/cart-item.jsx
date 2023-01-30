import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";

export const CartItem = (props) => {
    const { id, productName, price, img1 } = props.data;
    const { cartItems, addToCart, removeFromCart } = useContext(ShopContext);
    return  (
        <div className="cartItem">
            <img src={img1} />
            <div className="description">
                <p> 
                    <b> {productName} </b>
                </p>
                <p> ${price} </p>
                <div className="countHandler">
                    <button onClick={() => removeFromCart(id)}> - </button>
                    <input value={cartItems[id]} />
                    <button onClick={() => addToCart(id)}> + </button>
                </div>
            </div>
        </div>
    );
};