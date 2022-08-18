const React = require('react');

class NotebookEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { notebookTitle: '' };
  }

  render() {
    const fireSave = () => {
      this.props.onSave({ title: this.state.notebookTitle });
    };

    const onNotebookTitleChange = (event) => {
      this.setState({ notebookTitle: event.target.value });
    };

    return (
      <div>
        <div className="input-group">
          <input
           type="text"
           className="form-control"
           placeholder="Notebook title..."
           value={this.state.notebookTitle}
           onChange={onNotebookTitleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-success" type="button" onClick={fireSave}>
              <i className="fa fa-check" />
            </button>
            <button className="btn btn-default" type="button" onClick={this.props.onCancel}>
              Cancel
            </button>
          </span>
        </div>
      </div>
    );
  }
}

class NotebookNew extends React.Component {
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

      const saveNewNotebook = (notebook) => {
        this.props.createNotebook(notebook);
        hideEditor();
      };

      return <NotebookEditor onSave={saveNewNotebook} onCancel={hideEditor} />;
    }

    return (
      <button className="btn btn-primary" onClick={showEditor}>
        <i className="fa fa-plus" /> New notebook
      </button>
    );
  }
}

module.exports = NotebookNew;
