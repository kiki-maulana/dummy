const React = require('react');
const ReactRedux = require('react-redux');
const _ = require('lodash');

const statsActionCreators = require('../reducers/stats');
const createActionDispatchers = require('../helpers/createActionDispatchers');

class Statistics extends React.Component {
  constructor(props) {
    super(props);

    if(_.isEmpty(this.props.stats)) {
      this.props.fetchStats();
    }
  }

  render() {
    if(!this.props.stats.enabled) {
      return null;
    }

    const refreshStats = (event) => {
      event.preventDefault();
      this.props.fetchStats();
    };
    const sortedStats = _.sortBy(_.toPairs(this.props.stats.data), 0);
    const tableRows = sortedStats.map(([name, val]) => (
      <tr key={name}><td>{name}</td><td>{val}</td></tr>
    ));
    return(
      <div>
        <h2>Statistics</h2>
        <button className="btn btn-primary" onClick={refreshStats}>
          <i className="fa fa-refresh" /> Refresh
        </button>
        <table className="table table-hover table-bordered">
          <thead>
            <tr><th style={{ width: 200 }}>Name</th><th>Value</th></tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </table>
      </div>
    );
  }
}

const StatisticsContainer = ReactRedux.connect(
  state => ({ stats: state.stats }),
  createActionDispatchers(statsActionCreators)
)(Statistics);

module.exports = StatisticsContainer;
