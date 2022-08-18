const React = require('react');
const ReactRedux = require('react-redux');

const Note = require('./Note');
const NoteNew = require('./NoteNew');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const notesActionCreators = require('../reducers/notes');

class NoteList extends React.Component {
  render() {
    const createNoteListItem = (note) => {
      return (
        <Note
         key={note.id}
         note={note}
         deleteNote={this.props.deleteNote}
        />
      );
    };

    if(this.props.notes.notebookId < 0) {
      return null;
    }

    return (
      <div>
        <h2>Notes</h2>
        <NoteNew createNote={this.props.createNote} notebookId={this.props.notes.notebookId} />
        <ul>
          {this.props.notes.data.map(createNoteListItem)}
        </ul>
      </div>
    );
  }
}

const NoteListContainer = ReactRedux.connect(
  (state) => ({
    notes: state.notes
  }),
  createActionDispatchers(notesActionCreators)
)(NoteList);

module.exports = NoteListContainer;
