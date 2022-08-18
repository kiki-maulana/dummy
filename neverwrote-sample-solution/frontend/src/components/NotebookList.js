const React = require('react');
const ReactRedux = require('react-redux');

const Notebook = require('./Notebook');
const NotebookNew = require('./NotebookNew');
const createActionDispatchers = require('../helpers/createActionDispatchers');
const notebooksActionCreators = require('../reducers/notebooks');
const notesActionCreators = require('../reducers/notes');

class NotebookList extends React.Component {
  render() {
    const createNotebookListItem = (notebook) => {
      return (
        <Notebook
         key={notebook.id}
         notebook={notebook}
         loadNotes={this.props.loadNotes}
         deleteNotebook={this.props.deleteNotebook}
        />
      );
    };

    return (
      <div>
        <h2>Notebooks</h2>
        <NotebookNew createNotebook={this.props.createNotebook} />
        <ul>
          {this.props.notebooks.data.map(createNotebookListItem)}
        </ul>
      </div>
    );
  }
}

const NotebookListContainer = ReactRedux.connect(
  (state) => ({
    notebooks: state.notebooks
  }),
  createActionDispatchers(notebooksActionCreators, notesActionCreators)
)(NotebookList);

module.exports = NotebookListContainer;
