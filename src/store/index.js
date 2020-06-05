import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authentication from './authentication/reducer';
import role from './roles/reducer';
import rootSaga from "../sagas";
import {verifyGoogleEffect} from "../sagas/verifyGoogleLogin";

const combinedReducers = combineReducers({authentication, role})
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducers,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(verifyGoogleEffect);
export default store;
