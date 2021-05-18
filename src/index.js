import React , {createContext} from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware} from 'redux' 

import './index.css';
import App from './components/App';
import rootReducer from './reducers'
import thunk from 'redux-thunk'

//MiddleWare
//funct logger(obj,next,action)
//func logger(obj)(next)(action)

// const logger = function({dispatch , getState}){
//   return function(next){
//     return function(action){
//       console.log("ACTION : ", action);
//       next(action)

//     }
//   }
// }

//modified middleware
//if fucntion are juts of oe line we make the implicit

//custom thun middle ware , thhe inbuilt middleare works the same way
// const thunk = ({dispatch , getState}) => (next) => (action) => {
//   if(typeof action === 'function'){
//     action(dispatch) ;
//     return;
//   }
//   next(action);
// }


const logger = ({dispatch , getState}) => (next) => (action) =>{
  if(typeof action != 'function'){
    console.log("ACTION : " , action);
  }
  // console.log("ACTION : " , action);
  next(action);//this is similiar to calling action as argumnet fr our next middleware or dispatch
}

const store = createStore(rootReducer , applyMiddleware(logger , thunk));//create store takes reucer as arguments
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
export const StoreContext = createContext();
console.log('storeContext' , StoreContext);


ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}> {/** we are passingg thi value as store but can be any object*/}
      <App store={store}/>
    </StoreContext.Provider>      
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
