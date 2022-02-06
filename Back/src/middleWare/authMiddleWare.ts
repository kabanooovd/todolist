import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_KEY } from "../../utils/config";
import { UserRoleTypes } from "../commonTypes";

interface IReqCustom<T> extends Request {
	headers: IncomingHttpHeaders & T;
	user: string | JwtPayload;
}

export function checkAuthMiddleware(
	req: IReqCustom<{ authorization: string }>,
	res: Response,
	next: NextFunction
) {
	if (req.method === "OPTIONS") {
		next();
	}

	try {
		const token = req.headers.authorization.split(" ")[1];
		if (!token) {
			return res.status(401).json({ message: "User not Authorized... " });
		}
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
		next();
	} catch (err) {
		res.status(401).json({ message: "User not Authorized... " });
	}
}

export const checkRoleMiddleware = (roles: UserRoleTypes[]) => {
	return function (
		req: IReqCustom<{ authorization: string }>,
		res: Response,
		next: NextFunction
	) {
		if (req.method === "OPTIONS") {
			next();
		}

		try {
			const token = req.headers.authorization.split(" ")[1];
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
