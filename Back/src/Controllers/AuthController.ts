import ApiError from "../error/ApiError";
import bcrypt from "bcryptjs";
import User from "../Models/User";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { generateJwt } from "../../utils/jwtUtils";
import { emailValidator } from "../../utils/helper";
import TokenServices from "../Services/TokenServices";
class UserController {
	async registration(req: Request, res: Response, next: NextFunction) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json("Validation errors... ");
			}
			const { userName, password, email } = req.body;
			if (emailValidator(email) === "INVALID") {
				return res.status(400).json("Invalid email... ");
			}
			const candidat = await User.findOne({ userName });
			if (candidat) {
				return res.status(400).json("Such user already exist... ");
			}
			const hashedPw = bcrypt.hashSync(password, 5);
			const user = await User.create({
				userName,
				password: hashedPw,
				email,
				roles: ["USER"],
			});

			const tokens = generateJwt(user._id, user.userName, "USER");
			await TokenServices.saveToke(user._id, tokens.refreshToken);
			return res.json("User has been successfult subscribed... ");
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: "Registration error... " });
		}
	}
	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { userName, password } = req.body;
			const user = await User.findOne({ userName });
			if (!user) {
				return res.json(`${userName} is not exist in db... `);
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.json(`Password is invalid... `);
			}
			const token = generateJwt(user._id, user.userName, user.roles);
			return res.json({ token });
		} catch (err) {
			console.log(err);
			res.status(400).json({ message: "Login error... " });
		}
	}
}

export default new UserController();
