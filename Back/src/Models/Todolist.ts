import mongoose from "mongoose";

const Todolist = new mongoose.Schema({
	// userId: {
	// 	type: String,
	// 	required: true,
	// },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
