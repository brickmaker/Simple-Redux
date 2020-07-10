# Simple-Redux

A 50-line simple implementation of Redux when learning Redux.

### features

* basic state management:
    * get state
    * dispatch action
    * specify reducer
    * subscribe listener
* combine reducers
* using middlewares

### API

subset of Redux's API

* createStore(reducer, enhancer)
    * store.getState()
    * store.dispatch(action)
    * store.subscribe(listener)
* combineReducers(reducers)
* applyMiddleware(...middlewares)

### example

Based on redux's [*counter-vanilla* example](https://github.com/reduxjs/redux/tree/master/examples/counter-vanilla), add `combineReducers()` and `applyMiddleware`. see: `index.html`