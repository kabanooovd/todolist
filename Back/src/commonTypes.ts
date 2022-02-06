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

export type UserRoleTypes = "USER" | "ADMIN";