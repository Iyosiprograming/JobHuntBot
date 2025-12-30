import express from "express";
import { registerUser , updateFilter } from "../Controllers/userController.js";

const router = express.Router();

// Register User
router.post("/create", registerUser)
// update filter
router.post("/updateFilter", updateFilter)

export default router