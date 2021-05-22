import React , {createContext} from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware } from 'redux' 

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

//This is how we wrapped our app around StoreContext.Provider initially

// ReactDOM.render(
//   <React.StrictMode>
//     <StoreContext.Provider value={store}> {/** we are passingg thi value as store but can be any object*/}
//       <App store={store}/>
//     </StoreContext.Provider>      
//   </React.StrictMode>,
//   document.getElementById('root')
// );

//but to be able to have more flexibility we make our own classs
 class Provider extends React.Component{

    render()
    {
      const {store} = this.props; //store is passed as props

      return(
        <StoreContext.Provider value={store} >
          {this.props.children} {/*this was written here just soo that any compnents wraapped around our provder can also be rendered*/}
        </StoreContext.Provider>
      );
    
    }

 }



//const connectedComp  = connect(callback)(Component);
export  function connect(callback) {
  
  return function(Component){
    
    class ConnectedComponent extends React.Component{

      constructor(props){
        super(props);
        this.unsubscribe = this.props.store.subscribe(()=>{this.forceUpdate()});//we use this to unsubstribe to store at destrctotr too avoid memory leaks
      }

      componentWillUnmount(){
        this.unsubscribe();
      }

      render(){
        const {store} = this.props;
        const state =  store.getState();
        const dataToBePassedAsProps = callback(state);
        return <Component  
                  {...dataToBePassedAsProps}
                  dispatch = {store.dispatch}
                />
      }
    }

    //we need this wrapper because we hace to us store in the contrutotr of connectedComponent
    class ConnectedComponentWrapper extends React.Component{
      render(){ 
        return(
          <StoreContext.Consumer>
          {
            (store)=>{
              return(
                <ConnectedComponent store={store} />
              )
            }
          }
        </StoreContext.Consumer>
        )
      }
    }

    return ConnectedComponentWrapper;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
