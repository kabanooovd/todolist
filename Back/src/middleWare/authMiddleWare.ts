import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isArray } from "util";
import { SECRET_KEY } from "../../utils/config";
import { UserRoleTypes } from "../commonTypes";

interface IUser {
	userName: string;
	email: string;
	roles: string[];
  }
export interface IReqCustom extends Request {
	user?: any;
}

export function checkAuthMiddleware(
	req: IReqCustom,
	res: Response,
	next: NextFunction
) {
	if (req.method === "OPTIONS") {
		next();
	}
	try {
		const token = req.get("Authorization");
		// const token = req.headers["Authorization"]
		console.log(token);
		if (!token) {
			return res.status(401).json({ message: "User x not Authorized... " });
		}
		const decoded = jwt.verify(token, SECRET_KEY);
		console.log(decoded);
		req.user = decoded;
		// req.setEncoding(jwt.verify(token, SECRET_KEY) as BufferEncoding);
		next();
	} catch (err) {
		res.status(401).json({ message: "User not Authorized... " });
	}
}

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
