import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({}); // empty objet we don't have any reucer yet   //b3ed nzidhom

const initialState = {}; //ay haja n7boha load when redux store load n7otouha ghadii

const middelware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middelware))
);

export default store;
