import { Request } from "express";

export interface TaskTypes {
	_id: string;
	taskTitle: string;
	todolistIdentificator: string;
	dateCreation: Date;
	isDone: boolean;
}

export interface TodolistTypes {
	_id: string;
	title: string;
	dateCreation: Date;
	filtered: string;
}

export interface IReqCustom extends Request {
	user?: IUser;
}

export interface IUser {
	id: string;
	userName: string;
	role: string;
}

export type UserRoleTypes = "USER" | "ADMIN";
