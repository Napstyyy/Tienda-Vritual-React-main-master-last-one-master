import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlog, updateBlog, bookProduct, buyProducts } from "../controllers/BlogControllers.js";
const router = express.Router();

router.get('/', getAllBlogs)
router.put('/buy', buyProducts)
router.get('/book/:id', bookProduct)
router.get('/:id', getBlog)
router.post('/', createBlog)
router.put('/:id', updateBlog)
router.delete('/:id', deleteBlog)

export default router;