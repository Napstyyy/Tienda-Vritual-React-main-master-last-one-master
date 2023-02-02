import db from "../database/db.js"; //importamos la conexion con la base de datos

import { DataTypes } from "sequelize"; //importamos DataType para especificar el tipo de dato que queremos guardar

const ProductsModel = db.define ('inventories',{ //definimos un modelo para la base de datos, en este caso es un modelo para la tabla inventories
    productName: {type: DataTypes.STRING}, //productName de tipo string
    price: {type: DataTypes.NUMBER}, //price de tipo number
    description: {type: DataTypes.TEXT}, //description de tipo text
    img1: {type: DataTypes.TEXT}, //img1 de tipo text
    img2: {type: DataTypes.TEXT}, //img2 de tipo text
    img3: {type: DataTypes.TEXT}, //img3 de tipo text
    stockMax: {type: DataTypes.INTEGER}, //stockMax de tipo number
    stockMin: {type: DataTypes.INTEGER}, //stockMin de tipo number
    stock: {type: DataTypes.INTEGER} //stock de tipo number
});

export default ProductsModel; //exportamos el modelo de base de datos