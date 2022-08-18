const express = require('express');
const _ = require('lodash');
const models = require('../models');
const router = express.Router();

// This helper function takes the JSON object submitted in a request and
// selects only the fields that are allowed to be set by users
function noteFilter(obj) {
  return _.pick(obj, ['title', 'content', 'notebookId']);
}

// Index
router.get('/', (req, res) => {
  models.Note.findAll()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Create
router.post('/', (req, res) => {
  const filteredNote = noteFilter(req.body);
  // TODO: Validate filteredNote.notebookId
  models.Note.create(filteredNote)
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});

// Show
router.get('/:noteId', (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => res.json(note))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Destroy
router.delete('/:noteId', (req, res) => {
  models.Note.destroy({ where: { id: req.params.noteId } })
    .then(() => res.json({}))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Update
router.put('/:noteId', (req, res) => {
  models.Note.findById(req.params.noteId)
    .then(note => note.update(noteFilter(req.body)))
    .then(note => res.json(note))
    .catch(err => res.status(422).json({ error: err.message }));
});

module.exports = router;
