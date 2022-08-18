const express = require('express');
const _ = require('lodash');
const models = require('../models');
const router = express.Router();

// This helper function takes the JSON object submitted in a request and
// selects only the fields that are allowed to be set by users
function notebookFilter(obj) {
  return _.pick(obj, ['title']);
}

// Index
router.get('/', (req, res) => {
  models.Notebook.findAll({ order: [['createdAt', 'DESC']] })
    .then(notebooks => res.json(notebooks))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Nested index
router.get('/:notebookId/notes', (req, res) => {
  const queryOptions = {
    order: [['createdAt', 'DESC']],
    where: { notebookId: req.params.notebookId }
  };

  models.Note.findAll(queryOptions)
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create
router.post('/', (req, res) => {
  models.Notebook.create(notebookFilter(req.body))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});

// Show
router.get('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => res.json(notebook))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Destroy
router.delete('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.destroy())
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update
router.put('/:notebookId', (req, res) => {
  models.Notebook.findById(req.params.notebookId)
    .then(notebook => notebook.update(notebookFilter(req.body)))
    .then(notebook => res.json(notebook))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;
