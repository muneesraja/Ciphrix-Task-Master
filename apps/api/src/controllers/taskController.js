const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /tasks
// @access  Private
const getTasks = async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  try {
    // If admin, can see all tasks? Or just their own? 
    // Requirement says "Normal User will only have the ability to add and edit their own tasks."
    // Implies Admin might see all, or at least manage all. 
    // Let's assume Admin sees all, User sees own.
    
    let keyword = {};
    if (req.user.role !== 'admin') {
        keyword = { user: req.user._id };
    }

    const count = await Task.countDocuments({ ...keyword });
    const tasks = await Task.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ tasks, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a task
// @route   POST /tasks
// @access  Private
const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = new Task({
      user: req.user._id,
      title,
      description,
      status,
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a task
// @route   PUT /tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      // Check if user is owner or admin
      if (task.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
         return res.status(401).json({ message: 'Not authorized to update this task' });
      }

      task.title = title || task.title;
      task.description = description || task.description;
      task.status = status || task.status;

      const updatedTask = await task.save();
      res.json(updatedTask);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /tasks/:id
// @access  Private/Admin
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task) {
      await task.deleteOne();
      res.json({ message: 'Task removed' });
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
