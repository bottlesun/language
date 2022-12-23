import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {applyMiddleware, createStore, compose} from "redux";
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import Reducer from "./_reducers";
import 'antd/dist/reset.css';

// 스토어를 리덕스에서 생성하면 - 객체 밖에 받을 수 없기에 promise 와 function 을 받기 위한 설정
const creatStoreWithMiddleware = applyMiddleware(promiseMiddleware, reduxThunk)(createStore);

// 글로벌로 compose type 설정
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// 타입 지정
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = creatStoreWithMiddleware(Reducer, composeEnhancers());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
