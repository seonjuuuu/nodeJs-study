const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const maxOrderTask = await Task.findOne().sort('-order');
    const newOrder = maxOrderTask ? maxOrderTask.order + 1 : 0;
    const newTask = new Task({ task, isComplete, order: newOrder });
    await newTask.save();
    res.status(200).json({ status: 'ok', data: newTask });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.getTask = async (req, res) => {
  try {
    const taskList = await Task.find({});
    res.status(200).json({ status: 'ok', data: taskList });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      return res
        .status(404)
        .json({ status: 'fail', message: '해당 id가 없습니다' });
    }
    res.status(200).json({ status: 'ok', data: deleteTask });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, isComplete } = req.body;
    const updateTask = await Task.findByIdAndUpdate(id, {
      task: task,
      isComplete: isComplete,
    });
    res.status(200).json({ status: 'ok', data: updateTask });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

taskController.reorderTask = async (req, res) => {
  try {
    const { newOrder } = req.body;

    for (let i = 0; i < newOrder.length; i++) {
      const taskId = newOrder[i]._id;
      await Task.findByIdAndUpdate(taskId, { order: i });
    }
    res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

module.exports = taskController;
