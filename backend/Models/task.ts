import mongoose from "mongoose";
const Schema = mongoose.Schema; // Create a new Schema instance

const taskSchema = new Schema({ // Create a custom Schema for tasks
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
});

//Export schema as a model to be used in other files
export default mongoose.model("Task", taskSchema, "task");