import db from "../database/db.js";

import { DataTypes } from "sequelize";

const BlogModel = db.define ('inventories',{
    productName: {type: DataTypes.STRING},
    price: {type: DataTypes.NUMBER},
    description: {type: DataTypes.TEXT},
    img1: {type: DataTypes.TEXT},
    img2: {type: DataTypes.TEXT},
    img3: {type: DataTypes.TEXT},
    stockMax: {type: DataTypes.INTEGER},
    stockMin: {type: DataTypes.INTEGER},
    stock: {type: DataTypes.INTEGER}
});

export default BlogModel;