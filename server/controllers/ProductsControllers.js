//importamos el modelo

import ProductsModel from "../models/ProductsModel.js"; //importamos el modelo de base de datos de los productos
import { productsStock, productMinStock } from "../main.js"; //importamos el arreglo que usaremos para la reserva de los productos
import { sendMail } from "../mail/mail.js"; //importamos el mail.js que se encarga de enviar un email al llegar al stock minimo

//mostrar todos los registros
export const getAllProducts = async (req, res) =>  //funcion utilizada para obtener todos los productos que se encuentran en la base de datos, retorna un JSON con todos los productos de la base de datos,
//resive una res que es la respuesta que se retornara al final
{
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        const PRODUCTS  = await ProductsModel.findAll() //usamos el findAll de sequelize para buscar todos los productos en la base de datos y almacenarlos en la variable PRODUCTS para posteriormente retornarla
        res.json(PRODUCTS) //guardamos en res la conversion de PRODUCTS en tipo JSON
    } catch (error) {//si hay algun error ejecuta el contenido
        res.json({message: error.message}) //guardamos en la res el mensaje de error que haya tenido la peticion
    }
}

//mostrar un registro
export const getProducts = async (req,res) =>  //funcion utilizada para obtener productos por su ID y que se encuentran en la base de datos, retorna un JSON con todos los productos de la base de datos, 
//resive una res que es la respuesta que se retornara al final y un req donde se encuentra el objeto con los IDs a buscar
{
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
       const PRODUCTS = await ProductsModel.findAll({ //usamos el findAll de sequelize para buscar todos los productos que coincidan con el ID en la base de datos y almacenarlos en la variable PRODUCTS para posteriormente retornarla
            where:{ id:req.params.id } //parametros que recibira la funcion findAll para hacer la busqueda de solo los IDs que se le pasen en la peticion
        })
        res.json(PRODUCTS[0])  //guardamos en res la conversion de PRODUCTS en tipo JSON
    } catch (error) {  //si hay algun error ejecuta el contenido
        res.json( {message: error.message} ) //guardamos en la res el mensaje de error que haya tenido la peticion
    }
}

// crear un registro
export const createProduct = async (req,res) => { //funcion utilizada para crear un nuevo producto, utiliza el objeto enviado en la peticion para crear un registro nuevo en la base de datos, retorna un mensaje de confirmacion
    //resive una res que es la respuesta que se retornara al final y un req donde se encuentra el objeto con los IDs a buscar
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        await ProductsModel.create(req.body) //usamos el create de sequelize para crear un registro con lo que le enviamos en el cuerpo de la peticion
        res.json({ 'message': 'registro creado' }) //guardamos un mensaje en la respuesta para que se pueda saber en el front que el registro se creo correctamente
    } catch (error) {  //si hay algun error ejecuta el contenido
        res.json( {message: error.message}) //guardamos en la res el mensaje de error que haya tenido la peticion
    }
}

//actualizar registro
export const updateProduct = async (req,res) =>{ //funcion utilizada para actualizar producto, utiliza el objeto enviado en la peticion para actualizar un registro en la base de datos, retorna un mensaje de confirmacion
    //resive una res que es la respuesta que se retornara al final y un req donde se encuentra el objeto con los IDs a buscar
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        await ProductsModel.update(req.body, { //usamos el metodo update de sequelize para actualizar un registro de la base de datos en la tabla de inventories
            where: {id: req.params.id} //parametros que recibira la funcion findAll para hacer la busqueda de solo los IDs que se le pasen en la peticion
        })
        res.json({ 'message': 'registro actualizado'}) //guardamos un mensaje en la respuesta para que se pueda saber en el front que el registro se creo correctamente
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json( {message: error.message}) //guardamos en la res el mensaje de error que haya tenido la peticion
    }
}
//eliminar registro

export const deleteProduct = async (req,res) =>{ //funcion utilizada para eliminar un producto, utiliza el objeto enviado en la peticion para eliminar un registro en la base de datos, retorna un mensaje de confirmacion
    //resive una res que es la respuesta que se retornara al final y un req donde se encuentra el objeto con los IDs a buscar
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        await ProductsModel.destroy(req.body, { //usamos el metodo destroy de sequelize para eliminar un registro de la base de datos en la tabla de inventories
            where: {id: req.params.id} //parametros que recibira la funcion findAll para hacer la busqueda de solo los IDs que se le pasen en la peticion
        })
        res.json({ 'message': 'registro borrado' }) //guardamos un mensaje en la respuesta para que se pueda saber en el front que el registro se creo correctamente
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json( {message: error.message}) //guardamos en la res el mensaje de error que haya tenido la peticion
    }
}

//Controlador que sera llamado dentro del frontend para poder de estar forma reservar o no un producto a un cliente dada la lista extraida en main.js
export const bookProduct = async (req, res) => { 
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        console.log(productsStock);
        //pregunta si la peticion es de tipo unbook, de esta forma le suma la cantidad del stock del id correspondiente al producto
        if (req.query.f === 'unbook'){
            productsStock[req.params.id]++;
            return res.json('Unbooked');
        //De lo contrario pregunta si es de tipo book, se le resta a la cantidad del stock de la lista extraida, para de esta forma "simular" la reservacion
        } else if (req.query.f === 'book') {
            if (productsStock[req.params.id] == 0) return res.json('Stockout')//Cuando el stock llegue a 0, se informa que no hay mas productos
            productsStock[req.params.id]--;
            return res.json('Booked');
        } 
        res.status(400).json('Bad request');
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json({message: error.message}); //guardamos en la res el mensaje de error que haya tenido la peticion
    }
}

const updateContent = async (product, quantity) => { //funcion utilizada para actualizar el stock de un producto, utiliza el objeto enviado en la peticion para actualizar un registro en la base de datos, no retorna nada
    const stock = await ProductsModel.findAll({ //usamos el findAll de sequelize para buscar todos los productos en la base de datos y almacenarlos en la variable PRODUCTS para posteriormente retornarla
        attributes: ['id', 'stock'],
        where:{ id: product } //parametros que recibira el metodo findAll para hacer la busqueda de solo los IDs que se le pasen en la peticion
    })
    console.log(quantity);
    await ProductsModel.update({stock: stock[0].dataValues.stock - quantity[product]}, { //usamos el metodo update de sequelize para actualizar el stock de el producto
        where: {id: product} //parametros que recibira el metodo update para hacer la busqueda de solo los IDs que se le pasen en la peticion
    })
    if (productMinStock[product].stockMin >= (stock[0].dataValues.stock - quantity[product])){ //funcion para ver si se supero el minimo de stock y asi notificar a el correo electronico
        sendMail({id: product}); //llamado a la funcion con los parametros de el producto que llegue a su stock minimo
    }
}

export const buyProducts = async (req, res) => {
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        console.log(typeof(req.body));
        Object.keys(req.body).forEach(product => updateContent(product, req.body));
        res.json("Successful purchase");
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json(error.message);   //guardamos en la res el mensaje de error que haya tenido la peticion
    }
}