import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux' 

import './index.css';
import App from './components/App';
import movies from './reducers'

const store = createStore(movies);//create store takes reucer as arguments
console.log(store);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
