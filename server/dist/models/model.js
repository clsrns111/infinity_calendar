import mongoose from "mongoose";
const { model, Schema } = mongoose;
const TodoSchema = new Schema({
    year: { type: Number, required: true },
    month: { type: Number, required: true },
    day: { type: Number, required: true },
    body: { type: String, required: true },
});
export const todoModel = model("Todo", TodoSchema);
