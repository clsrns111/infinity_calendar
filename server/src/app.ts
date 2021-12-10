import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { todoModel } from "./models/model.js";

const app = express();
const port = 3000;

app.use(cors({ credentials: true }));
app.use(express.json());
mongoose.connect(
  "mongodb+srv://clsrns111:password@cluster0.vqh13.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  () => {
    console.log("mongoDB connected");
  }
);

app.get("/", async (req, res) => {
  const alldata = await todoModel.find({});
  if (!alldata) {
    res.status(501);
    throw new Error("데이터가 없습니다.");
  }
  res.status(201).send(alldata);
});

app.post("/", async (req, res) => {
  const { year, month, day, body } = req.body;

  const todo = new todoModel({
    year,
    month,
    day,
    body,
  });
  todo.save();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
