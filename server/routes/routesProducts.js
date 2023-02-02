import express from "express"; //importamos express para poder usar las rutas
import { createProduct, deleteProduct, getAllProducts, getProducts, updateProduct, bookProduct, buyProducts } from "../controllers/ProductsControllers.js"; //importamos los controladores de la base de datos de los productos
const router = express.Router(); //definimos un tipo de dato router

router.get('/', getAllProducts) //direccion en la cual se hara una peticion get para obtener todos los productos de la base de datos
router.put('/buy', buyProducts) //direccion en la cual se hara una peticion put para quitar los productos de la base de datos
router.get('/book/:id', bookProduct) //direccion en la cual se hara una peticion get para reservar los productos
router.get('/:id', getProducts) //direccion en la cual se hara una peticion get para obtener todos los productos que coincidan con el ID en la base de datos
router.post('/', createProduct) //direccion en la cual se hara una peticion post para crear un registro en la base de datos
router.put('/:id', updateProduct) //direccion en la cual se hara una peticion put para actualizar un registro de la base de datos
router.delete('/:id', deleteProduct) //direccion en la cual se hara una peticion delete para eliminar un registro de la base de datos

export default router; //exportamos las rutas