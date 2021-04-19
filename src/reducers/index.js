
import {ADD_MOVIES ,  ADD_TO_FAVOURITES , REMOVE_FROM_FAVOURITES} from '../actions/index' //variables for action types 

//initial state was an arra but we need to serparte the normal movie lista from the fav ones
//so it was better to make our state be an object with 2 arrays
const initialMovieState = {
    list : [],
    favourites : []
}

export default function movies(state = initialMovieState , action){
    //reducers  are passed to the action at the time f creation and hence the last return statemets sets the initial state of the store
    //afte that thhe coscetive states are set by dipattching the actions 
    //---
    //string comparisons take more time compares to var comparisons and variables can be cchanges
    //this gives us the adbility to changes name for action typpes
    // if(action.type === ADD_MOVIES){
    //     return {
    //         ...state ,
    //         list : action.movies
    //     };//new state
    // }
    // // console.log("heya");
    // return state;

    //instead of if else we use switch case
    switch(action.type){
        case ADD_MOVIES :
            return {
                ...state,
                list : action.movies
            }

        case ADD_TO_FAVOURITES  :
            return {
                ...state,
                favourites : [action.movie , ...state.favourites]
            }

        case  REMOVE_FROM_FAVOURITES :
            const filteredArray = state.favourites.filter(
                movie => movie.Title !== action.movie.Title
            )
            return{
                ...state , 
                favourites : filteredArray
            }
        
        default : 
            return state
            
    }

}
