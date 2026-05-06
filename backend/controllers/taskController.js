const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try { res.status(201).json(await Task.create(req.body)); } 
  catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getTasks = async (req, res) => {
  try {
    const filter = req.user.role === 'Admin' ? {} : { assignedTo: req.user.id };
    res.json(await Task.find(filter).populate('project').populate('assignedTo', 'name'));
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    
    // Member constraint: Can only update their own task
    if (req.user.role === 'Member' && task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this task' }); // [cite: 44]
    }
    
    task.status = req.body.status;
    await task.save();
    res.json(task);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const filter = req.user.role === 'Admin' ? {} : { assignedTo: req.user.id };
    const tasks = await Task.find(filter);
    
    const stats = {
      total: tasks.length,
      todo: tasks.filter(t => t.status === 'Todo').length,
      inProgress: tasks.filter(t => t.status === 'In Progress').length,
      done: tasks.filter(t => t.status === 'Done').length,
      overdue: tasks.filter(t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'Done').length
    };
    
    res.json(stats);
  } catch (error) { res.status(400).json({ error: error.message }); }
};