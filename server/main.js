import cors from 'cors';//Intercambio de Recursos de Origen Cruzado (CORS) es una característica de seguridad del navegador que restringe las solicitudes HTTP de origen cruzado que se inician desde secuencias de comandos que se ejecutan en el navegador.
import db from './database/db.js'; //importamos la conexcion con la base de datos
import express from 'express'; //importamos express para el uso del servidor
import productsRoutes from './routes/routesProducts.js'; //importamos las rutas de los productos
import userRoutes from './routes/routesUser.js'; //importamos las rutas que usaremos con los usuarios
import ProductsModel from './models/ProductsModel.js'; //importamos el modelo de base de datos de los productos

const app = express(); //usamos express para crear una constante app
app.use(cors());  //usamos cors para la seguridad en la conexion con la base de datos
app.use(express.json());
app.use('/products', productsRoutes); //definimos la ruta que usaremos para el modelos de productos
app.use('/users', userRoutes); //definimos la ruta que usaremos para el modelos de usuarios

try { //si no hay ningun problema
    db.authenticate() //autentificamos las credenciales de la base de datos
    console.log('conexion exitosa a la bd'); //imprimimos que todo salio correcto
} catch (error) { //si hay algun problema
    console.log(`el error de conexion fue ${error}`); //mostramos el error de conexion
}

const PORT = process.env.PORT || 3001; //definimos el puerto de nuestro servidor

app.listen(PORT, ()=>{ //prendemos el servidor para que escuche las peticiones en el puerto (PORT)
    console.log(`server running on port ${PORT}`); //imprimimos en consola que el servidor se esta corriendo
})

const products = await ProductsModel.findAll({ //funcion usada para obtener todos los productos de la base de datos y guardarlos en nuestro arreglo del servidor
    attributes: ['id', 'stock', 'stockMin', 'productName'] //atributos que retornara la funcion al hacer la busqueda (para que no nos retorne todo el registro)
})


let productsStock = {} //objeto en el que se guardara el stock actual de los productos en la base de datos
let productMinStock = {} //objeto en el que se guardara el stock minimo actual de los productos en la base de datos

products.forEach(product => { //funcion para que guarde cada uno de los productos en nuestro objeto
    productsStock[product.dataValues.id] = product.dataValues.stock; //guardamos el stock actual acompañado de su id
});
products.forEach(product => {
    productMinStock[product.dataValues.id] = {stockMin: product.dataValues.stockMin, productName: product.dataValues.productName}; //guardamos el stock minimo y el nombre del producto acompañado de su id
});
console.log(productMinStock); 
export {productsStock, productMinStock};//exportacion de los objetos para que sean usados en otros lugares

//tabla inventories
// id - productName - price - createdAt- updatedAt - description - img1 - img2 - img3 - stockMax - stockMin - stock

//tabla users
// id - username - password - createdAt- updatedAt - adress - telephone - email