import type { Request, Response } from "express"
import User from "../Models/userModel.js"


// Register User
export const registerUser = async(req:Request, res:Response) => {
    try {
        const {tgId, tgUsername} = req.body
        const existingUser = await User.findOne({tgId})
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const newUser = await User.create({
            tgId,
            tgUsername
        })  
        newUser.save()
        return res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: newUser // remove this it's for testing
        })
    } catch (error) {
        console.log("Error registering user:", error)
        res.status(500).json({
            success: false,
            message: "Error registering user",
            error // remove this it's for testing
        })
    }
}