const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = Schema(
  {
    task: {
      type: String,
      require: true,
    },
    isComplete: {
      type: Boolean,
      require: true,
    },
    order: {
      type: Number,
      require: false,
      default: 0,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
