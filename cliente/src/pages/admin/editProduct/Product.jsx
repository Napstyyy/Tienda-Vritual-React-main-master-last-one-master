import React from "react";
import { useState } from "react";
import axios from 'axios';

const URI = 'http://localhost:3001/blogs/';

export const Product = (props) => {
    const { id, productName, price, img1, img2, img3, stockMax, stockMin } = props.data;
    const [priceHook, setPrice] = useState('');
    const [maxStock, setMaxS] = useState('');
    const [minStock, setMinS] = useState('');
    

    const update = async (e) => {
        e.preventDefault();
        await axios.put(URI+id+'/', { price: priceHook, stockMax: maxStock, stockMin: minStock });
    }

    return (
        <div className="product">
            <div className="slide-var">
                <ul>
                    <li><img src={img1} alt={productName}/></li>
                    <li><img src={img2} alt={productName}/></li>
                    <li><img src={img3} alt={productName}/></li>
                </ul>
            </div>
            <div className="description"> 
                <p> 
                    <b>{productName}</b> 
                </p>
                <p> ${price}</p>
                <p> Max Stock: {stockMax}</p>
                <p> Min Stock: {stockMin}</p>
                <form onSubmit={update} action="/auth" method="post">
                    <input 
                    onChange={ (e) => setPrice(e.target.value)}
                    type="text" name="pass" id="pass" placeholder="New Prize"/>
                    <input 
                    onChange={ (e) => setMaxS(e.target.value)}
                    type="text" name="pass" id="pass" placeholder="New MaxStock"/>
                    <input 
                    onChange={ (e) => setMinS(e.target.value)}
                    type="text" name="pass" id="pass" placeholder="New MinStock"/>
                    <input type="submit" className="btn-login" value="Edit" />
                </form>
            </div>
        </div> 
    );
};