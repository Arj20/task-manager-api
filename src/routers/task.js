// TASK ROUTER

const express = require("express");
const auth = require("../middleware/auth");
const Tasks = require("../models/task");
const router = new express.Router();


// Creating a new task 
router.post("/tasks", auth, async (req, res) => {
  const task = new Tasks({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});


//Fetching a list of all tasks
router.get("/tasks", auth, async (req, res) => {
  match = {};
  sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

//Fetching a single task
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id.trim();
  // const task = await Tasks.findById(_id);
  try {
    const task = await Tasks.findOne({ _id, owner: req.user._id });
    console.log(task);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

//Updating an existing task.
router.patch("/tasks/:id", auth, async (req, res) => {
  const Updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValid = Updates.every((update) => allowedUpdates.includes(update));
  if (!isValid) {
    return res.status(404).send({ error: "Invalid Request" });
  }
  const task = await Tasks.findOne({ _id: req.params.id, owner: req.user._id });

  try {
    if (!task) {
      return res.status(404).send();
    }
    Updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

//Deleting a task.
router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    // const task = await Tasks.findByIdAndDelete(_id);
    const task = await Tasks.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send({ error: "User Not Found!" });
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Exporting router
module.exports = router;
