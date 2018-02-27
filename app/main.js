import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducer';
import saga from './saga';
import Container from './container';

const sagaM = createSagaMiddleware();

const store = createStore(
  combineReducers({ ints: reducer }),
  applyMiddleware(sagaM)
);

sagaM.run(saga);

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('app')
);
