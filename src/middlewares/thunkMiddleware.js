const thunkMiddleware = store => next => (action) => { // eslint-disable-line react/arrow-parens
  if (typeof action !== 'function') {
    // Normal action, pass it on
    return next(action);
  }
  const result = action(store.dispatch, store.getState);

  return result;
};

export default thunkMiddleware;
