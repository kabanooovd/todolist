import mongoose from "mongoose";

const Task = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
    todolistIdentificator: {
        type: String,
        required: true,
    },
	dateCreation: {
		type: Date,
		required: true,
	},
	taskStatus: {
		type: Boolean,
		required: true,
	},
});

export default mongoose.model("Task", Task);