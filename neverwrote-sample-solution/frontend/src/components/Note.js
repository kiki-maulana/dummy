const React = require('react');

class Note extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contentVisible: false };
  }

  render() {
    const toggleContentVisible = () => {
      this.setState({ contentVisible: !this.state.contentVisible });
    };

    const deleteThisNote = () => {
      this.props.deleteNote(this.props.note.id);
    };

    let contentElement = null;
    if(this.state.contentVisible) {
      contentElement = <span> --- {this.props.note.content}</span>;
    }

    return (
      <li>
        <button className="btn btn-danger btn-xs" onClick={deleteThisNote}>
          <i className="fa fa-remove" />
        </button>
        {' '}
        <a onClick={toggleContentVisible} role="button">
          {this.props.note.title}
        </a>
        {contentElement}
      </li>
    );
  }
}

module.exports = Note;
