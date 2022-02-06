import { Response } from "express";

export const exeptionHandler = (response: Response, exeptionVal: string) => {
	return response.status(500).json({ message: exeptionVal });
};
