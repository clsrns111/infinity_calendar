import mongoose from "mongoose";
const { model, Schema } = mongoose;

interface Todo {
  year: number;
  month: number;
  day: number;
  body: string;
}

const TodoSchema = new Schema<Todo>({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  day: { type: Number, required: true },
  body: { type: String, required: true },
});

export const todoModel = model<Todo>("Todo", TodoSchema);
