import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';
// 리덕스 미들웨어: logger, promise
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers/index';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(rootReducer, applyMiddleware(promise, logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);