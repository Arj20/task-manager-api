//ENTRY POINT

const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const taskRouter = require("../src/routers/task");

//Creating Express Application.
const app = express();
//Port is given by the environment.
const port = process.env.PORT || 3000;

//Using middleware to accept request in json format.
app.use(express.json());

//Using User Router.
app.use(userRouter);

//Using Task Router.
app.use(taskRouter);

// Listining on an available port.
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
