import type { Request, Response } from "express";
import User from "../Models/userModel.js";

// Register User
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { tgId, tgUsername } = req.body;

    const existingUser = await User.findOne({ tgId });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = new User({ tgId, tgUsername });
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({
      success: false,
      message: "Error registering user",
    });
  }
};

// Update Filter
export const updateFilter = async (req: Request, res: Response) => {
  try {
    const { tgId, filter } = req.body;

    if (!Array.isArray(filter)) {
      return res.status(400).json({
        success: false,
        message: "Filter must be an array of strings",
      });
    }

    const user = await User.findOne({ tgId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.filter = filter;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Filter updated successfully",
    });
  } catch (error) {
    console.error("Error updating filter:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating filter",
    });
  }
};
