import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../utils/config";
import { IReqCustom, IUser, UserRoleTypes } from "../commonTypes";
import User from "../Models/User";

export const checkAuthMiddleware = async (
	req: IReqCustom,
	res: Response,
	next: NextFunction
) => {
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		const token = req.get("Authorization");
		if (!token) {
			return res.status(401).json({ message: "You are not Authorized... " });
		}
		const decoded = jwt.verify(token, SECRET_KEY) as IUser;

		const loggedInUser = await User.findById(decoded.id);
		if (!loggedInUser) {
			return res.status(401).json({ message: "You are not Authorized... " });
		}
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: "User not Authorized... " });
	}
};

export const checkRoleMiddleware = (roles: UserRoleTypes[]) => {
	return function (req: IReqCustom, res: Response, next: NextFunction) {
		if (req.method === "OPTIONS") {
			next();
		}

		try {
			const token = req.get("Authorization");
			if (!token) {
				return res.status(401).json({ message: "User is not Authorized... " });
			}
			let hasRole = false;
			const verifiedJwt = jwt.verify(token, SECRET_KEY);
			if (typeof verifiedJwt !== "string") {
				verifiedJwt.role.forEach((r: UserRoleTypes) => {
					if (roles.includes(r)) {
						hasRole = true;
					}
				});
			}
			if (!hasRole) {
				return res.status(401).json({ message: "You are have no access... " });
			}
			next();
		} catch (err) {
			console.log(err);
			return res.status(401).json({ message: "User is not Authorized... " });
		}
	};
};
