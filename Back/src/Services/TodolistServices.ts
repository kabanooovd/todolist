import { TaskTypes, TodolistTypes } from "../commonTypes";
import Task from "../Models/Task";
import Todolist from "../Models/Todolist";

class TodolistServices {
	async getAllTodos(userId: string) {
		return await Todolist.find({userId});
	}
	async createTodo(todolistTitle: string, userId: string) {
		console.log("222");
		const newTodo = new Todolist({
			title: todolistTitle,
			dateCreation: new Date(),
			userId,
			filtered: "all",
		});
		await newTodo.save();
	}
	async removeTodo(id: string) {
		if (!id) {
			throw new Error("todolist does not exist...");
		}
		await Todolist.findByIdAndRemove(id);
	}
	async updateTodoList(todolist: TodolistTypes) {
		const updatedTodo = await Todolist.findByIdAndUpdate(
			todolist._id,
			todolist,
			{
				new: true,
			}
		);
		await updatedTodo.save();
	}
	async createNewTask(title: string, todolistId: string) {
		const newTask = new Task({
			title,
			todolistIdentificator: todolistId,
			dateCreation: new Date(),
			taskStatus: false,
		});
		await newTask.save();
	}
	async removeTask(taskId: string) {
		await Task.findByIdAndRemove(taskId);
	}
	async updateTask(task: TaskTypes) {
		const updatedTask = await Task.findByIdAndUpdate(task._id, task, {
			new: true,
		});
		await updatedTask.save();
	}
}

export default new TodolistServices();
