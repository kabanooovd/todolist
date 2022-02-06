import express from "express";
import todolistController from "../Controllers/todolistController";

const todolistsRoutes = express.Router();

todolistsRoutes.get("/todolist", todolistController.getAllTodos);
todolistsRoutes.post("/todolist", todolistController.createTodo);
todolistsRoutes.delete("/todolist/:_id", todolistController.removeTodo);
todolistsRoutes.put("/todolist/", todolistController.updateTodoList);

todolistsRoutes.get("/todolist/:_id/tasks", todolistController.getTasksForCurrentTodo);
todolistsRoutes.post("/todolist/:_id/tasks", todolistController.createNewTask);
todolistsRoutes.delete("/todolist/:_id/tasks/:taskId", todolistController.removeTask);
todolistsRoutes.put("/todolist/:_id/tasks/:taskId", todolistController.updateTask);


export default todolistsRoutes;
