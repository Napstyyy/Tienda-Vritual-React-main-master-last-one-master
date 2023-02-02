import express from "express";  //importamos express para poder usar las rutas
import { getAllUsers, createUser, updateUser, getUser } from "../controllers/UserController.js"; //importamos los controladores de la base de datos de los usuarios
const router = express.Router(); //definimos un tipo de dato router

router.get('/', getAllUsers) //direccion en la cual se hara una peticion get para obtener todos los usuarios de la base de datos
router.get('/:id', getUser) //direccion en la cual se hara una peticion get para obtener todos los usuarios que coincidan con el ID en la base de datos
router.post('/', createUser) //direccion en la cual se hara una peticion post para crear un registro en la base de datos
router.put('/:id', updateUser) //direccion en la cual se hara una peticion put para actualizar un registro de la base de datos

export default router; //exportamos las rutas