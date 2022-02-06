import { Request, Response } from "express";
import Task from "../Models/Task";
import Todolist from "../Models/Todolist";
import TodolistServices from "../Services/TodolistServices";

class TodolistController {
	async getAllTodos(req: Request, res: Response) {
		try {
			const todos = await TodolistServices.getAllTodos();
			res.json(todos);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async createTodo(req: Request, res: Response) {
		try {
			await TodolistServices.createTodo(req.body.title);
			res.json("Todo List has been created...");
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async removeTodo(req: Request, res: Response) {
		try {
			await TodolistServices.removeTodo(req.params._id);
			res.json("Todo List has been removed... ");
		} catch (err) {
			res.status(500).json(err);
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
			res.json("Todo List has been updated... ");
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async getTasksForCurrentTodo(req: Request, res: Response) {
		try {
			const tasks = await Task.find({
				todolistIdentificator: req.params._id,
			});
			return res.json(tasks);
		} catch (err) {
			res.status(500).json(err);
		}
	}
	async createNewTask(req: Request, res: Response) {
		try {
			if (!req.params._id) {
				throw new Error("todolist does not exist...");
			}
			await TodolistServices.createNewTask(req.body.title, req.params._id);
			res.json("Task has been created...");
		} catch (err) {
			res.status(500).json("Some error has occured... ");
		}
	}
	async removeTask(req: Request, res: Response) {
		try {
			await TodolistServices.removeTask(req.params.taskId);
			res.json("task has been removed... ");
		} catch (err) {
			res.status(500).json("Some error has occured... ");
		}
	}
	async updateTask(req: Request, res: Response) {
		console.log(req.body);
		try {
			await TodolistServices.updateTask(req.body);
			res.json("task has been updated... ");
		} catch (err) {
			res.status(500).json("Some error has occured... ");
		}
	}
}

export default new TodolistController();
