import db from "../database/db.js";//se importa la base de datos para establecer el userModel mas abajo

import { DataTypes } from "sequelize";//Se importa DataTypes sequelize para definir el tipo de datos que se desea extraer

//Modelo de usuarios a utilizar
const UserModel = db.define ('users',{//de la base de datos, la tabla users, se importan los datos:
    username: {type: DataTypes.STRING},//Nombre de usuario que es de tipo string
    password: {type: DataTypes.STRING},//Contraseña que es de tipo string
    adress: {type: DataTypes.STRING},//Direccion que es de tipo string
    telephone: {type: DataTypes.STRING},//Telefono que también es de tipo string
    email: {type: DataTypes.STRING},//El email de tipo string
});

export default UserModel;//Se exporta el modelo completo