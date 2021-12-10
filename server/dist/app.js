var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { todoModel } from "./models/model.js";
const app = express();
const port = 3000;
app.use(cors({ credentials: true }));
app.use(express.json());
mongoose.connect("mongodb+srv://clsrns111:password@cluster0.vqh13.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", () => {
    console.log("mongoDB connected");
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const alldata = yield todoModel.find({});
    if (!alldata) {
        res.status(501);
        throw new Error("데이터가 없습니다.");
    }
    res.status(201).send(alldata);
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, month, day, body } = req.body;
    const todo = new todoModel({
        year,
        month,
        day,
        body,
    });
    todo.save();
}));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
