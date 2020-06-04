/** rootSaga.js */
import {all} from 'redux-saga/effects';
import {verifyGoogleEffect} from "./verifyGoogleLogin";

export default function* rootSaga() {
  yield all([
    verifyGoogleEffect
  ]);
}
