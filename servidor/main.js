import Express from 'express';
import cors from 'cors';
import db from './database/db.js';

import blogRoutes from './routes/routesBlogs.js';
import userRoutes from './routes/routesUser.js';
import BlogModel from './models/BlogModel.js';

const app = Express();
app.use(cors());
app.use(Express.json());
app.use('/blogs', blogRoutes);
app.use('/users', userRoutes);

try {
    db.authenticate()
    console.log('conexion exitosa a la bd');
} catch (error) {
    console.log(`el error de conexion fue ${error}`);
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})

const products = await BlogModel.findAll({
    attributes: ['id', 'stock', 'stockMin', 'productName']
})


let productsStock = {}
let productMinStock = {}
products.forEach(product => {
    productsStock[product.dataValues.id] = product.dataValues.stock;
});
products.forEach(product => {
    productMinStock[product.dataValues.id] = {stockMin: product.dataValues.stockMin, productName: product.dataValues.productName};
});
console.log(productMinStock);
export {productsStock, productMinStock};//exportation

