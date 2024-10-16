const Task = require('../model/Task');

const taskController = {};

taskController.createTask = async (req, res) => {
  try {
    const { task, isComplete } = req.body;
    const newTask = new Task({ task, isComplete });
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
    consol.log(err);
    res.status(400).json({ status: 'fail', error: err });
  }
};

module.exports = taskController;
