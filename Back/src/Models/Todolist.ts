import mongoose from "mongoose";

const Todolist = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	dateCreation: {
		type: Date,
		required: true,
	},
	filtered: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Todolist", Todolist);
