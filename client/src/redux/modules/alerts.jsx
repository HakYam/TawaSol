// Correcting posts.jsx to use default export if it's intended to be a reducer
const alertsReducer = (state = {}, action) => {
    switch (action.type) {
      // case statements
      default:
        return state;
    }
  };
  
  export default alertsReducer;
  