import jwt from "jsonwebtoken";
import { REFRESH_SECRET_KEY, SECRET_KEY } from "../utils/config";
import { UserRoleTypes } from "../src/commonTypes";

export const generateJwt = (
	id: string,
	userName: string,
	role: UserRoleTypes
) => {
	const accessToken = jwt.sign({ id, userName, role }, SECRET_KEY, {
		expiresIn: "24h",
	});
	const refreshToken = jwt.sign({ id, userName, role }, REFRESH_SECRET_KEY, {
		expiresIn: "24d",
	});
	return { accessToken, refreshToken };
};
