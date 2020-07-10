function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer); // when given applyMiddleware
  }
  let state = undefined; // store state tree
  const listeners = [];
  dispatch({ type: "@@redux/INIT" }); // dispatch init event to set state

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  }
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      listeners.splice(listeners.indexOf(listener), 1);
    };
  }
  function getState() {
    return state;
  }

  return { dispatch, subscribe, getState };
}

function combineReducers(reducers) {
  return function reducer(state = {}, action) {
    const newState = {};
    for (const key in reducers) {
      // iterate keys and calculate new state
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  };
}

function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, ...args) => {
    const store = createStore(reducer, ...args);
    middlewares = middlewares.slice().reverse();
    let dispatch = store.dispatch;
    // wrapper dispatch by middlewares
    middlewares.forEach(
      (middleware) => (dispatch = middleware(store)(dispatch))
    );
    return { ...store, dispatch };
  };
}

const SimpleRedux = { createStore, combineReducers, applyMiddleware };
