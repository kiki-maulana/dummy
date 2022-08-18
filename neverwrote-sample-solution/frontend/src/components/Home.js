/**
 * This file contains the Home component.
 * Other React components for viewing notes and notebooks should be nested
 * beneath the Home component.
 */

const React = require('react');

const NotebookList = require('./NotebookList');
const NoteList = require('./NoteList');
const Statistics = require('./Statistics');

const Home = () => (
  <div className="container">
    <h1>Neverwrote</h1>
    <blockquote>
      {'Never say "I never wrote that down" ever again!'}
    </blockquote>
    <Statistics />
    <NotebookList />
    <NoteList />
  </div>
);

module.exports = Home;
