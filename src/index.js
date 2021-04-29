import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware} from 'redux' 

import './index.css';
import App from './components/App';
import rootReducer from './reducers'

//MiddleWare
//funct logger(obj,next,action)
//func logger(obj)(next)(action)
const logger = function({dispatch , getState}){
  return function(next){
    return function(action){
      console.log("ACTION : ", action);
      next(action)

    }
  }
}
const store = createStore(rootReducer, applyMiddleware(logger));//create store takes reucer as arguments
// console.log(store.getState());

// store.dispatch({
//       type : "ADD_MOVIES" , 
//       movies : [{
//         Title:"Superman"
//       } , {
//         Title : "Spiderman"
//       }]
// })

// console.log(store.getState());


ReactDOM.render(
  <React.StrictMode>
    <App store={store}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
