const _ = require('lodash');
const api = require('../helpers/api');

const notesActionCreators = require('./notes');

// Action type constants
const ADD_NOTEBOOK = 'neverwrote/notebooks/add_notebook';
const REMOVE_NOTEBOOK = 'neverwrote/notebooks/remove_notebook';

const initialState = {
  data: [
    { id: 100, title: 'From Redux Store: A hard-coded notebook' },
    { id: 101, title: 'From Redux Store: Another hard-coded notebook' },
  ]
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case ADD_NOTEBOOK: {
      return Object.assign({}, state, {
        data: [action.notebook, ...state.data],
      });
    }

    case REMOVE_NOTEBOOK: {
      return Object.assign({}, state, {
        data: _.reject(state.data, notebook => notebook.id === action.notebookId),
      });
    }

    default: return state;
  }
}

// Action creators

reducer.createNotebook = (notebook) => dispatch =>
  new Promise((resolve, reject) => {
    api.post('/notebooks', notebook).then(createdNotebook => {
      dispatch({ type: ADD_NOTEBOOK, notebook: createdNotebook });
      resolve(createdNotebook);
    }).catch(err => {
      console.error(err);
      reject(err);
    });
  });

reducer.deleteNotebook = (notebookId) => dispatch =>
  new Promise((resolve, reject) => {
    api.delete(`/notebooks/${notebookId}`).then(notebook => {
      dispatch({ type: REMOVE_NOTEBOOK, notebookId });
      dispatch(notesActionCreators.clearNotes(notebookId));
      resolve(notebook);
    }).catch(err => {
      console.error(err);
      reject(err);
    });
  });

// Export the action creators and reducer
module.exports = reducer;
