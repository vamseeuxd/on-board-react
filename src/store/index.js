import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import authenticationReducer from './authentication/reducer';
import rootSaga from "../sagas";
import {verifyGoogleEffect} from "../sagas/verifyGoogleLogin";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  authenticationReducer,
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(verifyGoogleEffect);
export default store;
