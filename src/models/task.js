// TASK MODEL

const mongoose = require("mongoose");
// const validator = require("validator");

// Creating task Schema
const taskSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Tasks = mongoose.model("Task", taskSchema);

//Exporting module
module.exports = Tasks;
