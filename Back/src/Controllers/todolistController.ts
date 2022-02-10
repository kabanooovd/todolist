import { Request, Response } from "express";
import Task from "../Models/Task";
import Todolist from "../Models/Todolist";
import TodolistServices from "../Services/TodolistServices";
import { exeptionHandler } from "../../utils/helper";
import { IReqCustom } from "../commonTypes";

class TodolistController {
	async getAllTodos(req: IReqCustom, res: Response) {
		try {
			if (req.user) {
				const todos = await TodolistServices.getAllTodos(req.user.id);
				res.json({ quantity: todos.length, todolists: todos });
			} else {
				res
					.status(400)
					.json({ message: "Seems like some how you are not aouthorizaed..." });
			}
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async createTodo(req: IReqCustom, res: Response) {
		try {
			if (req.user) {
				await TodolistServices.createTodo(req.body.title, req.user.id);
				res.json({ message: "Todo List has been created..." });
			}
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async removeTodo(req: Request, res: Response) {
		try {
			const currentTodo = await Todolist.findById(req.params._id);
			if (!currentTodo) {
				return res.status(400).json("todolist does not exist...");
			}
			await TodolistServices.removeTodo(req.params._id);
			res.json({ message: "Todo List has been removed... " });
		} catch (err) {
			exeptionHandler(res, "Some Error has occured... ");
		}
	}
	async updateTodoList(req: Request, res: Response) {
		try {
			console.log("dfdfdf");
			const { _id } = req.body;
			const currentTodo = await Todolist.findById(_id);
			if (!currentTodo) {
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
