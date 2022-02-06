import express from "express";
import { check } from "express-validator";
import UserController from "../Controllers/authController";

const authRoutes = express.Router();

authRoutes.post("/registration", [
	check("userName", "Please, insert user name... ").notEmpty(),
	check("password", "Password should contain 4 - 10 signs... ").isLength({
		min: 4,
		max: 10,
	}),
	UserController.registration,
]);
authRoutes.post("/login", UserController.login);

export default authRoutes;
