import { Request, Response } from "express";
import Task from "../Models/Task";
import jwt, { JwtPayload } from "jsonwebtoken";
import Todolist from "../Models/Todolist";
import TodolistServices from "../Services/TodolistServices";
import { exeptionHandler } from "../../utils/helper";
import { SECRET_KEY } from "../../utils/config";
import { IReqCustom } from "../middleWare/authMiddleWare";

class TodolistController {
	async getAllTodos(req: IReqCustom, res: Response) {
		console.log(req.user)
		try {
			const todos = await TodolistServices.getAllTodos();
			res.json({ quantity: todos.length, todolists: todos });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async createTodo(req: Request, res: Response) {
		try {
			await TodolistServices.createTodo(req.body.title);
			res.json({ message: "Todo List has been created..." });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async removeTodo(req: Request, res: Response) {
		try {
			await TodolistServices.removeTodo(req.params._id);
			res.json({ message: "Todo List has been removed... " });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async updateTodoList(req: Request, res: Response) {
		try {
			const { _id } = req.body;
			const currentTodo = await Todolist.findById(_id);
			if (!currentTodo._id) {
				throw new Error("todolist does not exist...");
			}
			await TodolistServices.updateTodoList(req.body);
			res.json({ message: "Todo List has been updated... " });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async getTasksForCurrentTodo(req: Request, res: Response) {
		try {
			const tasks = await Task.find({
				todolistIdentificator: req.params._id,
			});
			return res.json({ quantity: tasks.length, tasks: tasks });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async createNewTask(req: Request, res: Response) {
		try {
			if (!req.params._id) {
				throw new Error("todolist does not exist...");
			}
			await TodolistServices.createNewTask(req.body.title, req.params._id);
			res.json({ message: "Task has been created..." });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async removeTask(req: Request, res: Response) {
		try {
			await TodolistServices.removeTask(req.params.taskId);
			res.json({ message: "task has been removed... " });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async updateTask(req: Request, res: Response) {
		try {
			await TodolistServices.updateTask(req.body);
			res.json({ message: "task has been updated... " });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
}

export default new TodolistController();
