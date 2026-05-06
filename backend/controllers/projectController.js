const Project = require('../models/Project');

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json(project);
  } catch (error) { res.status(400).json({ error: error.message }); }
};

exports.getProjects = async (req, res) => {
  try { res.json(await Project.find().populate('createdBy', 'name')); } 
  catch (error) { res.status(400).json({ error: error.message }); }
};