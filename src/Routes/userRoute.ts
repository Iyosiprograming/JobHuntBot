import express from "express";
import { registerUser } from "../Controllers/userController.js";

const router = express.Router();

// Register User
router.post("/create", registerUser)

export default router