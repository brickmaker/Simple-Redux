function createStore(reducer, enhancer) {
  if (enhancer) {
    return enhancer(createStore)(reducer)
  }
  let state = undefined
  const currentReducer = reducer
  const listeners = []
  dispatch({ type: '@@redux/INIT' })
  function dispatch(action) {
    state = currentReducer(state, action)
    listeners.forEach(listener => listener())
  }
  function subscribe(listener) {
    listeners.push(listener)
    return function unsubscribe() {
      const idx = listeners.indexOf(listener)
      listeners.splice(idx, 1)
    }
  }
  function getState() {
    return state
  }
  return {
    dispatch,
    subscribe,
    getState
  }
}

function combineReducers(reducers) {
  return function reducer(state = {}, action) {
    const newState = {}
    for (const key in reducers) {
      newState[key] = reducers[key](state[key], action)
    }
    return newState
  }
}

function applyMiddleware(...middlewares) {
  return createStore => (reducer, ...args) => {
    const store = createStore(reducer, ...args)
    middlewares = middlewares.slice()
    middlewares.reverse()
    let dispatch = store.dispatch
    middlewares.forEach(middleware => (dispatch = middleware(store)(dispatch)))
    return { ...store, dispatch }
  }
}

const SimpleRedux = {
  createStore,
  combineReducers,
  applyMiddleware
}
