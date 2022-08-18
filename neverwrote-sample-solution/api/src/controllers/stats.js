const express = require('express');
const _ = require('lodash');
const models = require('../models');
const router = express.Router();
const Sequelize = require('sequelize');

// Index
router.get('/', (req, res) => {
  const stats = {};
  const promises = [];

  // Number of notes.
  promises.push(
    models.Note.count().then(count => {
      stats.noteCount = count;
    })
  );
  // Number of notebooks.
  promises.push(
    models.Notebook.count().then(count => {
      stats.notebookCount = count;
    })
  );
  // Most recently updated note.
  promises.push(
    models.Note.findOne({
      attributes: ['title'],
      order: [['updatedAt', 'DESC']],
    }).then(note => {
      stats.recentlyUpdatedNote = note.title;
    }).catch(() => {})
  );
  // First created notebook.
  promises.push(
    models.Notebook.findOne({
      attributes: ['title'],
      order: [['createdAt', 'ASC']],
    }).then(notebook => {
      stats.oldestNotebook = notebook.title;
    }).catch(() => {})
  );

  Promise.all(promises)
    .then(notes => res.json(stats))
    .catch(err => res.status(500).json({ error: err.message }));
});

module.exports = router;
