import express from "express";
import { getAllUsers, createUser, updateUser, getUser } from "../controllers/UserController.js";
const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)

export default router;