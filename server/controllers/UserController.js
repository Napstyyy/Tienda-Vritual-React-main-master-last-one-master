import UserModel from "../models/UserModel.js"; //importacion de el modelo de la base de datos correspondiente a los usuarios de el aplicativo

export const getAllUsers = async (req,res) => { //funcion utilizada para obtener todos los usuarios que se encuentran en la base de datos, retorna un JSON con todos los usuarios de la base de datos,
    //resive una res que es la respuesta que se retornara al final
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        const Users  = await UserModel.findAll() //usamos el findAll de sequelize para buscar todos los usuarios en la base de datos y almacenarlos en la variable Users para posteriormente retornarla
        res.json(Users) //guardamos en res la conversion de Users en tipo JSON
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json({message: error.message})} //guardamos en la res el mensaje de error que haya tenido la peticion
}

// crear un registro
export const createUser = async (req,res) => { //funcion utilizada para crear un nuevo usuario, utiliza el objeto enviado en la peticion para crear un registro nuevo en la base de datos, retorna un JSON con todos los usuarios de la base de datos, 
    //resive una res que es la respuesta que se retornara al final y un req donde se encuentra el objeto con los IDs a buscar
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        await UserModel.create(req.body) //usamos el create de sequelize para crear un registro con lo que le enviamos en el cuerpo de la peticion
        res.json({ 'message': 'registro creado'}) //guardamos un mensaje en la respuesta para que se pueda saber en el front que el registro se creo correctamente
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json( {message: error.message})} //guardamos en la res el mensaje de error que haya tenido la peticion
}

export const updateUser = async (req,res) =>{ //funcion utilizada para actualizar usuarios, utiliza el objeto enviado en la peticion para actualizar un registro en la base de datos, retorna un mensaje de confirmacion 
    //resive una res que es la respuesta que se retornara al final y un req donde se encuentra el objeto con los IDs a buscar
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
        await UserModel.update(req.body, { //usamos el metodo update de sequelize para actualizar un registro de la base de datos en la tabla de users
            where: {id: req.params.id} //parametros que recibira la funcion findAll para hacer la busqueda de solo los IDs que se le pasen en la peticion
        })
        res.json({'message': 'registro actualizado'})//guardamos un mensaje en la respuesta para que se pueda saber en el front que el registro se creo correctamente
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json( {message: error.message})} //guardamos en la res el mensaje de error que haya tenido la peticion
}

export const getUser = async (req,res) => { //funcion utilizada para obtener usuarios por su ID y que se encuentran en la base de datos, retorna un JSON con todos los usuarios de la base de datos, 
    //resive una res que es la respuesta que se retornara al final y un req donde se encuentra el objeto con los IDs a buscar
    try { //sino hay ningun error al hacer la peticion ejecuta el contenido
       const user = await UserModel.findAll({ //usamos el findAll de sequelize para buscar todos los productos que coincidan con el ID en la base de datos y almacenarlos en la variable PRODUCTS para posteriormente retornarla
            where:{ id:req.params.id } //parametros que recibira la funcion findAll para hacer la busqueda de solo los IDs que se le pasen en la peticion
        })
        res.json(user[0]) //guardamos en res la conversion de user en tipo JSON
    } catch (error) { //si hay algun error ejecuta el contenido
        res.json( {message: error.message} )} //guardamos en la res el mensaje de error que haya tenido la peticion
}
