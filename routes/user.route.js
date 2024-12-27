import express from "express";
import { LoggedUser, LogOut, Products, Register } from "../controllers/user.controller.js";
import { middleware } from "../middleware/middleware.js";
const userRoutes = express.Router();

userRoutes.post("/register",Register)
userRoutes.get("/logout",LogOut)
userRoutes.get("/products",middleware,Products)
userRoutes.get("/verifiedUser",middleware,LoggedUser)

export default userRoutes;