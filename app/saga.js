import { takeEvery, eventChannel } from 'redux-saga';
import { put, call, take } from 'redux-saga/effects';

import { RANDOM_INT_RECEIVED, INITIALIZED } from './actions';

function* createEventChannel() {
  return eventChannel(emit => {
    const ws = new WebSocket("ws://165.227.72.0:9999");
    ws.onmessage = msg => {
      return emit(msg);
    };
    return () => {
      ws.close();
    };
  });
}

function* initializeWebSocketChannel() {
  const channel = yield call(createEventChannel);
  while (true) {
    const { data } = yield take(channel);
    yield put({ type: RANDOM_INT_RECEIVED, data });
  }
}

export default function* saga() {
  yield [
    takeEvery('INITIALIZE', initializeWebSocketChannel)
  ];
}
