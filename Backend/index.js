const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Todo = require("./model/Todo");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// GET
app.get("/todolist", async (req, res) => {
    const tasks = await Todo.find();
    res.json(tasks);
});

// POST
app.post("/todolist", async (req, res) => {
    const newTask = new Todo({
        userTask: req.body.userTask
    });
    await newTask.save();
    res.json(newTask);
});

// PUT (Complete)
app.put("/todolist/:id", async (req, res) => {
    const updated = await Todo.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(updated);
});

// DELETE
app.delete("/todolist/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
