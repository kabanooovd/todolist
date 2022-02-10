import express from "express";
import todolistController from "../Controllers/todolistController";
import { checkAuthMiddleware } from "../middleWare/authMiddleWare";

const todolistsRoutes = express.Router();
todolistsRoutes.get(
	"/todolist",
	checkAuthMiddleware,
	todolistController.getAllTodos
);
todolistsRoutes.post(
	"/todolist",
	checkAuthMiddleware,
	todolistController.createTodo
);
todolistsRoutes.delete(
	"/todolist/:_id",
	checkAuthMiddleware,
	todolistController.removeTodo
);
todolistsRoutes.put(
	"/todolist/",
	checkAuthMiddleware,
	todolistController.updateTodoList
);

todolistsRoutes.get(
	"/todolist/:_id/tasks",
	checkAuthMiddleware,
	todolistController.getTasksForCurrentTodo
);
todolistsRoutes.post(
	"/todolist/:_id/tasks",
	checkAuthMiddleware,
	todolistController.createNewTask
);
todolistsRoutes.delete(
	"/todolist/:_id/tasks/:taskId",
	checkAuthMiddleware,
	todolistController.removeTask
);
todolistsRoutes.put(
	"/todolist/:_id/tasks/:taskId",
	checkAuthMiddleware,
	todolistController.updateTask
);

export default todolistsRoutes;
