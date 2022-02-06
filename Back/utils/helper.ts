import { Response } from "express";

export const exeptionHandler = (response: Response, exeptionVal: string) => {
	return response.status(500).json({ message: exeptionVal });
};

export const emailValidator = (email: string): string => {
	if (
		email
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			)
	) {
		return "VALID";
	}
	return "INVALID";
};
