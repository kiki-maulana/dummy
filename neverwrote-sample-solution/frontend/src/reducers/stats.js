const api = require('../helpers/api');

// Action type constants
const SET = 'neverwrote/stats/set';

const initialState = {
  enabled: true,
  data: {},
};

// Function which takes the current data state and an action,
// and returns a new state
function reducer(state, action) {
  state = state || initialState;
  action = action || {};

  switch(action.type) {
    case SET: {
      return Object.assign({}, state, { data: action.data });
    }

    default: return state;
  }
}

reducer.fetchStats = () => dispatch =>
  new Promise((resolve, reject) => {
    api.get('/stats').then((data) => {
      dispatch({ type: SET, data });
      resolve(data);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  });

// Export the action creators and reducer
module.exports = reducer;
