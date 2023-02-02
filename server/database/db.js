import { Sequelize } from 'sequelize'; //importacion de sequelize (ORM (Object Relational Mapping ) )

const db = new Sequelize('ecommerce', 'root', '123456789', { //funcion utilizada para crear la conexion con la base de datos
    host:'localhost', //direccion en la que esta la base de datos
    dialect:'mysql' //tipo de base de datos 
});
export default db; //exportamos la conexion con la base de datos