const express = require("express");
const jwt = require("jsonwebtoken");
const Todo = require("../models/Todo");

const privateKey = ``;

const router = express.Router();

router.use(function (req, res, next) {
  if (req.header("Authorization")) {
    try {
      req.payload = jwt.verify(req.header("Authorization"), privateKey, {
        algorithms: ["RS256"],
      });
    } catch (error) {
      return res.status(401).json({ error: "Something went wrong" });
    }
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});
router.post("/", async function (req, res) {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    author: req.payload.id,
    dateCreated: req.body.dateCreated,
    complete: req.body.complete,
    dateCompleted: req.body.dateCompleted,
  });
  await todo
    .save()
    .then((savedTodo) => {
      return res.status(201).json({
        id: savedTodo._id,
        title: savedTodo.title,
        description: savedTodo.description,
        author: savedTodo.author,
        dateCreated: savedTodo.dateCreated,
        complete: savedTodo.complete,
        dateCompleted: savedTodo.dateCompleted,
      });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
});

router.get("/", async function (req, res, next) {
  const todos = await Todo.find().where("author").equals(req.payload.id).exec();
  return res.status(200).json({ todos: todos });
});

router.delete("/:id", async function (req, res, next) {
  const deleted = await Todo.findByIdAndDelete(req.body.id);
  return res.status(200).json({ deleted });
});

router.patch("/:id", async function (req, res, next) {
  const toggled = await Todo.findByIdAndUpdate(
    req.body.id,
    {
      complete: req.body.complete,
      dateCompleted: req.body.dateCompleted,
    },
    { new: true }
  );
  return res.status(200).json({ toggled });
});

module.exports = router;
