/**
 * Specify all of your reducers in this file, so they can be combined into
 * one big reducer.
 */

const Redux = require('redux');

module.exports = Redux.combineReducers({
  notebooks: require('./notebooks'),
  notes: require('./notes'),
  stats: require('./stats'),
});
