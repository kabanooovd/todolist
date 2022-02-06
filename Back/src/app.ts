import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, url } from "../utils/config";
import todolistsRoutes from "./Routs/todolistRoutes";

const app = express();

app.use(express.json());
app.use(express.static("static"));
app.use(cors());

app.use("/api", todolistsRoutes);

const start = async () => {
	try {
		await mongoose.connect(url);
		app.listen(PORT, () => {
			console.log(`Server has started on ${PORT} port... `);
		});
	} catch (err) {
		console.log(err);
	}
};

start();