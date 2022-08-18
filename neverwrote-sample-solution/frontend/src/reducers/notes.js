const api = require('../helpers/api');
const _ = require('lodash');

// Action type constants
const CLEAR_NOTES = 'neverwrote/notes/clear_notes';
const SET_NOTES = 'neverwrote/notes/set_notes';
const ADD_NOTE = 'neverwrote/notes/add_note';
const REMOVE_NOTE = 'neverwrote/notes/remove_note';

const initialState = {
  data: [],
  notebookId: -1,
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case CLEAR_NOTES: {
      if(action.notebookId !== state.notebookId) {
        return state;
      }
      return Object.assign({}, state, {
        data: [],
        notebookId: -1,
      });
    }

    case SET_NOTES: {
      return Object.assign({}, state, {
        data: action.notes,
        notebookId: action.notebookId,
      });
    }

    case ADD_NOTE: {
      return Object.assign({}, state, {
        data: [action.note, ...state.data],
      });
    }

    case REMOVE_NOTE: {
      return Object.assign({}, state, {
        data: _.reject(state.data, note => note.id === action.noteId),
      });
    }

    default: return state;
  }
}

// Action creators

reducer.clearNotes = notebookId => (
  { type: CLEAR_NOTES, notebookId }
);

reducer.loadNotes = notebookId => dispatch =>
  new Promise((resolve, reject) => {
    api.get(`/notebooks/${notebookId}/notes`).then((notes) => {
      dispatch({ type: SET_NOTES, notebookId, notes });
      resolve(notes);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });

reducer.createNote = note => dispatch =>
  new Promise((resolve, reject) => {
    api.post('/notes', note).then((createdNote) => {
      dispatch({ type: ADD_NOTE, note: createdNote });
      resolve(createdNote);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });

reducer.deleteNote = noteId => dispatch =>
  new Promise((resolve, reject) => {
    api.delete(`/notes/${noteId}`).then((note) => {
      dispatch({ type: REMOVE_NOTE, noteId });
      resolve(note);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });

// Export the action creators and reducer
module.exports = reducer;
