const React = require('react');

const MarkdownEditor = require('./MarkdownEditor');

class NoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { noteTitle: '', noteContent: '' };
  }

  render() {
    const fireSave = () => {
      this.props.onSave({
        title: this.state.noteTitle,
        content: this.state.noteContent,
      });
    };

    const onNoteTitleChange = (event) => {
      this.setState({ noteTitle: event.target.value });
    };

    const onNoteContentChange = (event) => {
      this.setState({ noteContent: event.target.value });
    };

    return (
      <div>
        <div className="input-group">
          <input
           type="text"
           className="form-control"
           placeholder="Note title..."
           value={this.state.noteTitle}
           onChange={onNoteTitleChange}
          />
          <MarkdownEditor value={this.state.noteContent} onChange={onNoteContentChange} />
          <button className="btn btn-success" type="button" onClick={fireSave}>
            <i className="fa fa-check" />
          </button>
          <button className="btn btn-default" type="button" onClick={this.props.onCancel}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

class NoteNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorVisible: false };
  }

  render() {
    const showEditor = () => {
      this.setState({ editorVisible: true });
    };

    if(this.state.editorVisible) {
      const hideEditor = () => {
        this.setState({ editorVisible: false });
      };

      const saveNewNote = (note) => {
        this.props.createNote(
          Object.assign({}, note, { notebookId: this.props.notebookId })
        );
        hideEditor();
      };

      return <NoteEditor onSave={saveNewNote} onCancel={hideEditor} />;
    }

    return (
      <button className="btn btn-primary" onClick={showEditor}>
        <i className="fa fa-plus" /> New note
      </button>
    );
  }
}

module.exports = NoteNew;
