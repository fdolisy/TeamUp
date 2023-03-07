// routes/api/projects.js
// Defines API endpoints for creating, updating, and deleting projects from the database

const express = require('express');
var app = express();
app.use(express.json());

const Project = require('../../models/Project');

// @route GET api/projects
// @description Get all projects
// @access Public
app.get('/', (_, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(404).json({ noprojectsfound: err }));
});

// @route GET api/projects/number/:number
// @description Get single project by project number
// @access Public
app.get('/number/:number', (req, res) => {
  Project.find({ 'number': req.params.number })
    .then(project => res.json(project))
    .catch(err => res.status(404).json({ noprojectfound: err }));
});

// @route GET api/projects/:id
// @description Get single project by id
// @access Public
app.get('/:id', (req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(404).json({ noprojectfound: err }));
});

// @route POST api/projects
// @description Create a new project
// @access Public
// @param {String} name
// @param {Number} number
// @param {String} sponsor
// @param {[String]} desired_skills
app.post('/', async (req, res) => {
  project = req.body

  Project.create(project)
    .then(project => res.json({ msg: 'Project ' + project.id + ' added successfully' }))
    .catch(err => res.status(400).json({ error: err }));
});

// @route PUT api/projects/:id
// @description Update project
// @access Public
app.put('/:id', (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body)
    .then(project => res.json({ msg: 'Updated project ' + project.id + ' successfully' }))
    .catch(err =>
      res.status(400).json({ error: err })
    );
});

// @route DELETE api/projects/:id
// @description Delete project by id
// @access Public
app.delete('/:id', (req, res) => {
  Project.findByIdAndRemove(req.params.id, req.body)
    .then(project => res.json({ mgs: 'Project ' + project.id + ' deleted successfully' }))
    .catch(err => res.status(404).json({ error: err }));
});

module.exports = app;