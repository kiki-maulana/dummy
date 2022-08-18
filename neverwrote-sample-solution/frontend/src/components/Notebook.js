const React = require('react');

class Notebook extends React.Component {
  render() {
    const loadMyNotes = () => {
      this.props.loadNotes(this.props.notebook.id);
    };

    const deleteThisNotebook = () => {
      this.props.deleteNotebook(this.props.notebook.id);
    };

    return (
      <li>
        <button className="btn btn-danger btn-xs" onClick={deleteThisNotebook}>
          <i className="fa fa-remove" />
        </button>
        {' '}
        <a onClick={loadMyNotes} role="button">
          {this.props.notebook.title}
        </a>
      </li>
    );
  }
}

module.exports = Notebook;
