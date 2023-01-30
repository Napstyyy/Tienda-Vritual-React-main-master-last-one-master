//importamos el modelo

import BlogModel from "../models/BlogModel.js";
import { productsStock } from "../main.js";
//mostrar todos los registros
export const getAllBlogs = async (req,res) => {
    try {
        const blogs  = await BlogModel.findAll()
        res.json(blogs)
    } catch (error) {
        res.json({message: error.message})
    }
}

//mostrar un registro
export const getBlog = async (req,res) => {
    try {
       const blog = await BlogModel.findAll({
            where:{ id:req.params.id }
        })
        res.json(blog[0])
    } catch (error) {
        res.json( {message: error.message} )
    }
}

// crear un registro
export const createBlog = async (req,res) => {
    try {
        await BlogModel.create(req.body)
        res.json({
            'message': 'registro creado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}

//actualizar registro
export const updateBlog = async (req,res) =>{
    try {
        await BlogModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro actualizado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}
//eliminar registro

export const deleteBlog = async (req,res) =>{
    try {
        await BlogModel.destroy(req.body, {
            where: {id: req.params.id}
        })
        res.json({
            'message': 'registro borrado'
        })
    } catch (error) {
        res.json( {message: error.message})
    }
}

export const bookProduct = async (req, res) => {
    try {
        console.log(productsStock);
        if (req.query.f === 'unbook'){
            productsStock[req.params.id]++;
            return res.json('Unbooked');
        } else if (req.query.f === 'book') {
            if (productsStock[req.params.id] == 0) return res.json('Stockout')
            productsStock[req.params.id]--;
            return res.json('Booked');
        } 
        res.status(400).json('Bad request');
    } catch (error) {
        res.json({message: error.message});
    }
}

const updateContent = async (product, quantity) => {
    const stock = await BlogModel.findAll({
        attributes: ['id', 'stock'],
        where:{ id: Number(product) }
    })
    console.log(typeof(product));
    await BlogModel.update({stock: stock[0].dataValues.stock - quantity[product]}, {
        where: {id: Number(product)}
    })
    // if (productMinStock[product].stockMin >= stock[0].dataValues.stock - quantity[product]){
    //     sendMail({id: product, name: productMinStock[product].name});
    // }
}

export const buyProducts = async (req, res) => {
    try {
        console.log(req.body);
        Object.keys(req.body).forEach(product => updateContent(product, req.body));
        res.json("Successful purchase");
    } catch (error) {
        res.json(error.message);   
    }
}