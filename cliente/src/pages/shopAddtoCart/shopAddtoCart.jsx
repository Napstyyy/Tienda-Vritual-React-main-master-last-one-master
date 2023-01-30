import React from 'react';
import { Product } from './productAddtoCart';
import './shopAddtoCart.css';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const URI = 'http://localhost:3001/blogs/';

export const ShopAddtoCart = () => {

    const[blogs, setBlogs] = useState([])
    useEffect(() => {
        getBlogs()
    }, []);

    const getBlogs = async () => {
        const res = await axios.get(URI)
        setBlogs(res.data)
    }
    return (
        <div className="shop">
            <div className="shopTitle">
                <h1>MateoTech Shop</h1>
            </div>
            <div className="products"> 
                {blogs.map((product) => (
                    <Product data={product} />
                ))}
            </div>
        </div>
    )
};