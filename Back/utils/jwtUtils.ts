import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../utils/config";
import { UserRoleTypes } from "../src/commonTypes";

export const generateJwt = (
	id: string,
	userName: string,
	role: UserRoleTypes
) => {
	return jwt.sign({ id, userName, role }, SECRET_KEY, {
		expiresIn: "24h",
	});
};
