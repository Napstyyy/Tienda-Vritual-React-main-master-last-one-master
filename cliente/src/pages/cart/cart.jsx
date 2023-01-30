import React, {useContext} from 'react';
import { ShopContext } from "../../context/shop-context";
import { CartItem } from './cart-item'; 
import "./cart.css";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/blogs/';

export const Cart = () => {
    const { cartItems, getTotalCartAmount } = useContext(ShopContext);
    const totalAmount = getTotalCartAmount();
    const navigate = useNavigate();

    const[blogs, setBlogs] = useState([])
    useEffect(() => {
        getBlogs()
    }, []);

    const getBlogs = async () => {
        const res = await axios.get(URI)
        setBlogs(res.data)
    }

    const buy = async (e) => {
        e.preventDefault();
        await axios.put(URI + 'buy', cartItems)
        .then((res) => {
            console.log(res);
        }).catch((err) => {
            alert(err.message)
        });
    }

    return (
        <div className="cart">
            <div> 
                <h1> Your Cart Items</h1>
            </div>
            <div className="cartItems">
                {blogs.map((product) => {
                    if (cartItems[product.id] !== 0) {
                        return <CartItem data={product} />;
                    }
                })}
            </div>
            {totalAmount > 0 ?
            <div className="checkout">
                <p> Subtotal: ${totalAmount}</p>
                <button onClick={() => navigate ("/shop")}> Continue Shopping</button>
                <button onClick={buy}> Checkout </button>
            </div>
            : <h1> Your Cart is Empty </h1>}
        </div>
    )
};